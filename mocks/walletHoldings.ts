import type { Holding } from '@/types/market';

// Prices and changes mirror the matching pairs in popularAssets.
const walletHoldings: Holding[] = [
  { id: "btc", iconName: "logo-bitcoin", symbol: "BTC", amount: 0.12, priceUsd: 67500, changePct: 2.5 },
  { id: "eth", iconName: "logo-bitcoin", symbol: "ETH", amount: 1.1, priceUsd: 3500, changePct: -1.2 },
  { id: "sol", iconName: "logo-bitcoin", symbol: "SOL", amount: 4, priceUsd: 150, changePct: 4.5 },
  { id: "ada", iconName: "logo-bitcoin", symbol: "ADA", amount: 300, priceUsd: 1, changePct: 3 },
  { id: "doge", iconName: "logo-bitcoin", symbol: "DOGE", amount: 2500, priceUsd: 0.145, changePct: 0.8 },
];

export default walletHoldings;
