import { describe, expect, it } from 'vitest';
import type { Holding } from '@/types/market';
import { computeAllocation, holdingValueUsd, summarizeWallet } from '@/utils/wallet';

const holding = (id: string, amount: number, priceUsd: number, changePct = 0): Holding => ({
  id,
  iconName: 'logo-bitcoin',
  symbol: id,
  amount,
  priceUsd,
  changePct,
});

describe('holdingValueUsd', () => {
  it('multiplies amount by price', () => {
    expect(holdingValueUsd(holding('BTC', 0.5, 60000))).toBe(30000);
  });
});

describe('summarizeWallet', () => {
  it('sums the value of every holding', () => {
    const summary = summarizeWallet([holding('A', 2, 50), holding('B', 1, 100)]);
    expect(summary.totalBalanceUsd).toBe(200);
  });

  it('returns the holdings it was given', () => {
    const holdings = [holding('A', 1, 10)];
    expect(summarizeWallet(holdings).holdings).toBe(holdings);
  });

  it('weights the total change by each holding value before the change', () => {
    // A was 100 and is now 110 (+10%); B was 100 and is now 90 (-10%).
    const summary = summarizeWallet([holding('A', 1, 110, 10), holding('B', 1, 90, -10)]);
    expect(summary.totalBalanceUsd).toBe(200);
    expect(summary.totalChangePct).toBeCloseTo(0, 10);
  });

  it('matches a single holding change when there is only one holding', () => {
    expect(summarizeWallet([holding('A', 3, 20, 4.5)]).totalChangePct).toBeCloseTo(4.5, 10);
  });

  it('returns zeros for an empty wallet', () => {
    expect(summarizeWallet([])).toEqual({ holdings: [], totalBalanceUsd: 0, totalChangePct: 0 });
  });
});

describe('computeAllocation', () => {
  it('splits the total proportionally to each holding value', () => {
    const slices = computeAllocation([holding('A', 3, 100), holding('B', 1, 100)]);
    expect(slices).toEqual([
      { id: 'A', symbol: 'A', percent: 75 },
      { id: 'B', symbol: 'B', percent: 25 },
    ]);
  });

  it('sums to 100 within rounding for uneven splits', () => {
    const slices = computeAllocation([holding('A', 1, 1), holding('B', 1, 1), holding('C', 1, 1)]);
    const total = slices.reduce((sum, slice) => sum + slice.percent, 0);
    expect(total).toBeCloseTo(100, 10);
  });

  it('returns an empty list for an empty wallet', () => {
    expect(computeAllocation([])).toEqual([]);
  });

  it('returns zero for every slice when the total value is zero', () => {
    const slices = computeAllocation([holding('A', 0, 100), holding('B', 5, 0)]);
    expect(slices.map(slice => slice.percent)).toEqual([0, 0]);
  });
});
