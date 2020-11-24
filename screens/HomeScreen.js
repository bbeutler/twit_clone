import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import formatDistance from "../utils/formatDistanceCustom";
import axiosConfig from "../utils/axiosConfig";

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  //SEND REQUEST UNMOUNT

  useEffect(() => {
    getAllTweets();
  }, []);

  const getAllTweets = () => {
    axiosConfig
      .get(`/tweets?page=${page}`)
      .then((response) => {
        if (page == 1) {
          setData(response.data.data);
        } else {
          setData((prevData) => [...prevData, ...response.data.data]);
        }

        if (!response.data.next_page_url) {
          setIsScrollEnd(true);
        }

        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const goToTweetScreen = (tweetId) => {
    navigation.navigate("Tweet", {
      id: tweetId,
    });
  };

  const goToNewTweet = () => {
    navigation.navigate("New Tweet");
  };

  function dateIsValid(date) {
    return !Number.isNaN(new Date(date));
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    getAllTweets();
  };

  const handleEnd = () => {
    console.log("At end");
    setPage((prevPage) => prevPage + 1);
    getAllTweets();
  };

  const renderItemHandler = ({ item: tweet }) => {
    return (
      <View style={styles.tweetContainer}>
        <TouchableOpacity onPress={() => goToTweetScreen(tweet.user.id)}>
          <Image
            style={styles.avatar}
            source={{ uri: tweet.user && tweet.user.avatar }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.flexRow}
            onPress={() => goToTweetScreen()}
          >
            <Text numberOfLines={1} style={styles.tweetName}>
              {tweet.user && tweet.user.name}
            </Text>
            <Text numberOfLines={1} style={styles.tweetHandle}>
              {"@" + (tweet.user && tweet.user.username)}
            </Text>
            <Text>&middot;</Text>
            <Text numberOfLines={1} style={styles.tweetHandle}>
              {formatDistanceToNowStrict(new Date(tweet.created_at), {
                locale: {
                  ...locale,
                  formatDistance,
                },
              })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.alignment}>{tweet.body}</Text>
          </TouchableOpacity>
          <View style={styles.tweetEngagement}>
            <TouchableOpacity style={styles.flexRow}>
              <EvilIcons
                name="comment"
                size={24}
                color="gray"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.textGray}>34</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, styles.spaceRight]}>
              <EvilIcons
                name="retweet"
                size={24}
                color="gray"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.textGray}>594</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, styles.spaceRight]}>
              <EvilIcons
                name="heart"
                size={24}
                color="gray"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.textGray}>400</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, styles.spaceRight]}>
              <EvilIcons
                name={
                  Platform.OS === "android" ? "share-google" : "share-apple"
                }
                size={24}
                color="gray"
                style={{ marginRight: 4 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0.3}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItemHandler}
          ListFooterComponent={() => (
            <ActivityIndicator size="large" color="gray" />
          )}
          ItemSeparatorComponent={() =>
            !isScrollEnd && <View style={styles.tweetSeperator}></View>
          }
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => goToNewTweet()}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  tweetContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  flexRow: {
    flexDirection: "row",
  },
  avatar: {
    height: 32,
    width: 32,
    marginRight: 8,
    borderRadius: 21,
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222222",
  },
  tweetHandle: {
    marginHorizontal: 8,
    color: "gray",
  },
  tweetContentContainer: {
    lineHeight: 22,
  },
  tweetContent: {
    marginTop: 4,
  },
  alignment: {
    textAlign: "justify",
    color: "black",
    fontWeight: "450",
  },
  textGray: {
    color: "gray",
  },
  tweetEngagement: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  spaceRight: {
    marginLeft: 16,
  },
  tweetSeperator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d9bf1",
    position: "absolute",
    bottom: 20,
    right: 12,
  },
});
