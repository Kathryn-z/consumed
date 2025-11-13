import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { recordsStyles } from "@/styles/screens/records";

export default function Records() {
  return (
    <SafeAreaView style={recordsStyles.container}>
      <View style={recordsStyles.content}>
        <Text style={recordsStyles.title}>My Records</Text>
        <Text style={recordsStyles.description}>
          View all your rated and recorded content.
        </Text>
        {/* List of consumed content will be displayed here */}
        {/* Filters and sorting options will be added here */}
      </View>
    </SafeAreaView>
  );
}
