import { statusRatingChipStyles } from "@/styles/components/chips/statusRatingChip";
import { ContentStatus } from "@/types/content";
import { Text, TouchableOpacity, View } from "react-native";

interface StatusRatingChipProps {
  status: ContentStatus | string;
  rating?: number;
  onPress?: () => void;
}

export function StatusRatingChip({
  status,
  rating,
  onPress,
}: StatusRatingChipProps) {
  // Show rating chip if status is "done" and rating exists
  if (status === "done" && rating) {
    return (
      <View style={statusRatingChipStyles.ratingChip}>
        <Text style={statusRatingChipStyles.ratingText}>
          {rating.toFixed(1)}
        </Text>
        <Text style={statusRatingChipStyles.ratingStar}>★</Text>
      </View>
    );
  }

  // Show todo button for todo status
  if (status === "todo") {
    return (
      <TouchableOpacity
        style={statusRatingChipStyles.todoButton}
        onPress={onPress}
        disabled={!onPress}
      >
        <Text style={statusRatingChipStyles.todoButtonText}>{status}</Text>
      </TouchableOpacity>
    );
  }

  // Show status button for done without rating or other statuses
  return (
    <TouchableOpacity
      style={statusRatingChipStyles.statusButton}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={statusRatingChipStyles.statusButtonText}>{status}</Text>
    </TouchableOpacity>
  );
}
