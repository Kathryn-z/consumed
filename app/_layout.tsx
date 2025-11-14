import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="searchInsert"
          options={{
            title: "Search Content",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="searchRecords"
          options={{
            title: "Search Records",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="contentDetail"
          options={({ navigation }) => ({
            title: "Content Details",
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
        />
        <Stack.Screen
          name="customEntry"
          options={({ navigation }) => ({
            title: "Custom Entry",
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
        />
        <Stack.Screen
          name="customEntryRecord"
          options={({ navigation }) => ({
            title: "Record Consumption",
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
        />
      </Stack>
    </>
  );
}
