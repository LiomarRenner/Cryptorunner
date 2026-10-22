import type { HomeCategory, PopularAsset } from '@/types/market';

export const buildCategoryMap = (popular: PopularAsset[]): Record<HomeCategory, PopularAsset[]> => ({
  Popular: popular,
  Winners: popular.filter(asset => asset.change.trim().startsWith('+')),
  Losers: popular.filter(asset => asset.change.trim().startsWith('-')),
});
