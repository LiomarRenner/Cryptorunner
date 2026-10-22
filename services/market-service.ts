import popularAssets from '@/mocks/popularAssets';
import type { PopularAsset } from '@/types/market';

export interface MarketService {
  getPopularAssets(): Promise<PopularAsset[]>;
}

const MOCK_LATENCY_MS = 300;

// Returns static mock data after a short delay to mimic a network call.
export class MockMarketService implements MarketService {
  async getPopularAssets(): Promise<PopularAsset[]> {
    await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY_MS));
    return popularAssets;
  }
}

// Swap this instance for a real implementation to hit an actual API.
export const marketService: MarketService = new MockMarketService();
