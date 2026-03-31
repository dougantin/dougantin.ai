import { NextResponse } from "next/server";
import { trackerConfig } from "@/src/config/thesis-tracker";
import { fetchQuotes, getAllSymbols } from "@/src/lib/tracker/finnhub";
import type { TrackerData } from "@/src/lib/tracker/types";
import { writeTrackerData } from "@/src/lib/tracker/data";

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

    const symbols = getAllSymbols(trackerConfig);
    const quotes = await fetchQuotes(symbols);
    const trackerData: TrackerData = {
      quotes,
      fetchedAt: new Date().toISOString(),
    };
    const storage = await writeTrackerData(trackerData);

    return NextResponse.json({
      status: "ok",
      totalSymbols: symbols.length,
      fetchedQuotes: Object.keys(quotes).length,
      storage,
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
