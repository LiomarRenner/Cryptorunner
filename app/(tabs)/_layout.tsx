import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import BaseIcon from '@/components/BaseIcon';
import { themes } from '@/theme/themes';

const { colors, spacing } = themes;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: styles.header,
        headerTitle: '',
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary_green,
        tabBarShowLabel: false,
        headerLeft: () => (
          <Pressable style={styles.headerLeft}>
            <BaseIcon name='person' size={24} color={colors.primary_green} />
          </Pressable>
        ),
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: 'Market',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="stopwatch" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='analytics'
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="stats-chart-sharp" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Wallet',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="wallet" color={color} />
            ),
          }}
        />
    </Tabs>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return (
    <View style={styles.tabBarIcon}>
      <BaseIcon size={24} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.deep_black,
    height: 100,
  },
  headerLeft: {
    marginLeft: spacing.md,
  },
  tabBarIcon: {
    marginTop: 44,
    position: 'absolute',
  },
  tabBar: {
    position: 'absolute',
    bottom: 20,
    marginHorizontal: '5%',
    width: '90%',
    alignSelf: 'center',
    height: 80,
    borderRadius: 36,
    backgroundColor: colors.gray,
    elevation: 5,
    shadowColor: colors.deep_black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopWidth: 0,
  },
});
