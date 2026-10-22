import { View, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import CContainer from '@/components/core/CContainer'
import SegmentedToggle from '@/components/SegmentedToggle'
import Box from '@/components/Box'
import AssetRow, { AssetColumnsHeader, AssetSeparator } from '@/components/AssetRow'
import LoadState from '@/components/LoadState'
import WalletOverview from '@/components/WalletOverview'
import useHome from '@/hooks/useHome'
import useWallet from '@/hooks/useWallet'
import type { HomeCategory, HomeMode, PopularAsset } from '@/types/market'
import type { LoadStatus } from '@/types/load-status'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { themes } from '@/theme/themes'
import { formatUsd } from '@/utils/format'

const { spacing } = themes;

const ESTIMATED_ROW_HEIGHT = 60;
// Leaves room so the last row is not hidden behind the floating tab bar.
const LIST_FOOTER_HEIGHT = 72;

// Data for both modes is loaded here, so switching modes does not refetch.
// The category toggle is hidden instead of unmounted to keep its position.
export default function Home() {
  const [mode, setMode] = useState<HomeMode>('Exchange');
  const market = useHome();
  const wallet = useWallet();
  const isExchange = mode === 'Exchange';

  return (
    <CContainer>
      <LayoutFirstSection
        isExchange={isExchange}
        setMode={setMode}
        setSelectedCategory={market.setSelectedCategory}
      />
      {isExchange ? (
        <LayoutSecondSection data={market.assets} status={market.status} onRetry={market.retry} />
      ) : (
        <Box>
          <LoadState status={wallet.status} errorMessage='Could not load wallet.' onRetry={wallet.retry}>
            {wallet.summary && <WalletOverview summary={wallet.summary} allocation={wallet.allocation} />}
          </LoadState>
        </Box>
      )}
    </CContainer>
  )
}

type LayoutFirstSectionProps = {
  isExchange: boolean;
  setMode: (mode: HomeMode) => void;
  setSelectedCategory: (category: HomeCategory) => void;
};

const LayoutFirstSection = ({ isExchange, setMode, setSelectedCategory }: LayoutFirstSectionProps) => (
  <>
    <View style={styles.modeToggle}>
      <SegmentedToggle
        options={['Exchange', 'Wallet']}
        onChange={(selected) => setMode(selected as HomeMode)}
      />
    </View>
    <View style={[styles.categoryToggle, !isExchange && styles.hidden]}>
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
      <AssetColumnsHeader labels={['Name / Turnover', 'Last Price', 'Change']} />
      <LoadState status={status} errorMessage='Could not load assets.' onRetry={onRetry}>
        <BodyBoxSection data={data} />
      </LoadState>
    </View>
  </Box>
);

const BodyBoxSection = ({ data }: { data: PopularAsset[] }) => {
  const renderItem: ListRenderItem<PopularAsset> = useCallback(
    ({ item }) => (
      <AssetRow
        iconName={item.iconName}
        title={item.coin}
        value={formatUsd(item.priceUsd)}
        changePct={item.changePct}
      />
    ),
    []
  );

  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      estimatedItemSize={ESTIMATED_ROW_HEIGHT}
      ItemSeparatorComponent={AssetSeparator}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={<View style={styles.listFooter} />}
    />
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
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
  listContent: {
    paddingBottom: spacing.s24,
  },
  listFooter: {
    height: LIST_FOOTER_HEIGHT,
  },
});
