import { View, StyleSheet } from "react-native";
import { themes } from "@/theme/themes";

const { colors, spacing } = themes;

export default function Box({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.boxContainer}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.deep_black,
    borderWidth: 1,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    padding: spacing.s24,
  },
});
