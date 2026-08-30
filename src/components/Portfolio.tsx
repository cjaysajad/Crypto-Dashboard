import { useEffect, useState } from "react";
import type { Coin, Holding } from "../types";
import { formatCurrency } from "../lib/format";

const STORAGE_KEY = "crypto-dashboard:holdings";

function loadHoldings(): Holding[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Holding[];
  } catch {
    return [];
  }
}

export function Portfolio({ coins }: { coins: Coin[] }) {
  const [holdings, setHoldings] = useState<Holding[]>(() => loadHoldings());
  const [coinId, setCoinId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
  }, [holdings]);

  const priceById = new Map(coins.map((c) => [c.id, c.current_price]));
  const nameById = new Map(coins.map((c) => [c.id, c.name]));

  const total = holdings.reduce(
    (sum, h) => sum + h.amount * (priceById.get(h.coinId) ?? 0),
    0
  );

  function addHolding(event: React.FormEvent) {
    event.preventDefault();
    const parsed = parseFloat(amount);
    if (!coinId || !Number.isFinite(parsed) || parsed <= 0) return;
    setHoldings((prev) => {
      const existing = prev.find((h) => h.coinId === coinId);
      if (existing) {
        return prev.map((h) =>
          h.coinId === coinId ? { ...h, amount: h.amount + parsed } : h
        );
      }
      return [...prev, { coinId, amount: parsed }];
    });
    setAmount("");
  }

  function removeHolding(id: string) {
    setHoldings((prev) => prev.filter((h) => h.coinId !== id));
  }

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-white">Portfolio</h2>
      <p className="mb-3 text-slate-300">
        Total value:{" "}
        <span className="font-semibold text-white">{formatCurrency(total)}</span>
      </p>
      <form onSubmit={addHolding} className="mb-4 flex flex-wrap gap-2">
        <select
          value={coinId}
          onChange={(e) => setCoinId(e.target.value)}
          className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-white"
        >
          <option value="">Select coin</option>
          {coins.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-32 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-white"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
        >
          Add
        </button>
      </form>
      <ul className="divide-y divide-slate-800">
        {holdings.map((h) => (
          <li
            key={h.coinId}
            className="flex items-center justify-between p-2 text-sm"
          >
            <span className="text-white">{nameById.get(h.coinId) ?? h.coinId}</span>
            <span className="text-slate-300">
              {h.amount} @ {formatCurrency(priceById.get(h.coinId) ?? 0)} ={" "}
              {formatCurrency(h.amount * (priceById.get(h.coinId) ?? 0))}
            </span>
            <button
              type="button"
              onClick={() => removeHolding(h.coinId)}
              className="text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
