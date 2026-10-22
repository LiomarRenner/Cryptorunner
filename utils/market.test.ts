import { describe, expect, it } from 'vitest';
import type { PopularAsset } from '@/types/market';
import { buildCategoryMap } from '@/utils/market';

const asset = (id: string, change: string): PopularAsset => ({
  id,
  iconName: 'logo-bitcoin',
  coin: `${id}/USDT`,
  lastPrice: '$1.00',
  change,
});

describe('buildCategoryMap', () => {
  const up = asset('UP', '+2.50%');
  const down = asset('DOWN', '-1.20%');
  const paddedUp = asset('PADDED', '  +0.80%');

  it('keeps every asset under Popular in the original order', () => {
    const map = buildCategoryMap([up, down, paddedUp]);
    expect(map.Popular).toEqual([up, down, paddedUp]);
  });

  it('puts positive changes under Winners, ignoring leading whitespace', () => {
    const map = buildCategoryMap([up, down, paddedUp]);
    expect(map.Winners).toEqual([up, paddedUp]);
  });

  it('puts negative changes under Losers', () => {
    const map = buildCategoryMap([up, down, paddedUp]);
    expect(map.Losers).toEqual([down]);
  });

  it('leaves unsigned changes out of Winners and Losers', () => {
    const flat = asset('FLAT', '0.00%');
    const map = buildCategoryMap([flat]);
    expect(map.Winners).toEqual([]);
    expect(map.Losers).toEqual([]);
  });

  it('returns empty buckets for an empty list', () => {
    expect(buildCategoryMap([])).toEqual({ Popular: [], Winners: [], Losers: [] });
  });
});
