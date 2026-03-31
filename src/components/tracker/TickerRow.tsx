import type { TickerConfig, TickerQuote } from "@/src/lib/tracker/types";

interface TickerRowProps {
  ticker: TickerConfig;
  quote?: TickerQuote;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatSignedCurrency(value: number) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${formatPrice(value)}`;
}

function formatSignedPercent(value: number) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
}

function getChangeColor(value: number) {
  if (value > 0) return "#16a34a";
  if (value < 0) return "#dc2626";
  return "var(--text-muted)";
}

function getYtdAbsoluteChange(quote: TickerQuote) {
  if (quote.ytdChangePercent === null) {
    return null;
  }

  const baseline = quote.currentPrice / (1 + quote.ytdChangePercent / 100);
  return quote.currentPrice - baseline;
}

export default function TickerRow({ ticker, quote }: TickerRowProps) {
  if (!quote) {
    return (
      <div
        className="grid gap-4 rounded-lg border px-4 py-4 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] md:items-start"
        style={{
          borderColor: "var(--border-default)",
          background: "rgba(61, 52, 48, 0.28)",
        }}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className="font-mono text-base font-semibold tracking-wide"
              style={{ color: "var(--text-heading)" }}
            >
              {ticker.symbol}
            </span>
            <span className="text-base" style={{ color: "var(--text-heading)" }}>
              {ticker.name}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
            {ticker.shortDescription}
          </p>
        </div>
        <div className="text-sm md:text-right" style={{ color: "var(--text-muted)" }}>
          Data unavailable
        </div>
      </div>
    );
  }

  const dailyColor = getChangeColor(quote.change);
  const ytdColor =
    quote.ytdChangePercent === null
      ? "var(--text-muted)"
      : getChangeColor(quote.ytdChangePercent);
  const ytdAbsoluteChange = getYtdAbsoluteChange(quote);

  return (
    <div
      className="grid gap-4 rounded-lg border px-4 py-4 md:grid-cols-[minmax(0,2.2fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-start"
      style={{
        borderColor: "var(--border-default)",
        background: "rgba(61, 52, 48, 0.28)",
      }}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="font-mono text-base font-semibold tracking-wide"
            style={{ color: "var(--text-heading)" }}
          >
            {ticker.symbol}
          </span>
          <span className="text-base" style={{ color: "var(--text-heading)" }}>
            {ticker.name}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
          {ticker.shortDescription}
        </p>
      </div>

      <div className="md:text-right">
        <div className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
          Price
        </div>
        <div
          className="mt-1 font-mono text-lg font-semibold md:text-xl"
          style={{ color: "var(--text-heading)" }}
        >
          {formatPrice(quote.currentPrice)}
        </div>
      </div>

      <div className="md:text-right">
        <div className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
          Daily
        </div>
        <div className="mt-1 font-mono text-sm font-semibold" style={{ color: dailyColor }}>
          {formatSignedCurrency(quote.change)}
        </div>
        <div className="font-mono text-sm" style={{ color: dailyColor }}>
          {formatSignedPercent(quote.changePercent)}
        </div>
      </div>

      <div className="md:text-right">
        <div className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
          YTD
        </div>
        {quote.ytdChangePercent === null || ytdAbsoluteChange === null ? (
          <div className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            Unavailable
          </div>
        ) : (
          <>
            <div className="mt-1 font-mono text-sm font-semibold" style={{ color: ytdColor }}>
              {formatSignedCurrency(ytdAbsoluteChange)}
            </div>
            <div className="font-mono text-sm" style={{ color: ytdColor }}>
              {formatSignedPercent(quote.ytdChangePercent)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
