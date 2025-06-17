import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import BaseIcon from '@/components/BaseIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#0A0A0A',
          height: 100,
        },
        headerTitle: '',
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#BCFF31',
        tabBarShowLabel: false,
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
    <View style={{ marginTop: 44, position: 'absolute' }}>
      <BaseIcon size={24} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    marginHorizontal: '5%',
    width: '90%',
    alignSelf: 'center',
    height: 80,
    borderRadius: 36,
    backgroundColor: '#94978F',
    elevation: 5,
    shadowColor: '#0A0A0A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopWidth: 0,
  },
});
