import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "index") {
            iconName = "search";
          } else if (route.name === "records") {
            iconName = "list";
          } else if (route.name === "profile") {
            iconName = "person";
          }
          return (
            <View>
              <Ionicons name={iconName} color={focused ? "#517bd0ff" : "#808080"} size={24} />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
      />
      <Tabs.Screen
        name="records"
      />
      <Tabs.Screen
        name="profile"
      />
    </Tabs>
  );
}
