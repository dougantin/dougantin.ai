import type { TickerQuote, TrackerConfig } from "@/src/lib/tracker/types";

interface FmpQuoteResponse {
  symbol: string;
  price: number;
  change: number;
  changesPercentage: number | string;
  dayLow: number;
  dayHigh: number;
  previousClose: number;
  timestamp?: number;
}

interface FmpHistoricalPricePoint {
  date?: string;
  price?: number;
}

interface FmpHistoricalResponseObject {
  historical?: FmpHistoricalPricePoint[];
}

interface FmpEnterpriseValueResponse {
  marketCapitalization?: number;
  enterpriseValue?: number;
}

interface FmpKeyMetricsResponse {
  evToSales?: number;
}

interface FmpFinancialRatiosResponse {
  operatingProfitMargin?: number;
}

const FMP_BASE_URL = "https://financialmodelingprep.com/stable";
const SYMBOL_DELAY_MS = 100;
const ytdUnavailableSymbols = new Set<string>();
const fundamentalsUnavailableSymbols = new Set<string>();

function getApiKey() {
  const apiKey = process.env.FMP_API_KEY;

  if (!apiKey) {
    throw new Error("Missing FMP_API_KEY environment variable.");
  }

  return apiKey;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getYearStartWindow() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const yearStart = `${year}-01-01`;
  const today = now.toISOString().slice(0, 10);

  return { yearStart, today };
}

async function fetchJson<T>(url: string): Promise<T> {
  const apiKey = process.env.FMP_API_KEY;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(apiKey ? { apikey: apiKey } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`FMP request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

function normalizePercent(value: number | string | undefined) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace("%", ""));
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

function parseHistoricalResponse(data: unknown): FmpHistoricalPricePoint[] {
  if (Array.isArray(data)) {
    return data as FmpHistoricalPricePoint[];
  }

  if (
    data &&
    typeof data === "object" &&
    "historical" in data &&
    Array.isArray((data as FmpHistoricalResponseObject).historical)
  ) {
    return (data as FmpHistoricalResponseObject).historical ?? [];
  }

  return [];
}

async function fetchYtdBaseline(symbol: string, apiKey: string): Promise<number> {
  const { yearStart, today } = getYearStartWindow();
  const historicalUrl =
    `${FMP_BASE_URL}/historical-price-eod/light?symbol=${symbol}` +
    `&from=${yearStart}&to=${today}`;

  const historicalResponse = await fetchJson<unknown>(historicalUrl);
  const historicalPoints = parseHistoricalResponse(historicalResponse);
  const firstTradingDay = [...historicalPoints]
    .filter(
      (point) =>
        Boolean(point.date) &&
        typeof point.price === "number" &&
        !Number.isNaN(point.price)
    )
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""))[0];

  const firstClose = firstTradingDay?.price;

  if (typeof firstClose !== "number" || Number.isNaN(firstClose)) {
    throw new Error(`Missing YTD baseline historical close for ${symbol}.`);
  }

  return firstClose;
}

async function fetchFundamentals(symbol: string) {
  const enterpriseValuesUrl = `${FMP_BASE_URL}/enterprise-values?symbol=${symbol}`;
  const keyMetricsUrl = `${FMP_BASE_URL}/key-metrics?symbol=${symbol}`;
  const financialRatiosUrl = `${FMP_BASE_URL}/ratios?symbol=${symbol}`;

  const [enterpriseValuesResult, keyMetricsResult, financialRatiosResult] = await Promise.allSettled([
    fetchJson<FmpEnterpriseValueResponse[]>(enterpriseValuesUrl),
    fetchJson<FmpKeyMetricsResponse[]>(keyMetricsUrl),
    fetchJson<FmpFinancialRatiosResponse[]>(financialRatiosUrl),
  ]);

  const enterpriseValues =
    enterpriseValuesResult.status === "fulfilled"
      ? enterpriseValuesResult.value[0]
      : null;
  const keyMetrics =
    keyMetricsResult.status === "fulfilled"
      ? keyMetricsResult.value[0]
      : null;
  const financialRatios =
    financialRatiosResult.status === "fulfilled"
      ? financialRatiosResult.value[0]
      : null;

  return {
    marketCap:
      typeof enterpriseValues?.marketCapitalization === "number"
        ? enterpriseValues.marketCapitalization
        : null,
    enterpriseValue:
      typeof enterpriseValues?.enterpriseValue === "number"
        ? enterpriseValues.enterpriseValue
        : null,
    evToSales:
      typeof keyMetrics?.evToSales === "number"
        ? keyMetrics.evToSales
        : null,
    operatingMargin:
      typeof financialRatios?.operatingProfitMargin === "number"
        ? financialRatios.operatingProfitMargin
        : null,
  };
}

async function fetchQuoteForSymbol(
  symbol: string,
  apiKey: string
): Promise<TickerQuote> {
  const quoteUrl = `${FMP_BASE_URL}/quote?symbol=${symbol}`;
  const quoteResponse = await fetchJson<FmpQuoteResponse[]>(quoteUrl);
  const quote = quoteResponse[0];

  if (!quote?.symbol) {
    throw new Error(`Missing FMP quote data for ${symbol}.`);
  }

  let ytdChangePercent: number | null = null;
  let marketCap: number | null = null;
  let enterpriseValue: number | null = null;
  let evToSales: number | null = null;
  let operatingMargin: number | null = null;

  try {
    const ytdBaseline = await fetchYtdBaseline(symbol, apiKey);
    ytdChangePercent = ((quote.price - ytdBaseline) / ytdBaseline) * 100;
  } catch (error) {
    ytdUnavailableSymbols.add(symbol);
  }

  try {
    const fundamentals = await fetchFundamentals(symbol);
    marketCap = fundamentals.marketCap;
    enterpriseValue = fundamentals.enterpriseValue;
    evToSales = fundamentals.evToSales;
    operatingMargin = fundamentals.operatingMargin;
  } catch (error) {
    fundamentalsUnavailableSymbols.add(symbol);
  }

  if (
    marketCap === null &&
    enterpriseValue === null &&
    evToSales === null &&
    operatingMargin === null
  ) {
    fundamentalsUnavailableSymbols.add(symbol);
  }

  return {
    symbol,
    currentPrice: quote.price,
    change: quote.change,
    changePercent: normalizePercent(quote.changesPercentage),
    ytdChangePercent,
    marketCap,
    enterpriseValue,
    evToSales,
    operatingMargin,
    previousClose: quote.previousClose,
    high: quote.dayHigh,
    low: quote.dayLow,
    timestamp: quote.timestamp ?? Math.floor(Date.now() / 1000),
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
  ytdUnavailableSymbols.clear();
  fundamentalsUnavailableSymbols.clear();

  for (const [index, symbol] of symbols.entries()) {
    if (index > 0) {
      await delay(SYMBOL_DELAY_MS);
    }

    try {
      const quote = await fetchQuoteForSymbol(symbol, apiKey);
      quotes[symbol] = quote;
    } catch (error) {
      console.error(`Failed to fetch FMP data for ${symbol}:`, error);
    }
  }

  if (ytdUnavailableSymbols.size > 0) {
    console.warn(
      `YTD baseline unavailable for ${ytdUnavailableSymbols.size} ticker(s): ${Array.from(
        ytdUnavailableSymbols
      ).join(", ")}`
    );
  }

  if (fundamentalsUnavailableSymbols.size > 0) {
    console.warn(
      `Fundamentals unavailable for ${fundamentalsUnavailableSymbols.size} ticker(s): ${Array.from(
        fundamentalsUnavailableSymbols
      ).join(", ")}`
    );
  }

  return quotes;
}
