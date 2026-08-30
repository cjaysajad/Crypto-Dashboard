export function formatCurrency(value: number, currency = "usd"): string {
  if (!Number.isFinite(value)) return "$0.00";
  const fractionDigits = value >= 1 ? 2 : 6;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatCompact(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function portfolioValue(
  holdings: { amount: number; price: number }[]
): number {
  return holdings.reduce((sum, h) => sum + h.amount * h.price, 0);
}
