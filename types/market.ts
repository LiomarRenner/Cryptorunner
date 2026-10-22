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
