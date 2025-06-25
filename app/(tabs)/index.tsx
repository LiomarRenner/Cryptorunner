import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CContainer from '@/components/core/CContainer'
import SegmentedToggle from '@/components/SegmentedToggle'
import Box from '@/components/Box'

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
      <View style={{ width: '50%', paddingHorizontal: 16, paddingVertical: 8 }}>
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
      <Text>Home</Text>
    </Box>
  );
};
