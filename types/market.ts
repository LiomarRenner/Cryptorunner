import type Ionicons from '@expo/vector-icons/Ionicons';

export type PopularAsset = {
  id: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  coin: string;
  lastPrice: string;
  change: string;
};

export type HomeCategory = 'Popular' | 'Winners' | 'Losers';
