import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { trackerConfig } from "@/src/config/thesis-tracker";
import { fetchQuotes, getAllSymbols } from "@/src/lib/tracker/finnhub";
import type { TrackerData } from "@/src/lib/tracker/types";

const CACHE_DIR = path.join(process.cwd(), "public", "data");
const CACHE_PATH = path.join(CACHE_DIR, "tracker-cache.json");

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

    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(CACHE_PATH, JSON.stringify(trackerData, null, 2), "utf-8");

    return NextResponse.json({
      status: "ok",
      totalSymbols: symbols.length,
      fetchedQuotes: Object.keys(quotes).length,
      cachePath: "/data/tracker-cache.json",
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
