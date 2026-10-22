import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { themes } from '@/theme/themes'

const { colors, spacing, fontSize, shape } = themes;

type ComingSoonProps = {
  title: string;
  description: string;
};

// Placeholder for tabs whose content is not built yet.
export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Coming soon</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.s12,
    paddingHorizontal: spacing.s32,
  },
  badge: {
    backgroundColor: colors.on_primary,
    borderRadius: shape.pill,
    paddingHorizontal: spacing.s12,
    paddingVertical: spacing.s4,
  },
  badgeText: {
    color: colors.primary_green,
    fontSize: fontSize.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.on_primary,
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  description: {
    color: colors.on_primary,
    fontSize: fontSize.md,
    textAlign: 'center',
  },
});
