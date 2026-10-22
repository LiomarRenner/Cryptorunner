import { describe, expect, it } from 'vitest';
import { formatAmount, formatCompactUsd, formatPercent, formatShare, formatUsd } from '@/utils/format';

describe('formatUsd', () => {
  it('formats dollar values with thousands separators and two decimals', () => {
    expect(formatUsd(67500)).toBe('$67,500.00');
    expect(formatUsd(1.2)).toBe('$1.20');
    expect(formatUsd(1)).toBe('$1.00');
  });

  it('keeps extra precision for sub-dollar values', () => {
    expect(formatUsd(0.145)).toBe('$0.145');
    expect(formatUsd(0.35)).toBe('$0.35');
    expect(formatUsd(0.00001)).toBe('$0.00001');
  });

  it('formats zero', () => {
    expect(formatUsd(0)).toBe('$0.00');
  });
});

describe('formatPercent', () => {
  it('adds a plus sign to positive values', () => {
    expect(formatPercent(2.5)).toBe('+2.50%');
    expect(formatPercent(10)).toBe('+10.00%');
  });

  it('keeps the minus sign on negative values', () => {
    expect(formatPercent(-1.2)).toBe('-1.20%');
  });

  it('shows zero without a sign, including values that round to zero', () => {
    expect(formatPercent(0)).toBe('0.00%');
    expect(formatPercent(-0.001)).toBe('0.00%');
    expect(formatPercent(0.004)).toBe('0.00%');
  });

  it('rounds to two decimals', () => {
    expect(formatPercent(3.456)).toBe('+3.46%');
  });
});

describe('formatAmount', () => {
  it('drops trailing zeros and groups thousands', () => {
    expect(formatAmount(0.12)).toBe('0.12');
    expect(formatAmount(2500)).toBe('2,500');
    expect(formatAmount(1)).toBe('1');
  });

  it('keeps up to eight decimals', () => {
    expect(formatAmount(0.123456789)).toBe('0.12345679');
  });
});

describe('formatShare', () => {
  it('shows one decimal without a sign', () => {
    expect(formatShare(65.08)).toBe('65.1%');
    expect(formatShare(100)).toBe('100.0%');
    expect(formatShare(0)).toBe('0.0%');
  });
});

describe('formatCompactUsd', () => {
  it('abbreviates billions, millions and thousands with one decimal', () => {
    expect(formatCompactUsd(28_400_000_000)).toBe('$28.4B');
    expect(formatCompactUsd(420_000_000)).toBe('$420M');
    expect(formatCompactUsd(12_540)).toBe('$12.5K');
  });

  it('drops a trailing .0', () => {
    expect(formatCompactUsd(1_000_000_000)).toBe('$1B');
    expect(formatCompactUsd(2_000)).toBe('$2K');
  });

  it('moves to the next tier when rounding reaches 1000', () => {
    expect(formatCompactUsd(999_950)).toBe('$1M');
    expect(formatCompactUsd(999_960_000)).toBe('$1B');
  });

  it('keeps billions as the largest unit', () => {
    expect(formatCompactUsd(1_500_000_000_000)).toBe('$1500B');
  });

  it('formats values under one thousand as plain USD', () => {
    expect(formatCompactUsd(950)).toBe('$950.00');
    expect(formatCompactUsd(0.5)).toBe('$0.50');
    expect(formatCompactUsd(0)).toBe('$0.00');
  });

  it('keeps the sign of negative values', () => {
    expect(formatCompactUsd(-2_500_000)).toBe('-$2.5M');
  });
});
