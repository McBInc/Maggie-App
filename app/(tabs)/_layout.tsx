import { Tabs } from "expo-router";
import { Home, BookOpen, Search, Shield, Lock } from "lucide-react-native";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: Platform.select({
          web: { overflow: "visible" },
          default: {},
        }),
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color }) => <Search size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => <BookOpen size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="assessment"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color }) => <Shield size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="vault"
        options={{
          title: "Vault",
          tabBarIcon: ({ color }) => <Lock size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
