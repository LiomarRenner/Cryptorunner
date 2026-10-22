import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import type { LoadStatus } from '@/types/load-status'
import { themes } from '@/theme/themes'

const { colors, spacing, fontSize, shape } = themes;

type LoadStateProps = {
  status: LoadStatus;
  errorMessage: string;
  onRetry: () => void;
  children: ReactNode;
};

// Renders the loading / error + retry / content states for async data.
export default function LoadState({ status, errorMessage, onRetry, children }: LoadStateProps) {
  if (status === 'loading') {
    return <ActivityIndicator color={colors.primary_green} />;
  }

  if (status === 'error') {
    return (
      <View style={styles.errorState}>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <Pressable onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  errorState: {
    alignItems: 'center',
    gap: spacing.s16,
  },
  errorText: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.text_muted,
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
});
