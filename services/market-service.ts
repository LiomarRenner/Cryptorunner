import popularAssets from '@/mocks/popularAssets';
import walletHoldings from '@/mocks/walletHoldings';
import type { PopularAsset, WalletSummary } from '@/types/market';
import { summarizeWallet } from '@/utils/wallet';

export type MarketService = {
  getPopularAssets(): Promise<PopularAsset[]>;
  getWalletSummary(): Promise<WalletSummary>;
};

type MockMarketServiceOptions = {
  latencyMs?: number;
  // Forces every request to fail, useful to exercise the error state.
  shouldFail?: boolean;
};

const DEFAULT_LATENCY_MS = 300;

// Returns static mock data after a short delay to mimic a network call.
export function createMockMarketService({
  latencyMs = DEFAULT_LATENCY_MS,
  shouldFail = false,
}: MockMarketServiceOptions = {}): MarketService {
  async function simulateRequest(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, latencyMs));
    if (shouldFail) {
      throw new Error('Mock market request failed');
    }
  }

  return {
    async getPopularAssets() {
      await simulateRequest();
      return popularAssets;
    },
    async getWalletSummary() {
      await simulateRequest();
      return summarizeWallet(walletHoldings);
    },
  };
}

// Swap this factory call for a real implementation to hit an actual API.
export const marketService: MarketService = createMockMarketService();
