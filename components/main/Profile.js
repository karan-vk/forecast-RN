import React, { Component } from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";

import { connect } from "react-redux";

function Profile(props) {
  const { currentUser, posts } = props;
  console.log({ currentUser, posts });
  const rendImg = ({ item }) => (
    <Image style={styles.image} source={{ uri: item.downloadURL }} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text> {currentUser.name} </Text>
        <Text> {currentUser.email} </Text>
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          maxToRenderPerBatch={100} // Increase time between renders
          windowSize={7}
          horizontal={false}
          data={posts}
          renderItem={rendImg}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
