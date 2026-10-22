import type Ionicons from '@expo/vector-icons/Ionicons';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];

export type PopularAsset = {
  id: string;
  iconName: IconName;
  coin: string;
  priceUsd: number;
  // Percentage points, e.g. 2.5 means +2.5%.
  changePct: number;
};

export type HomeCategory = 'Popular' | 'Winners' | 'Losers';

export type Holding = {
  id: string;
  iconName: IconName;
  symbol: string;
  amount: number;
  priceUsd: number;
  // Percentage points, e.g. 2.5 means +2.5%.
  changePct: number;
};

export type WalletSummary = {
  holdings: Holding[];
  totalBalanceUsd: number;
  // Value-weighted change of the whole portfolio, in percentage points.
  totalChangePct: number;
};

export type AllocationSlice = {
  id: string;
  symbol: string;
  // Share of the total balance, 0 to 100.
  percent: number;
};

export type HomeMode = 'Exchange' | 'Wallet';
