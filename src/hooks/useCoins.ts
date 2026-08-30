import { useEffect, useState } from "react";
import { fetchTopCoins, fetchGlobal } from "../api/coingecko";
import type { Coin, GlobalMetrics } from "../types";

export function useCoins(limit = 20) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [global, setGlobal] = useState<GlobalMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [coinList, globalData] = await Promise.all([
          fetchTopCoins(limit),
          fetchGlobal(),
        ]);
        if (cancelled) return;
        setCoins(coinList);
        setGlobal(globalData);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Request failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 60000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [limit]);

  return { coins, global, error, loading };
}
