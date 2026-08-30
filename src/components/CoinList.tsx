import type { Coin } from "../types";
import { formatCurrency, formatPercent } from "../lib/format";

export function CoinList({
  coins,
  selectedId,
  onSelect,
}: {
  coins: Coin[];
  selectedId: string | null;
  onSelect: (coin: Coin) => void;
}) {
  if (coins.length === 0) {
    return <p className="text-slate-400">No coins loaded.</p>;
  }
  return (
    <ul className="divide-y divide-slate-800">
      {coins.map((coin) => (
        <li key={coin.id}>
          <button
            type="button"
            onClick={() => onSelect(coin)}
            className={`flex w-full items-center gap-3 p-3 text-left hover:bg-slate-800/50 ${
              selectedId === coin.id ? "bg-slate-800/70" : ""
            }`}
          >
            <img
              src={coin.image}
              alt={coin.name}
              className="h-6 w-6 rounded-full"
            />
            <span className="flex-1">
              <span className="block font-medium text-white">{coin.name}</span>
              <span className="text-xs uppercase text-slate-400">
                {coin.symbol}
              </span>
            </span>
            <span className="text-right">
              <span className="block text-white">
                {formatCurrency(coin.current_price)}
              </span>
              <ChangeBadge value={coin.price_change_percentage_24h} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function ChangeBadge({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={`text-xs ${
        positive ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {formatPercent(value)}
    </span>
  );
}
