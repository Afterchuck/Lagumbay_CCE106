import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';

export default function PortalTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFDF7' },
        headerShadowVisible: false,
        headerTintColor: '#25324A',
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: '#275DAD',
        tabBarInactiveTintColor: '#7C7F8C',
        tabBarStyle: {
          backgroundColor: '#FFFDF7',
          borderTopColor: '#E8E1D6',
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable
                accessibilityLabel="Open profile"
                accessibilityRole="button"
                hitSlop={12}
                style={{ marginRight: 16 }}
              >
                <SymbolView
                  name={{ ios: 'person.circle.fill', android: 'account_circle', web: 'account_circle' }}
                  size={26}
                  tintColor="#275DAD"
                />
              </Pressable>
            </Link>
          ),
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: 'house.fill', android: 'home', web: 'home' }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: 'person.fill', android: 'person', web: 'person' }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
