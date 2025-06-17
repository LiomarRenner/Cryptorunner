import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return (
    <View style={{ 
      width: 44, 
      height: 44, 
      borderRadius: 22, 
      backgroundColor: '#0A0A0A',
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: 44,
      opacity: props.color === '#BCFF31' ? 1 : 0.5,
    }}>
      <Ionicons size={28} {...props} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#BCFF31'
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: 'Market',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="stopwatch" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='analytics'
          options={{
            title: 'Analytics',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="stats-chart-sharp" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Wallet',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="wallet" color={color} />
            ),
          }}
        />
    </Tabs>
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
