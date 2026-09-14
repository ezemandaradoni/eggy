import { Platform, StyleSheet } from "react-native";
export const theme = {
  colors: {
    cream: "#F7EEDB",
    paper: "#FFFAEE",
    ink: "#29251F",
    red: "#A83E32",
    mustard: "#E6B84C",
    green: "#3D6554",
    faint: "#726859",
  },
  spacing: { xs: 6, sm: 12, md: 20, lg: 28, xl: 40 },
  border: 2,
  radii: { card: 20, button: 14 },
  type: { small: 14, body: 18, heading: 32, instruction: 34 },
  shadow: {
    shadowColor: "#29251F",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 0,
    elevation: 2,
  },
};
export const styles = StyleSheet.create({
  title: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: theme.type.heading,
    lineHeight: 39,
    color: theme.colors.ink,
    fontWeight: "800",
  },
  body: { fontSize: 18, lineHeight: 27, color: theme.colors.ink },
  muted: { fontSize: 15, lineHeight: 23, color: theme.colors.faint },
  eyebrow: {
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: "800",
    color: theme.colors.green,
  },
  card: {
    backgroundColor: theme.colors.paper,
    borderWidth: theme.border,
    borderColor: theme.colors.ink,
    borderRadius: theme.radii.card,
    padding: 20,
    gap: 12,
  },
  input: {
    backgroundColor: theme.colors.paper,
    borderWidth: 2,
    borderColor: theme.colors.ink,
    borderRadius: 14,
    padding: 16,
    fontSize: 18,
    color: theme.colors.ink,
    minHeight: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
});
export const difficultyLabel = {
  easy: "Fácil",
  medium: "Media",
  hard: "Difícil",
};
