import { useState } from "react";
import { useCoins } from "./hooks/useCoins";
import { MarketMetrics } from "./components/MarketMetrics";
import { CoinList } from "./components/CoinList";
import { PriceChart } from "./components/PriceChart";
import { Portfolio } from "./components/Portfolio";
import type { Coin } from "./types";

export default function App() {
  const { coins, global, error, loading } = useCoins(20);
  const [selected, setSelected] = useState<Coin | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-xl font-bold text-white">Crypto Dashboard</h1>
        <p className="text-sm text-slate-400">
          Live data from the CoinGecko public API.
        </p>
      </header>
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-6">
        {loading && <p className="text-slate-400">Loading coins...</p>}
        {error && (
          <p className="rounded border border-red-800 bg-red-950/40 p-3 text-red-300">
            {error}
          </p>
        )}
        <MarketMetrics data={global} />
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-slate-800 bg-slate-800/30">
            <CoinList
              coins={coins}
              selectedId={selected?.id ?? null}
              onSelect={setSelected}
            />
          </section>
          <section className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
            <PriceChart coin={selected} />
          </section>
        </div>
        <section className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
          <Portfolio coins={coins} />
        </section>
      </main>
    </div>
  );
}
