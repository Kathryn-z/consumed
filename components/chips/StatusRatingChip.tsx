import {
  STATUS_COLORS,
  statusRatingChipStyles,
} from "@/styles/components/chips/statusRatingChip";
import { ContentStatus } from "@/types/content";
import { Text, TouchableOpacity, View } from "react-native";

interface StatusRatingChipProps {
  status: ContentStatus | string;
  rating?: number;
  onPress?: () => void;
}

export enum RatingStatus {
  TODO = "todo",
  DONE = "done",
  RATED = "rated",
}

export function StatusRatingChip({
  status,
  rating,
  onPress,
}: StatusRatingChipProps) {
  // Show rating chip if status is "done" and rating exists
  if (status == "done" && rating) {
    const styles = statusRatingChipStyles(
      STATUS_COLORS.rated.bg,
      STATUS_COLORS.rated.text
    );
    return (
      <View style={styles.ratingChip}>
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        <Text style={styles.ratingText}>★</Text>
      </View>
    );
  }

  const colorSet = STATUS_COLORS[status as ContentStatus] || STATUS_COLORS.done;
  const styles = statusRatingChipStyles(colorSet.bg, colorSet.text);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.text}>{status}</Text>
    </TouchableOpacity>
  );
}
