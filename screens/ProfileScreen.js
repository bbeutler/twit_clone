import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { DATA } from "../data/tweets";
import { EvilIcons } from "@expo/vector-icons";

function ProfileScreen() {
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 20 }}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  const profileHeader = () => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={{
            uri: "https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHBsYWluJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          }}
        />
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followBtnText}>Follow</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.profileName}>Ayomide Adebayo</Text>
          <Text style={styles.profileHandle}>@realTechie</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.profileContainerText}>
            Sofware Engineer | Tech Enthusiast | Manchester United Fan
          </Text>
        </View>
        <View style={styles.locationContainer}>
          <EvilIcons name="location" size={24} color="gray" />
          <Text style={styles.textGray}>Lagos, Nigeria</Text>
        </View>
        <View style={styles.linkContainer}>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => Linking.openURL("https://laracast.com")}
          >
            <EvilIcons name="link" size={24} color="gray" />
            <Text style={styles.linkColor}>Nicholas Idoko Technologies</Text>
          </TouchableOpacity>
          <View style={[styles.linkItem, styles.ml4]}>
            <EvilIcons name="calendar" size={24} color="gray" />
            <Text style={styles.textColor}>Joined May 2019</Text>
          </View>
        </View>
        <View style={styles.followContainer}>
          <View style={styles.followItem}>
            <Text style={styles.followNumber}>509</Text>
            <Text>Following</Text>
          </View>
          <View style={[styles.followItem, styles.ml4]}>
            <Text style={styles.followNumber}>2,354</Text>
            <Text>Followers</Text>
          </View>
        </View>
        <View style={styles.seperator}></View>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={profileHeader}
      ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
    />
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    width: 800,
    height: 100,
  },
  avatar: {
    height: 80,
    width: 80,
    marginRight: 8,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    marginTop: -34,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  followBtn: {
    borderRadius: 24,
    backgroundColor: "#0f1418",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 22,
  },
  profileHandle: {
    color: "gray",
    marginTop: 1,
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  profileContainer: {
    paddingHorizontal: 10,
    marginTop: 8,
  },
  profileContainerText: {
    lineHeight: 22,
  },
  textGray: {
    color: "gray",
  },
  locationContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  linkContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  ml4: {
    marginLeft: 16,
  },
  linkContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 4,
  },
  linkColor: {
    color: "#1d9bf1",
  },
  linkItem: {
    flexDirection: "row",
  },
  followContainer: {
    flexDirection: "row",
    paddingHorizontal: 14,
    marginTop: 8,
    paddingBottom: 10,
  },
  followItem: {
    flexDirection: "row",
  },
  followNumber: {
    fontWeight: "bold",
    marginRight: 5,
  },
  seperator: {
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
  },
});
