import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import React, { memo, useCallback } from 'react'
import CContainer from '@/components/core/CContainer'
import SegmentedToggle from '@/components/SegmentedToggle'
import Box from '@/components/Box'
import BaseIcon from '@/components/BaseIcon'
import useHome from '@/hooks/useHome'
import type { HomeCategory, PopularAsset } from '@/types/market'
import type { LoadStatus } from '@/types/load-status'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { themes } from '@/theme/themes'
import { formatPercent, formatUsd } from '@/utils/format'

const { colors, spacing, fontSize, shape } = themes;

const ESTIMATED_ROW_HEIGHT = 60;
// Leaves room so the last row is not hidden behind the floating tab bar.
const LIST_FOOTER_HEIGHT = 72;

export default function Home() {
  const { assets, status, retry, setSelectedCategory } = useHome();
  return (
    <CContainer>
      <LayoutFirstSection setSelectedCategory={setSelectedCategory} />
      <LayoutSecondSection data={assets} status={status} onRetry={retry} />
    </CContainer>
  )
}

// The Exchange/Wallet toggle is visual only for now; it has no behavior wired yet.
const noop = () => {};

const LayoutFirstSection = ({ setSelectedCategory }: { setSelectedCategory: (v: HomeCategory) => void }) => (
  <>
    <View style={styles.modeToggle}>
      <SegmentedToggle
        options={['Exchange', 'Wallet']}
        onChange={noop}
      />
    </View>
    <View style={styles.categoryToggle}>
      <SegmentedToggle
        options={['Popular', 'Winners', 'Losers']}
        onChange={(selected) => setSelectedCategory(selected as HomeCategory)}
      />
    </View>
  </>
);

type LayoutSecondSectionProps = {
  data: PopularAsset[];
  status: LoadStatus;
  onRetry: () => void;
};

const LayoutSecondSection = ({ data, status, onRetry }: LayoutSecondSectionProps) => (
  <Box>
    <View style={styles.boxContent}>
      <TitleBoxSection />
      {status === 'loading' && <ActivityIndicator color={colors.primary_green} />}
      {status === 'error' && <ErrorState onRetry={onRetry} />}
      {status === 'success' && <BodyBoxSection data={data} />}
    </View>
  </Box>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <View style={styles.errorState}>
    <Text style={styles.headerText}>Could not load assets.</Text>
    <Pressable onPress={onRetry} style={styles.retryButton}>
      <Text style={styles.retryText}>Try again</Text>
    </Pressable>
  </View>
);

const TitleBoxSection = () => (
  <View style={styles.row}>
    <View style={styles.columnStart}>
      <Text style={styles.headerText}>Name / Turnover</Text>
    </View>
    <View style={styles.columnEnd}>
      <Text style={styles.headerText}>Last Price</Text>
    </View>
    <View style={styles.columnEnd}>
      <Text style={styles.headerText}>Change</Text>
    </View>
  </View>
);

const ThinLine = memo(() => <View style={styles.separator} />);

const AssetRow = memo(({ item }: { item: PopularAsset }) => {
  const isNegative = item.changePct < 0;
  return (
    <View style={styles.row}>
      <View style={styles.coinColumn}>
        <BaseIcon name={item.iconName} backgroundColor={colors.text_muted} color={colors.white} />
        <Text style={styles.valueText}>{item.coin}</Text>
      </View>
      <View style={styles.columnEnd}>
        <Text style={styles.valueText}>{formatUsd(item.priceUsd)}</Text>
      </View>
      <View style={styles.columnEnd}>
        <View style={[styles.changeBadge, isNegative ? styles.changeBadgeNegative : styles.changeBadgePositive]}>
          <Text style={[styles.changeText, isNegative ? styles.changeTextNegative : styles.changeTextPositive]}>
            {formatPercent(item.changePct)}
          </Text>
        </View>
      </View>
    </View>
  );
});

const BodyBoxSection = ({ data }: { data: PopularAsset[] }) => {
  const renderItem: ListRenderItem<PopularAsset> = useCallback(
    ({ item }) => <AssetRow item={item} />,
    []
  );

  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      estimatedItemSize={ESTIMATED_ROW_HEIGHT}
      ItemSeparatorComponent={ThinLine}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={<View style={styles.listFooter} />}
    />
  );
};

const styles = StyleSheet.create({
  modeToggle: {
    width: '50%',
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s16,
  },
  categoryToggle: {
    width: '100%',
    paddingHorizontal: spacing.s16,
    paddingVertical: spacing.s8,
  },
  boxContent: {
    gap: spacing.s16,
    alignContent: 'center',
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnStart: {
    flex: 1,
    alignItems: 'flex-start',
  },
  columnEnd: {
    flex: 1,
    alignItems: 'flex-end',
  },
  coinColumn: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    gap: spacing.s8,
  },
  headerText: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.text_muted,
  },
  valueText: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.white,
  },
  separator: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.s16,
  },
  changeBadge: {
    alignItems: 'center',
    borderRadius: shape.pill,
    paddingVertical: spacing.s8,
    paddingHorizontal: spacing.s12,
  },
  changeBadgePositive: {
    backgroundColor: colors.gain,
  },
  changeBadgeNegative: {
    backgroundColor: colors.loss,
  },
  changeText: {
    fontSize: fontSize.sm,
    fontWeight: '400',
  },
  changeTextPositive: {
    color: colors.on_primary,
  },
  changeTextNegative: {
    color: colors.white,
  },
  errorState: {
    alignItems: 'center',
    gap: spacing.s16,
  },
  retryButton: {
    backgroundColor: colors.primary_green,
    borderRadius: shape.pill,
    paddingVertical: spacing.s8,
    paddingHorizontal: spacing.s16,
  },
  retryText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.on_primary,
  },
  listContent: {
    paddingBottom: spacing.s24,
  },
  listFooter: {
    height: LIST_FOOTER_HEIGHT,
  },
});
