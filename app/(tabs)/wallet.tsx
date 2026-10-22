import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import CContainer from '@/components/core/CContainer'
import Box from '@/components/Box'
import BaseIcon from '@/components/BaseIcon'
import { themes } from '@/theme/themes'

const { colors, spacing, fontSize } = themes;

const SOCIAL_ICON_SIZE = 44;
const HERO_IMAGE_SIZE = 250;
const HERO_IMAGE_RADIUS = 100;
const BUTTON_RADIUS = 38;

export default function Wallet() {
  return (
    <CContainer>
      <View style={styles.hero}>
        <Image
          source={require('@/assets/images/cryptorunner.png')}
          style={styles.heroImage}
          resizeMode='contain'
        />
      </View>
      <Box>
        <BoxTitleSubtitle title='Sign up and get rewards' subtitle='Sign up now and earn exciting rewards instantly!' />
        <CButton text='Sign up' />
        <ContinueLine />
        <SocialLogin />
        <AlreadyHaveAccount />
      </Box>
    </CContainer>
  )
}

const AlreadyHaveAccount = () => (
  <View style={styles.accountRow}>
    <Text style={styles.secondaryText}>Already have an account?</Text>
    <Pressable>
      <Text style={styles.linkText}>Log in</Text>
    </Pressable>
  </View>
);

const ContinueLine = () => (
  <View style={styles.continueRow}>
    <View style={styles.continueLine} />
    <Text style={[styles.secondaryText, styles.continueText]}>or continue with</Text>
    <View style={styles.continueLine} />
  </View>
);

const BoxTitleSubtitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <View style={styles.titleBlock}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const CButton = ({ onPress, text }: { onPress?: () => void; text: string }) => (
  <Pressable onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
)

const SocialLogin = () => (
  <View style={styles.socialRow}>
    <Pressable>
      <BaseIcon name='logo-google' color={colors.primary_green} size={SOCIAL_ICON_SIZE} />
    </Pressable>
    <Pressable>
      <BaseIcon name='logo-apple' color={colors.primary_green} size={SOCIAL_ICON_SIZE} />
    </Pressable>
    <Pressable>
      <BaseIcon name='logo-facebook' color={colors.primary_green} size={SOCIAL_ICON_SIZE} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  hero: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: HERO_IMAGE_SIZE,
    height: HERO_IMAGE_SIZE,
    borderRadius: HERO_IMAGE_RADIUS,
  },
  accountRow: {
    flexDirection: 'row',
    gap: spacing.s8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.s16,
  },
  secondaryText: {
    color: colors.text_muted,
  },
  linkText: {
    color: colors.primary_green,
  },
  continueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.s16,
  },
  continueLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider_subtle,
  },
  continueText: {
    marginHorizontal: spacing.s8,
  },
  titleBlock: {
    alignItems: 'center',
    gap: spacing.s8,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.text_muted,
    fontSize: fontSize.md,
  },
  button: {
    backgroundColor: colors.primary_green,
    padding: spacing.s16,
    borderRadius: BUTTON_RADIUS,
    marginVertical: spacing.s16,
  },
  buttonText: {
    color: colors.on_primary,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: fontSize.md,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: spacing.s16,
  },
});
