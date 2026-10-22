import type { AllocationSlice, Holding, WalletSummary } from '@/types/market';

export const holdingValueUsd = (holding: Holding): number => holding.amount * holding.priceUsd;

// The portfolio change compares the current total against what each holding
// was worth before its own change was applied.
export const summarizeWallet = (holdings: Holding[]): WalletSummary => {
  let totalBalanceUsd = 0;
  let previousBalanceUsd = 0;

  for (const holding of holdings) {
    const value = holdingValueUsd(holding);
    totalBalanceUsd += value;
    previousBalanceUsd += value / (1 + holding.changePct / 100);
  }

  const totalChangePct =
    previousBalanceUsd > 0 ? ((totalBalanceUsd - previousBalanceUsd) / previousBalanceUsd) * 100 : 0;

  return { holdings, totalBalanceUsd, totalChangePct };
};

export const computeAllocation = (holdings: Holding[]): AllocationSlice[] => {
  const total = holdings.reduce((sum, holding) => sum + holdingValueUsd(holding), 0);

  return holdings.map(holding => ({
    id: holding.id,
    symbol: holding.symbol,
    percent: total > 0 ? (holdingValueUsd(holding) / total) * 100 : 0,
  }));
};
