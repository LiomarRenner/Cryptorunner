import { View, StyleSheet } from "react-native";

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
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    padding: 16,
  },
});
