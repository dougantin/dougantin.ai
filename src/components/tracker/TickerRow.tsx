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

function formatMultiple(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "Unavailable";
  }

  return `${value.toFixed(2)}x`;
}

function formatLargeCurrency(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "Unavailable";
  }

  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }

  if (absoluteValue >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }

  if (absoluteValue >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }

  return formatPrice(value);
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

function renderMargin(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return { label: "Unavailable", color: "var(--text-muted)" };
  }

  return {
    label: formatSignedPercent(value * 100),
    color: getChangeColor(value),
  };
}

export default function TickerRow({ ticker, quote }: TickerRowProps) {
  const isEtf = ticker.vehicleType === "etf";

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
  const operatingMargin = renderMargin(quote.operatingMargin);

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
        {!isEtf && (
          <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <div className="uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                Market Cap
              </div>
              <div className="mt-1 font-mono text-sm" style={{ color: "var(--text-heading)" }}>
                {formatLargeCurrency(quote.marketCap)}
              </div>
            </div>
            <div>
              <div className="uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                Enterprise Value
              </div>
              <div className="mt-1 font-mono text-sm" style={{ color: "var(--text-heading)" }}>
                {formatLargeCurrency(quote.enterpriseValue)}
              </div>
            </div>
            <div>
              <div className="uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                EV / Sales
              </div>
              <div className="mt-1 font-mono text-sm" style={{ color: "var(--text-heading)" }}>
                {formatMultiple(quote.evToSales)}
              </div>
            </div>
            <div>
              <div className="uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                Operating Margin (FY)
              </div>
              <div className="mt-1 font-mono text-sm" style={{ color: operatingMargin.color }}>
                {operatingMargin.label}
              </div>
            </div>
          </div>
        )}
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
