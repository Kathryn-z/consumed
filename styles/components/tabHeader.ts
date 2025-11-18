import { StyleSheet } from "react-native";

export const tabHeaderStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 12,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 18,
  },
  tabContainer: {
    marginRight: 24,
    alignItems: "center",
  },
  tabText: {
    fontSize: 18,
    color: "#A3A0A8",
    fontWeight: "700",
  },
  tabTextActive: {
    color: "#000",
  },
  underline: {
    marginTop: 6,
    height: 2,
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 2,
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#ccc",
  },
  fullDivider: {
    height: 1,
    backgroundColor: "#eeececff",
    flex: 1,
  },
});
