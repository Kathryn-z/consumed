import { statusRatingChipStyles } from "@/styles/components/chips/chips";
import { ContentStatus } from "@/types/content";
import Chip from "./Chip";

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
  if (status == "done") {
    if (rating) {
      const styles = statusRatingChipStyles("rated", "small");
      return (
        <Chip
          label={`${rating.toFixed(1)} ★`}
          styles={styles}
          onPress={onPress}
        />
      );
    } else {
      const styles = statusRatingChipStyles("done", "small");
      return <Chip label={"done"} styles={styles} onPress={onPress} />;
    }
  }
  const styles = statusRatingChipStyles("todo", "small");
  return <Chip label={status} styles={styles} onPress={onPress} />;
}
