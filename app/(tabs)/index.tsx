import { View, Text, ActivityIndicator } from 'react-native'
import React, { memo, useCallback } from 'react'
import CContainer from '@/components/core/CContainer'
import SegmentedToggle from '@/components/SegmentedToggle'
import Box from '@/components/Box'
import BaseIcon from '@/components/BaseIcon'
import useHome, { HomeCategory } from '@/hooks/useHome'
import { PopularAsset } from '@/services/market-service'
import { FlashList, ListRenderItem } from '@shopify/flash-list'

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

const LayoutFirstSection = ({ setSelectedCategory }: { setSelectedCategory: (v:HomeCategory) => void }) => (
  <>
    <View style={{ width: '50%', paddingHorizontal: 16, paddingVertical: 16 }}>
      <SegmentedToggle
        options={['Exchange', 'Wallet']}
        onChange={noop}
      />
    </View>
    <View style={{ width: '100%', paddingHorizontal: 16, paddingVertical: 8 }}>
      <SegmentedToggle
        options={['Popular', 'Winners', 'Losers']}
        onChange={(selected) => setSelectedCategory(selected as HomeCategory)}
      />
    </View>
  </>
);

const LayoutSecondSection = ({ data, isLoading }: { data: PopularAsset[]; isLoading: boolean }) => (
  <Box>
    <View style={{ gap: 16, alignContent: 'center', flex: 1 }}>
      <TitleBoxSection />
      {isLoading ? <ActivityIndicator color='#BCFF31' /> : <BodyBoxSection data={data} />}
    </View>
  </Box>
);

const TitleBoxSection = () => (
  <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={{ flex: 1, alignItems: 'flex-start' }}>
      <Text style={{ fontSize: 14, fontWeight: '400', color: '#888' }}>Name / Turnover</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Text style={{ fontSize: 14, fontWeight: '400', color: '#888' }}>Last Price</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Text style={{ fontSize: 14, fontWeight: '400', color: '#888' }}>Change</Text>
    </View>
  </View>
);

const ThinLine = memo(() => (
  <View style={{ height: 1, backgroundColor: '#666', marginVertical: 16 }} />
));

const AssetRow = memo(({ item }: { item: PopularAsset }) => (
  <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', gap: 8 }}>
      <BaseIcon name={item.iconName} backgroundColor='#888' color='white' />
      <Text style={{ fontSize: 14, fontWeight: '400', color: 'white' }}>{item.coin}</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Text style={{ fontSize: 14, fontWeight: '400', color: 'white' }}>{item.lastPrice}</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <View
        style={{
          alignItems: 'center',
          borderRadius: 64,
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: item.change.includes('-') ? '#FF4D4F' : '#BCFF31',
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: item.change.includes('-') ? 'white' : 'black',
          }}
        >
          {item.change}
        </Text>
      </View>
    </View>
  </View>
));

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
      estimatedItemSize={60}
      ItemSeparatorComponent={ThinLine}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
      ListFooterComponent={<View style={{ height: 72 }} />}
    />
  );
};
