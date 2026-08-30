import type { Coin, GlobalMetrics, MarketChart } from "../types";

const BASE_URL =
  import.meta.env.VITE_COINGECKO_API_URL ??
  "https://api.coingecko.com/api/v3";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`CoinGecko request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export function fetchTopCoins(limit = 20): Promise<Coin[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: String(limit),
    page: "1",
    sparkline: "false",
  });
  return get<Coin[]>(`/coins/markets?${params.toString()}`);
}

export function fetchGlobal(): Promise<GlobalMetrics> {
  return get<GlobalMetrics>("/global");
}

export function fetchMarketChart(coinId: string, days = 7): Promise<MarketChart> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    days: String(days),
  });
  return get<MarketChart>(
    `/coins/${coinId}/market_chart?${params.toString()}`
  );
}
