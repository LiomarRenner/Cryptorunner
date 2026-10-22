import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { memo, useCallback } from 'react'
import CContainer from '@/components/core/CContainer'
import SegmentedToggle from '@/components/SegmentedToggle'
import Box from '@/components/Box'
import BaseIcon from '@/components/BaseIcon'
import useHome, { HomeCategory } from '@/hooks/useHome'
import { PopularAsset } from '@/services/market-service'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { themes } from '@/theme/themes'

const { colors, spacing, fontSize, shape } = themes;

const ESTIMATED_ROW_HEIGHT = 60;
// Leaves room so the last row is not hidden behind the floating tab bar.
const LIST_FOOTER_HEIGHT = 72;

export default function Home() {
  const { assets, isLoading, setSelectedCategory } = useHome();
  return (
    <CContainer>
      <LayoutFirstSection setSelectedCategory={setSelectedCategory} />
      <LayoutSecondSection data={assets} isLoading={isLoading} />
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

const LayoutSecondSection = ({ data, isLoading }: { data: PopularAsset[]; isLoading: boolean }) => (
  <Box>
    <View style={styles.boxContent}>
      <TitleBoxSection />
      {isLoading ? <ActivityIndicator color={colors.primary_green} /> : <BodyBoxSection data={data} />}
    </View>
  </Box>
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
  const isNegative = item.change.includes('-');
  return (
    <View style={styles.row}>
      <View style={styles.coinColumn}>
        <BaseIcon name={item.iconName} backgroundColor={colors.text_muted} color={colors.white} />
        <Text style={styles.valueText}>{item.coin}</Text>
      </View>
      <View style={styles.columnEnd}>
        <Text style={styles.valueText}>{item.lastPrice}</Text>
      </View>
      <View style={styles.columnEnd}>
        <View style={[styles.changeBadge, isNegative ? styles.changeBadgeNegative : styles.changeBadgePositive]}>
          <Text style={[styles.changeText, isNegative ? styles.changeTextNegative : styles.changeTextPositive]}>
            {item.change}
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  categoryToggle: {
    width: '100%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  boxContent: {
    gap: spacing.md,
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
    gap: spacing.sm,
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
    marginVertical: spacing.md,
  },
  changeBadge: {
    alignItems: 'center',
    borderRadius: shape.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm_md,
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
  listContent: {
    paddingBottom: spacing.lg,
  },
  listFooter: {
    height: LIST_FOOTER_HEIGHT,
  },
});
