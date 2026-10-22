import popularAssets from '@/mocks/popularAssets';
import walletHoldings from '@/mocks/walletHoldings';
import type { PopularAsset, WalletSummary } from '@/types/market';
import { summarizeWallet } from '@/utils/wallet';

export interface MarketService {
  getPopularAssets(): Promise<PopularAsset[]>;
  getWalletSummary(): Promise<WalletSummary>;
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
    await this.simulateRequest();
    return popularAssets;
  }

  async getWalletSummary(): Promise<WalletSummary> {
    await this.simulateRequest();
    return summarizeWallet(walletHoldings);
  }

  private async simulateRequest(): Promise<void> {
    const { latencyMs = DEFAULT_LATENCY_MS, shouldFail = false } = this.options;
    await new Promise(resolve => setTimeout(resolve, latencyMs));
    if (shouldFail) {
      throw new Error('Mock market request failed');
    }
  }
}

// Swap this instance for a real implementation to hit an actual API.
export const marketService: MarketService = new MockMarketService();
