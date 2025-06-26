import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CContainer from '@/components/core/CContainer'
import SegmentedToggle from '@/components/SegmentedToggle'
import Box from '@/components/Box'
import BaseIcon from '@/components/BaseIcon'

export default function Home() {
  return (
    <CContainer>
      <LayoutFirstSection />
      <LayoutSecondSection />
    </CContainer>
  )
}

const LayoutFirstSection = () => {
  return (
    <>
      <View style={{ width: '50%', paddingHorizontal: 16, paddingVertical: 16 }}>
        <SegmentedToggle
          options={['Exchange', 'Wallet']}
          onChange={(selected) => console.log('Selecionado:', selected)}
        />
      </View>
      <View style={{ width: '100%', paddingHorizontal: 16, paddingVertical: 8 }}>
        <SegmentedToggle
          options={['Popular', 'Winners', 'Losers', 'New']}
          onChange={(selected) => console.log('Selecionado:', selected)}
        />
      </View>
    </>
  );
};

const LayoutSecondSection = () => {
  return (
    <Box>
      <View style={{ gap: 16, alignContent: 'center' }}>
        <TitleBoxSection />
        <BodyBoxSection />
      </View>
    </Box>
  );
};

const TitleBoxSection = () => {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
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
};

const BodyBoxSection = () => {
  return (
    <>
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', gap: 8 }}>
          <BaseIcon name="logo-bitcoin" backgroundColor='#888' color='white' />
          <Text style={{ fontSize: 14, fontWeight: '400', color: 'white' }}>BTC / USDT</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 14, fontWeight: '400', color: 'white' }}>$63,680</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <View style={{ alignItems: 'center', borderRadius: 64, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#BCFF31' }}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>+0.80%</Text>
          </View>
        </View>
      </View>
      <ThinLine />
    </>
  );
};


const ThinLine = () => <View style={{ height: 1, backgroundColor: '#666', marginVertical: 8 }} />;
