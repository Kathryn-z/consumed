import { StyleSheet } from "react-native";
import { colors, pageStyles, spacing } from "../common";

export const contentInfoStyles = StyleSheet.create({
  container: {
    ...pageStyles.container,
  },
  content: {
    ...pageStyles.content,
  },
  scrollContent: {
    ...pageStyles.scrollContent,
  },
  formContainer: {
    gap: spacing.md,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: spacing.xs,
    color: colors.text.primary,
  },
  inputGroup: {
    marginBottom: spacing.sm,
  },
  button: {
    height: 50,
    backgroundColor: colors.selected,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    marginTop: spacing.sm,
  },
  cancelButtonText: {
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  chipActive: {
    backgroundColor: colors.selected,
    borderColor: colors.selected,
  },
  chipText: {
    fontSize: 14,
    color: "#333",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 8,
  },
  star: {
    fontSize: 32,
    color: "#FFD700",
  },
  inputWithButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  inputWithClearButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingRight: 45,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
