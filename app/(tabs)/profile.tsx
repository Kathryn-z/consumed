import { profileStyles } from "@/styles/screens/profile";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={profileStyles.container}>
      <View style={profileStyles.content}>
        <Text style={profileStyles.pageTitle}>Profile</Text>
        <Text style={profileStyles.description}>
          Manage your user information and app settings.
        </Text>
        {/* User info section will be added here */}
        {/* Settings options will be added here */}
      </View>
    </SafeAreaView>
  );
}
