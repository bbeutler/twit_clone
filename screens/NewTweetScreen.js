import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useState } from "react";

function NewTweetScreen({ navigation }) {
  const [tweet, setTweet] = useState("");
  function sendTweet() {
    navigation.navigate("Tab");
  }
  return (
    <View style={styles.container}>
      <View style={styles.tweetButtonContainer}>
        <Text style={tweet.length > 250 ? styles.textRed : styles.textGray}>
          Characters left:{280 - tweet.length}
        </Text>
        <TouchableOpacity style={styles.tweetBtn} onPress={() => sendTweet()}>
          <Text style={styles.tweetBtnText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tweetBoxContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={setTweet}
          value={tweet}
          placeholder="What's happening?"
          placeholderTextColor="gray"
          multiline
          maxLength={280}
        />
      </View>
    </View>
  );
}

export default NewTweetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  tweetButtonContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  tweetBtn: {
    borderRadius: 24,
    backgroundColor: "#1d9bf1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  tweetBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: 8,
    marginTop: 10,
    borderRadius: 21,
  },
  tweetBoxContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  input: {
    fontSize: 18,
    lineHeight: 28,
    padding: 10,
    flex: 1,
  },
  textRed: {
    color: "red",
  },
  textGray: {
    color: "gray",
  },
});
