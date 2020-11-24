import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import format from "date-fns/format";
import axiosConfig from "../utils/axiosConfig";

function TweetScreen({ route, navigation }) {
  const [tweet, setTweet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTweet();
  }, []);

  const getTweet = () => {
    axiosConfig
      .get(`http://192.168.0.100:8000/api/tweets/${route.params.id}`)
      .then((response) => {
        setTweet(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        Alert.alert("Error", "Something went wrong");
      });
  };

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.flexRow}
              onPress={() => navigateToProfile()}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: tweet.user.avatar,
                }}
              />
              <View>
                <Text style={styles.tweetName}>{tweet.user.name}</Text>
                <Text style={styles.tweetHandle}>@{tweet.user.username}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.tweetContentBox}>
            <Text style={styles.tweetContent}>{tweet.body}</Text>
            <View style={styles.tweetTimestampContainer}>
              <Text style={styles.tweetTimestampText}>
                {format(new Date(tweet.created_at), "h:mm:a")}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={styles.tweetTimestampText}>
                {" "}
                {format(new Date(tweet.created_at), "d MMM.yy")}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={[styles.tweetTimestampText, styles.linkColor]}>
                Twitter for iPhone
              </Text>
            </View>
          </View>
          <View style={styles.tweetEngagement}>
            <View style={styles.flexRow}>
              <Text style={styles.tweetCount}>628</Text>
              <Text style={styles.tweetText}>Retweets</Text>
            </View>
            <View style={[styles.flexRow, styles.marginUtility]}>
              <Text style={styles.tweetCount}>38</Text>
              <Text style={styles.tweetText}>Quote Retweets</Text>
            </View>
            <View style={[styles.flexRow, styles.marginUtility]}>
              <Text style={styles.tweetCount}>2,934</Text>
              <Text style={styles.tweetText}>Likes</Text>
            </View>
          </View>
          <View style={[styles.tweetEngagement, styles.spaceAround]}>
            <TouchableOpacity>
              <EvilIcons name="comment" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons name="retweet" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons name="heart" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons
                name={
                  Platform.OS === "android" ? "share-google" : "share-apple"
                }
                size={32}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

export default TweetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  marginUtility: {
    marginLeft: 16,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  avatar: {
    height: 45,
    width: 45,
    marginRight: 8,
    borderRadius: 21,
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222222",
  },
  tweetHandle: {
    color: "gray",
    marginTop: 4,
  },
  tweetContentBox: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingTop: 10,
  },
  tweetContent: {
    lineHeight: 30,
    fontSize: 20,
    textAlign: "justify",
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  tweetText: {
    color: "gray",
  },
  tweetCount: {
    fontWeight: "bold",
    marginRight: 5,
  },
  tweetEngagement: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tweetTimestampContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  tweetTimestampText: {
    color: "gray",
    marginRight: 6,
  },
  linkColor: {
    color: "#1d9bf1",
  },
});
