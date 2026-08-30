import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { fetchMarketChart } from "../api/coingecko";
import { formatCurrency } from "../lib/format";
import type { Coin } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const RANGES = [7, 30, 90] as const;

export function PriceChart({ coin }: { coin: Coin | null }) {
  const [days, setDays] = useState<number>(7);
  const [prices, setPrices] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coin) return;
    let cancelled = false;
    async function load() {
      if (!coin) return;
      setLoading(true);
      setError(null);
      try {
        const chart = await fetchMarketChart(coin.id, days);
        if (!cancelled) setPrices(chart.prices);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Request failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [coin, days]);

  if (!coin) {
    return (
      <p className="text-slate-400">Select a coin to view its price chart.</p>
    );
  }

  const data = {
    labels: prices.map(([t]) => new Date(t).toLocaleDateString()),
    datasets: [
      {
        label: `${coin.name} price`,
        data: prices.map(([, p]) => p),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          {coin.name}{" "}
          <span className="text-slate-400">{formatCurrency(coin.current_price)}</span>
        </h2>
        <div className="flex gap-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setDays(r)}
              className={`rounded px-2 py-1 text-xs ${
                days === r
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>
      {loading && <p className="text-slate-400">Loading chart...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && prices.length > 0 && (
        <Line data={data} options={{ maintainAspectRatio: false }} height={280} />
      )}
    </div>
  );
}
