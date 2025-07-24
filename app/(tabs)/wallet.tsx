import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import CContainer from '@/components/core/CContainer'
import Box from '@/components/Box'
import BaseIcon from '@/components/BaseIcon'

export default function Wallet() {
  return (
    <CContainer>
      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('@/assets/images/cryptorunner.png')}
          style={{ width: 250, height: 250, borderRadius: 100 }}
          resizeMode='contain'
        />
      </View>
      <Box>
        <BoxTitleSubtitle title='Sign up and get rewards' subtitle='Sign up now and earn exciting rewards instantly!' />
        <CButton onPress={() => console.log('Sign Up Pressed')} text='Sign up' />
        <ContinueLine />
        <SocialLogin />
        <AlreadyHaveAccount />
      </Box>
    </CContainer>
  )
}

const AlreadyHaveAccount = () => (
  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginVertical: 16 }}>
    <Text style={{ color: 'gray' }}>Already have an account?</Text>
    <Pressable onPress={() => console.log('Log in Pressed')}>
      <Text style={{ color: '#BCFF31' }}>Log in</Text>
    </Pressable>
  </View>
);

const ContinueLine = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 16 }}>
    <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
    <Text style={{ marginHorizontal: 8, color: 'gray' }}>or continue with</Text>
    <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
  </View>
);

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

const SocialLogin = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 }}>
    <Pressable onPress={() => console.log('Google Login Pressed')}>
      <BaseIcon name='logo-google' color='#BCFF31' size={44} />  
    </Pressable>
    <Pressable onPress={() => console.log('Apple Login Pressed')}>
      <BaseIcon name='logo-apple' color='#BCFF31' size={44} />
    </Pressable>
    <Pressable onPress={() => console.log('Facebook Login Pressed')}>
      <BaseIcon name='logo-facebook' color='#BCFF31' size={44} />
    </Pressable>
  </View>
);  
