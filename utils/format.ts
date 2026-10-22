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

// Unsigned share of a whole, e.g. an allocation slice.
export const formatShare = (value: number): string => `${value.toFixed(1)}%`;

const COMPACT_TIERS: [number, string][] = [
  [1e3, 'K'],
  [1e6, 'M'],
  [1e9, 'B'],
];

// Short USD amounts for large figures such as volume: $28.4B, $420M, $12.5K.
// Values under one thousand fall back to formatUsd.
export const formatCompactUsd = (value: number): string => {
  const abs = Math.abs(value);
  if (abs < 1e3) return formatUsd(value);

  const sign = value < 0 ? '-' : '';
  for (let i = 0; i < COMPACT_TIERS.length; i++) {
    const [size, suffix] = COMPACT_TIERS[i];
    const scaled = Math.round((abs / size) * 10) / 10;
    const isLastTier = i === COMPACT_TIERS.length - 1;
    // Rounding can push a value into the next tier, e.g. 999,950 -> 1M.
    if (scaled < 1000 || isLastTier) {
      return `${sign}$${scaled.toFixed(1).replace(/\.0$/, '')}${suffix}`;
    }
  }
  return formatUsd(value);
};
