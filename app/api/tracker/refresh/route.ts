import { NextResponse } from "next/server";
import { trackerConfig } from "@/src/config/thesis-tracker";
import { fetchQuotes, getAllSymbols } from "@/src/lib/tracker/finnhub";
import type { TrackerData } from "@/src/lib/tracker/types";
import { getTrackerData, writeTrackerData } from "@/src/lib/tracker/data";
import { hasSupabaseAdminConfig } from "@/src/lib/supabase";
import { writeSnapshotsToSupabase } from "@/src/lib/tracker/supabase-snapshots";

const FUNDAMENTALS_REFRESH_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

function shouldRefreshFundamentals(data: TrackerData | null, now: Date) {
  if (!data?.fundamentalsFetchedAt) {
    return true;
  }

  const lastRefresh = new Date(data.fundamentalsFetchedAt).getTime();
  return (
    Number.isNaN(lastRefresh) ||
    now.getTime() - lastRefresh >= FUNDAMENTALS_REFRESH_INTERVAL_MS
  );
}

function getEquitySymbols() {
  return new Set(
    trackerConfig.verticals.flatMap((vertical) =>
      vertical.tickers
        .filter((ticker) => ticker.vehicleType !== "etf")
        .map((ticker) => ticker.symbol)
    )
  );
}

function isAuthorized(request: Request) {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    throw new Error("Missing CRON_SECRET environment variable.");
  }

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const existingData = await getTrackerData();
    const refreshFundamentals = shouldRefreshFundamentals(existingData, now);
    const symbols = getAllSymbols(trackerConfig);
    const freshQuotes = await fetchQuotes(
      symbols,
      refreshFundamentals ? getEquitySymbols() : new Set()
    );
    const quotes = Object.fromEntries(
      Object.entries(freshQuotes).map(([symbol, quote]) => {
        const existingQuote = existingData?.quotes[symbol];

        return [
          symbol,
          {
            ...quote,
            marketCap: quote.marketCap ?? existingQuote?.marketCap ?? null,
            enterpriseValue:
              quote.enterpriseValue ?? existingQuote?.enterpriseValue ?? null,
            evToSales: quote.evToSales ?? existingQuote?.evToSales ?? null,
            operatingMargin:
              quote.operatingMargin ?? existingQuote?.operatingMargin ?? null,
          },
        ];
      })
    );
    const trackerData: TrackerData = {
      quotes,
      fetchedAt: now.toISOString(),
      fundamentalsFetchedAt: refreshFundamentals
        ? now.toISOString()
        : existingData?.fundamentalsFetchedAt,
    };
    const storage = await writeTrackerData(trackerData);
    let supabase: { inserted: number; errors: string[] } | null = null;

    if (hasSupabaseAdminConfig()) {
      try {
        supabase = await writeSnapshotsToSupabase(trackerData);
      } catch (error) {
        console.error("Failed to write snapshots to Supabase:", error);
        supabase = {
          inserted: 0,
          errors: [
            error instanceof Error ? error.message : "Unknown Supabase write error",
          ],
        };
      }
    }

    return NextResponse.json({
      status: "ok",
      totalSymbols: symbols.length,
      fetchedQuotes: Object.keys(quotes).length,
      refreshedFundamentals: refreshFundamentals,
      storage,
      supabase,
      fetchedAt: trackerData.fetchedAt,
    });
  } catch (error) {
    console.error("Failed to refresh tracker cache:", error);

    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Unknown refresh error",
      },
      { status: 500 }
    );
  }
}
