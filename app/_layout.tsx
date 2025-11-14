import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Text } from "react-native";
import { layoutStyles } from "@/styles/layout";

export default function RootLayout() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="auto" />
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Index",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="records"
          options={{
            title: "Records",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="searchInsert"
          options={{
            href: null,
            title: "Search Content",
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="searchRecords"
          options={{
            href: null,
            title: "Search Records",
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="contentDetail"
          options={{
            href: null,
            title: "Content Details",
            headerShown: true,
            headerShadowVisible: false,
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={layoutStyles.backButton}
              >
                <Text style={layoutStyles.backButtonText}>&lt;</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="customEntry"
          options={{
            href: null,
            title: "Add Custom Entry",
            headerShown: true,
            headerShadowVisible: false,
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={layoutStyles.backButton}
              >
                <Text style={layoutStyles.backButtonText}>&lt;</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="customEntryRecord"
          options={{
            href: null,
            title: "Record Consumption",
            headerShown: true,
            headerShadowVisible: false,
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={layoutStyles.backButton}
              >
                <Text style={layoutStyles.backButtonText}>&lt;</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
    </>
  );
}