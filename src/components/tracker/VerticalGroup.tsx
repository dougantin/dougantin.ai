import TickerRow from "@/src/components/tracker/TickerRow";
import type { TickerQuote, VerticalConfig } from "@/src/lib/tracker/types";

interface VerticalGroupProps {
  vertical: VerticalConfig;
  quotes: Record<string, TickerQuote>;
  bordered?: boolean;
}

export default function VerticalGroup({
  vertical,
  quotes,
  bordered = false,
}: VerticalGroupProps) {
  return (
    <section
      className={bordered ? "border-t pt-14" : ""}
      style={bordered ? { borderColor: "var(--border-default)" } : undefined}
    >
      <div className="mb-8 max-w-3xl">
        <h2
          className="text-2xl font-bold md:text-3xl"
          style={{ color: "var(--text-heading)", fontFamily: "var(--font-playfair), serif" }}
        >
          {vertical.name}
        </h2>
        <p className="mt-3 text-base leading-relaxed md:text-lg" style={{ color: "var(--text-body)" }}>
          {vertical.thesisDescription}
        </p>
      </div>

      <div className="space-y-4">
        {vertical.tickers.map((ticker) => (
          <TickerRow key={ticker.symbol} ticker={ticker} quote={quotes[ticker.symbol]} />
        ))}
      </div>
    </section>
  );
}
