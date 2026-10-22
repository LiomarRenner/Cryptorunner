import { describe, expect, it } from 'vitest';
import type { PopularAsset } from '@/types/market';
import { buildCategoryMap } from '@/utils/market';

const asset = (id: string, changePct: number): PopularAsset => ({
  id,
  iconName: 'logo-bitcoin',
  coin: `${id}/USDT`,
  priceUsd: 1,
  changePct,
});

describe('buildCategoryMap', () => {
  const up = asset('UP', 2.5);
  const down = asset('DOWN', -1.2);
  const smallUp = asset('SMALL', 0.8);

  it('keeps every asset under Popular in the original order', () => {
    const map = buildCategoryMap([up, down, smallUp]);
    expect(map.Popular).toEqual([up, down, smallUp]);
  });

  it('puts positive changes under Winners', () => {
    const map = buildCategoryMap([up, down, smallUp]);
    expect(map.Winners).toEqual([up, smallUp]);
  });

  it('puts negative changes under Losers', () => {
    const map = buildCategoryMap([up, down, smallUp]);
    expect(map.Losers).toEqual([down]);
  });

  it('leaves unchanged assets out of Winners and Losers', () => {
    const map = buildCategoryMap([asset('FLAT', 0)]);
    expect(map.Winners).toEqual([]);
    expect(map.Losers).toEqual([]);
  });

  it('returns empty buckets for an empty list', () => {
    expect(buildCategoryMap([])).toEqual({ Popular: [], Winners: [], Losers: [] });
  });
});
