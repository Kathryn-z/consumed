import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: -5 }}
            >
              <Ionicons name="chevron-back-outline" size={28} />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="searchInsert"
          options={({ route }) => {
            const params = route.params as { category?: string };
            const category = params?.category;
            let title = "Search";
            if (category === "TV/Movie") title = "Search TV / Movie";
            else if (category) title = `Search ${category}`;
            return { title };
          }}
        />
        <Stack.Screen
          name="searchRecords"
          options={{
            title: "Search Records",
          }}
        />
        <Stack.Screen
          name="contentDetail"
          options={{
            title: "Content Details",
          }}
        />
        <Stack.Screen
          name="customEntry"
          options={{
            title: "Custom Entry",
          }}
        />
        <Stack.Screen
          name="customEntryRecord"
          options={{
            title: "Record Consumption",
          }}
        />
      </Stack>
    </>
  );
}
