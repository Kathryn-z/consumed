import { StyleSheet } from "react-native";
import { spacing, colors } from "../common";

export const customEntryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.md,
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: spacing.md,
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
    backgroundColor: "#007AFF",
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
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
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
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
});
