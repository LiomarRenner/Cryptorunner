import type { HomeCategory, PopularAsset } from '@/types/market';

export const buildCategoryMap = (popular: PopularAsset[]): Record<HomeCategory, PopularAsset[]> => ({
  Popular: popular,
  Winners: popular.filter(asset => asset.changePct > 0),
  Losers: popular.filter(asset => asset.changePct < 0),
});
