export interface TickerConfig {
  symbol: string;
  name: string;
  shortDescription: string;
}

export interface VerticalConfig {
  id: string;
  name: string;
  thesisDescription: string;
  tickers: TickerConfig[];
}

export interface TrackerConfig {
  verticals: VerticalConfig[];
  lastUpdated: string;
  disclaimer: string;
}

export interface TickerQuote {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  ytdChangePercent: number | null;
  marketCap: number | null;
  enterpriseValue: number | null;
  evToSales: number | null;
  operatingMargin: number | null;
  previousClose: number;
  high: number;
  low: number;
  timestamp: number;
}

export interface TrackerData {
  quotes: Record<string, TickerQuote>;
  fetchedAt: string;
}
