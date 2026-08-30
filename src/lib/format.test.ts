import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatCompact,
  formatPercent,
  portfolioValue,
} from "./format";

describe("formatCurrency", () => {
  it("formats whole dollar amounts with two decimals", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("formats sub-dollar amounts with six decimals", () => {
    expect(formatCurrency(0.0001234)).toBe("$0.000123");
  });

  it("returns a zero string for non-finite input", () => {
    expect(formatCurrency(Number.NaN)).toBe("$0.00");
  });
});

describe("formatCompact", () => {
  it("compacts large numbers", () => {
    expect(formatCompact(1_500_000)).toBe("1.5M");
  });
});

describe("formatPercent", () => {
  it("adds a plus sign for positive values", () => {
    expect(formatPercent(2.5)).toBe("+2.50%");
  });

  it("keeps the minus sign for negative values", () => {
    expect(formatPercent(-1.23)).toBe("-1.23%");
  });
});

describe("portfolioValue", () => {
  it("sums amount times price across holdings", () => {
    const holdings = [
      { amount: 2, price: 3 },
      { amount: 0.5, price: 10 },
    ];
    expect(portfolioValue(holdings)).toBe(11);
  });
});
