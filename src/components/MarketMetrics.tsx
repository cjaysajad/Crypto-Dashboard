import type { GlobalMetrics } from "../types";
import { formatCompact, formatCurrency } from "../lib/format";

export function MarketMetrics({ data }: { data: GlobalMetrics | null }) {
  if (!data) {
    return <p className="text-slate-400">Loading market data...</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Metric
        label="Market Cap"
        value={formatCurrency(data.total_market_cap.usd)}
      />
      <Metric
        label="24h Volume"
        value={formatCurrency(data.total_volume.usd)}
      />
      <Metric label="BTC Dominance" value={`${data.market_cap_percentage.btc.toFixed(1)}%`} />
      <Metric label="Active Coins" value={formatCompact(data.active_cryptocurrencies)} />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
      <dt className="text-sm text-slate-400">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-white">{value}</dd>
    </div>
  );
}
