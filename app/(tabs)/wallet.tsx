import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import CContainer from '@/components/core/CContainer'
import Box from '@/components/Box'

export default function Wallet() {
  return (
    <CContainer>
      <View>
        <Text>REPLACE WITH IMAGE</Text>
      </View>
      <Box>
        <BoxTitleSubtitle title='Sign up and get rewards' subtitle='Sign up now and earn exciting rewards instantly!' />
        <CButton onPress={() => console.log('Sign Up Pressed')} text='Sign up' />
        <Text style={{ color: 'gray', alignSelf: 'center', fontSize: 14 }}>--- or continue with ---</Text>
        <Text>Social login</Text>
        <Text style={{ color: 'gray', alignSelf: 'center' }}>Already have an account? <Text style={{ color: '#BCFF31' }}>Log in</Text></Text>
      </Box>
    </CContainer>
  )
}

const BoxTitleSubtitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <View style={{ alignItems: 'center', gap: 8 }}>
    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
    <Text style={{ color: 'gray', fontSize: 16 }}>{subtitle}</Text>
  </View>
);
const CButton = ({ onPress, text }: { onPress: () => void; text: string }) => (
  <Pressable onPress={onPress} style={{ backgroundColor: '#BCFF31', padding: 16, borderRadius: 38, marginVertical: 16 }}>
    <Text style={{ color: 'black', fontWeight: '500', textAlign: 'center', fontSize: 16 }}>{text}</Text>
  </Pressable>
)

export const styles = StyleSheet.create({
  imageContainer: {

  }, 

});