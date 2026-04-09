import { getSupabaseAdmin } from "@/src/lib/supabase";
import type { TrackerData } from "@/src/lib/tracker/types";

interface SnapshotWriteResult {
  inserted: number;
  errors: string[];
}

function getEasternSnapshotDate(isoTimestamp: string) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(new Date(isoTimestamp));
}

export async function writeSnapshotsToSupabase(
  trackerData: TrackerData
): Promise<SnapshotWriteResult> {
  const admin = getSupabaseAdmin();
  const snapshotDate = getEasternSnapshotDate(trackerData.fetchedAt);

  const rows = Object.values(trackerData.quotes).map((quote) => ({
    symbol: quote.symbol,
    snapshot_date: snapshotDate,
    price: quote.currentPrice,
    change: quote.change,
    change_percent: quote.changePercent,
    ytd_change_pct: quote.ytdChangePercent,
    previous_close: quote.previousClose,
    day_high: quote.high,
    day_low: quote.low,
    market_cap: quote.marketCap,
    enterprise_value: quote.enterpriseValue,
    ev_to_sales: quote.evToSales,
    operating_margin: quote.operatingMargin,
    fetched_at: trackerData.fetchedAt,
  }));

  const { error } = await admin
    .from("daily_snapshots")
    .upsert(rows, { onConflict: "symbol,snapshot_date" });

  if (error) {
    return {
      inserted: 0,
      errors: [error.message],
    };
  }

  return {
    inserted: rows.length,
    errors: [],
  };
}
