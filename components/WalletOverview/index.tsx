import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import AssetRow, { AssetColumnsHeader, AssetSeparator } from '@/components/AssetRow'
import type { AllocationSlice, Holding, WalletSummary } from '@/types/market'
import { themes } from '@/theme/themes'
import { formatAmount, formatPercent, formatShare, formatUsd } from '@/utils/format'
import { holdingValueUsd } from '@/utils/wallet'

const { colors, series, spacing, fontSize, shape } = themes;

const ESTIMATED_ROW_HEIGHT = 60;
const ALLOCATION_BAR_HEIGHT = 8;
const LEGEND_DOT_SIZE = 8;
// Leaves room so the last row is not hidden behind the floating tab bar.
const LIST_FOOTER_HEIGHT = 72;

const seriesColor = (index: number) => series[index % series.length];

type WalletOverviewProps = {
  summary: WalletSummary;
  allocation: AllocationSlice[];
};

export default function WalletOverview({ summary, allocation }: WalletOverviewProps) {
  const isNegative = summary.totalChangePct < 0;

  const renderItem: ListRenderItem<Holding> = useCallback(
    ({ item }) => (
      <AssetRow
        iconName={item.iconName}
        title={item.symbol}
        subtitle={formatAmount(item.amount)}
        value={formatUsd(holdingValueUsd(item))}
        changePct={item.changePct}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.balance}>
        <Text style={styles.mutedText}>Total balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceValue}>{formatUsd(summary.totalBalanceUsd)}</Text>
          <Text style={[styles.balanceChange, isNegative ? styles.lossText : styles.gainText]}>
            {formatPercent(summary.totalChangePct)}
          </Text>
        </View>
      </View>

      <View style={styles.allocationBar}>
        {allocation.map((slice, index) => (
          <View key={slice.id} style={{ flex: slice.percent, backgroundColor: seriesColor(index) }} />
        ))}
      </View>

      <View style={styles.legend}>
        {allocation.map((slice, index) => (
          <View key={slice.id} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: seriesColor(index) }]} />
            <Text style={styles.mutedText}>
              {slice.symbol} {formatShare(slice.percent)}
            </Text>
          </View>
        ))}
      </View>

      <AssetColumnsHeader labels={['Asset / Amount', 'Value', 'Change']} />

      <FlashList
        data={summary.holdings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        estimatedItemSize={ESTIMATED_ROW_HEIGHT}
        ItemSeparatorComponent={AssetSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.s16,
  },
  balance: {
    gap: spacing.s4,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.s8,
  },
  balanceValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.white,
  },
  balanceChange: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  gainText: {
    color: colors.gain,
  },
  lossText: {
    color: colors.loss,
  },
  mutedText: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.text_muted,
  },
  allocationBar: {
    flexDirection: 'row',
    height: ALLOCATION_BAR_HEIGHT,
    borderRadius: shape.pill,
    overflow: 'hidden',
    backgroundColor: colors.divider,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: spacing.s16,
    rowGap: spacing.s8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s4,
  },
  legendDot: {
    width: LEGEND_DOT_SIZE,
    height: LEGEND_DOT_SIZE,
    borderRadius: LEGEND_DOT_SIZE / 2,
  },
  listContent: {
    paddingBottom: spacing.s24,
  },
  listFooter: {
    height: LIST_FOOTER_HEIGHT,
  },
});
