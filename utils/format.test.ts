import { describe, expect, it } from 'vitest';
import { formatAmount, formatPercent, formatUsd } from '@/utils/format';

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
