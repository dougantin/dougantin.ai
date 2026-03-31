import type { TickerQuote, TrackerConfig } from "@/src/lib/tracker/types";

interface FinnhubQuoteResponse {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

interface FinnhubCandleResponse {
  c?: number[];
  s?: string;
}

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const SYMBOL_DELAY_MS = 100;

function getApiKey() {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    throw new Error("Missing FINNHUB_API_KEY environment variable.");
  }

  return apiKey;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getYearStartWindow() {
  const now = new Date();
  const yearStart = new Date(Date.UTC(now.getUTCFullYear(), 0, 1, 0, 0, 0));
  const yearStartUnix = Math.floor(yearStart.getTime() / 1000);
  const yearStartPlusFiveDaysUnix = yearStartUnix + 5 * 24 * 60 * 60;

  return { yearStartUnix, yearStartPlusFiveDaysUnix };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Finnhub request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

async function fetchYtdBaseline(
  symbol: string,
  apiKey: string
): Promise<number> {
  const { yearStartUnix, yearStartPlusFiveDaysUnix } = getYearStartWindow();
  const candleUrl =
    `${FINNHUB_BASE_URL}/stock/candle?symbol=${symbol}` +
    `&resolution=D&from=${yearStartUnix}&to=${yearStartPlusFiveDaysUnix}` +
    `&token=${apiKey}`;

  const candle = await fetchJson<FinnhubCandleResponse>(candleUrl);
  const firstClose = candle.c?.[0];

  if (typeof firstClose !== "number" || Number.isNaN(firstClose)) {
    throw new Error(`Missing YTD baseline candle for ${symbol}.`);
  }

  return firstClose;
}

async function fetchQuoteForSymbol(
  symbol: string,
  apiKey: string
): Promise<TickerQuote> {
  const quoteUrl = `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${apiKey}`;
  const quote = await fetchJson<FinnhubQuoteResponse>(quoteUrl);
  const ytdBaseline = await fetchYtdBaseline(symbol, apiKey);

  return {
    symbol,
    currentPrice: quote.c,
    change: quote.d,
    changePercent: quote.dp,
    ytdChangePercent: ((quote.c - ytdBaseline) / ytdBaseline) * 100,
    previousClose: quote.pc,
    high: quote.h,
    low: quote.l,
    timestamp: quote.t,
  };
}

export function getAllSymbols(config: TrackerConfig): string[] {
  return Array.from(
    new Set(
      config.verticals.flatMap((vertical) =>
        vertical.tickers.map((ticker) => ticker.symbol)
      )
    )
  );
}

export async function fetchQuotes(
  symbols: string[]
): Promise<Record<string, TickerQuote>> {
  const apiKey = getApiKey();
  const quotes: Record<string, TickerQuote> = {};

  for (const [index, symbol] of symbols.entries()) {
    if (index > 0) {
      await delay(SYMBOL_DELAY_MS);
    }

    try {
      const quote = await fetchQuoteForSymbol(symbol, apiKey);
      quotes[symbol] = quote;
    } catch (error) {
      console.error(`Failed to fetch Finnhub data for ${symbol}:`, error);
    }
  }

  return quotes;
}
