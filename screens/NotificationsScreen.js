import { View, StyleSheet, Text } from "react-native";

function NotificationsScreen() {
  return (
    <View style={styles.root}>
      <Text>Home Screen/Feed</Text>
    </View>
  );
}

export default NotificationsScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
