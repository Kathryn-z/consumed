import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { listStyles } from "@/styles/screens/list";

export default function List() {
  return (
    <SafeAreaView style={listStyles.container}>
      <View style={listStyles.content}>
        <Text style={listStyles.title}>My List</Text>
        <Text style={listStyles.description}>
          View all your rated and recorded content.
        </Text>
        {/* List of consumed content will be displayed here */}
        {/* Filters and sorting options will be added here */}
      </View>
    </SafeAreaView>
  );
}
