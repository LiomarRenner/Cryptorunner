import popularAssets from '@/mocks/popularAssets';
import type { PopularAsset } from '@/types/market';

export interface MarketService {
  getPopularAssets(): Promise<PopularAsset[]>;
}

type MockMarketServiceOptions = {
  latencyMs?: number;
  // Forces every request to fail, useful to exercise the error state.
  shouldFail?: boolean;
};

const DEFAULT_LATENCY_MS = 300;

// Returns static mock data after a short delay to mimic a network call.
export class MockMarketService implements MarketService {
  constructor(private readonly options: MockMarketServiceOptions = {}) {}

  async getPopularAssets(): Promise<PopularAsset[]> {
    const { latencyMs = DEFAULT_LATENCY_MS, shouldFail = false } = this.options;
    await new Promise(resolve => setTimeout(resolve, latencyMs));
    if (shouldFail) {
      throw new Error('Mock market request failed');
    }
    return popularAssets;
  }
}

// Swap this instance for a real implementation to hit an actual API.
export const marketService: MarketService = new MockMarketService();
