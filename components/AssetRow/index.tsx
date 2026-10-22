import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import BaseIcon from '@/components/BaseIcon'
import type { IconName } from '@/types/market'
import { themes } from '@/theme/themes'
import { formatPercent } from '@/utils/format'

const { colors, spacing, fontSize, shape } = themes;

type AssetRowProps = {
  iconName: IconName;
  title: string;
  subtitle?: string;
  value: string;
  changePct: number;
};

// Shared three-column row (name, value, change badge) used by every asset list.
const AssetRow = memo(({ iconName, title, subtitle, value, changePct }: AssetRowProps) => {
  const isNegative = changePct < 0;
  return (
    <View style={styles.row}>
      <View style={styles.nameColumn}>
        <BaseIcon name={iconName} backgroundColor={colors.text_muted} color={colors.white} />
        <View>
          <Text style={styles.valueText}>{title}</Text>
          {subtitle !== undefined && <Text style={styles.headerText}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.columnEnd}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
      <View style={styles.columnEnd}>
        <View style={[styles.changeBadge, isNegative ? styles.changeBadgeNegative : styles.changeBadgePositive]}>
          <Text style={[styles.changeText, isNegative ? styles.changeTextNegative : styles.changeTextPositive]}>
            {formatPercent(changePct)}
          </Text>
        </View>
      </View>
    </View>
  );
});

export default AssetRow;

type AssetColumnsHeaderProps = {
  labels: [string, string, string];
};

export const AssetColumnsHeader = ({ labels }: AssetColumnsHeaderProps) => (
  <View style={styles.row}>
    <View style={styles.columnStart}>
      <Text style={styles.headerText}>{labels[0]}</Text>
    </View>
    <View style={styles.columnEnd}>
      <Text style={styles.headerText}>{labels[1]}</Text>
    </View>
    <View style={styles.columnEnd}>
      <Text style={styles.headerText}>{labels[2]}</Text>
    </View>
  </View>
);

export const AssetSeparator = memo(() => <View style={styles.separator} />);

const styles = StyleSheet.create({
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
  nameColumn: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    gap: spacing.s8,
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
    marginVertical: spacing.s16,
  },
  changeBadge: {
    alignItems: 'center',
    borderRadius: shape.pill,
    paddingVertical: spacing.s8,
    paddingHorizontal: spacing.s12,
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
});
