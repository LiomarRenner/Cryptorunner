// Sub-dollar prices keep extra decimals so values like $0.00001 stay readable.
const SUB_DOLLAR_MAX_DECIMALS = 6;

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const subDollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: SUB_DOLLAR_MAX_DECIMALS,
});

const amountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 8,
});

export const formatUsd = (value: number): string =>
  Math.abs(value) < 1 ? subDollarFormatter.format(value) : usdFormatter.format(value);

// Always shows two decimals and an explicit sign for non-zero values.
export const formatPercent = (value: number): string => {
  const rounded = Number(value.toFixed(2));
  if (rounded === 0) return '0.00%';
  const sign = rounded > 0 ? '+' : '-';
  return `${sign}${Math.abs(rounded).toFixed(2)}%`;
};

export const formatAmount = (value: number): string => amountFormatter.format(value);
