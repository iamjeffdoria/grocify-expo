import { useAuth } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const tabTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: tabTintColor, // ✅ correct
    }}
    >
     <Tabs.Screen
        name="index"
        options={{
          title: 'List',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="planner"
        options={{
          title: 'Planner',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}