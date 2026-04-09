import { trackerConfig } from "../src/config/thesis-tracker";
import { getSupabaseAdmin } from "../src/lib/supabase";

async function main() {
  const admin = getSupabaseAdmin();

  const rows = trackerConfig.verticals.flatMap((vertical) =>
    vertical.tickers.map((ticker) => ({
      symbol: ticker.symbol,
      name: ticker.name,
      vertical: vertical.id,
      vehicle_type: ticker.vehicleType ?? "equity",
      description: ticker.shortDescription,
      active: true,
      updated_at: new Date().toISOString(),
    }))
  );

  const { error } = await admin.from("tickers").upsert(rows, {
    onConflict: "symbol",
  });

  if (error) {
    console.error("Failed to seed tickers:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${rows.length} tickers into Supabase.`);
}

main().catch((error) => {
  console.error("Unexpected seed error:", error);
  process.exit(1);
});
