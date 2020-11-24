import { View, StyleSheet, Text } from "react-native";

function SettingsScreen() {
  return (
    <View style={styles.root}>
      <Text>Home Screen/Feed</Text>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
