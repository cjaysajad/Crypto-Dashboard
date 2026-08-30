# Crypto Dashboard

A real-time crypto analytics dashboard built with React, TypeScript, Vite,
Chart.js, and Tailwind CSS. Market data comes from the public CoinGecko API,
which requires no key.

## Features

- Top cryptocurrencies by market cap, with price and 24h change
- Price chart for a selected coin over 7, 30, or 90 days
- A portfolio tracker: enter your holdings, stored in your browser, with a
  live total value
- Global market metrics: total market cap, 24h volume, BTC dominance, active
  coin count

## Requirements

- Node.js 20 or later

## Install

```bash
npm install
cp .env.example .env
```

The CoinGecko public endpoint works without an API key. To use a paid key or a
proxy, set `VITE_COINGECKO_API_URL` in `.env`.

## Run

```bash
npm run dev
```

Open the printed URL in your browser. The app refreshes market data every 60
seconds.

## Test and build

```bash
npm test      # vitest unit tests
npm run build # type-check and production build
npm run preview
```

## Project layout

| Path | Purpose |
|---|---|
| `src/api/coingecko.ts` | API client for markets, global, and chart endpoints |
| `src/hooks/useCoins.ts` | Polling hook for top coins and global metrics |
| `src/components/` | Market metrics, coin list, price chart, portfolio |
| `src/lib/format.ts` | Currency, compact, and percent formatters |

## Data source

All market data is from [CoinGecko](https://www.coingecko.com/api/documentation).
The free public endpoints are rate-limited. For heavier use, supply a paid API
key via `VITE_COINGECKO_API_URL`.

## License

MIT
