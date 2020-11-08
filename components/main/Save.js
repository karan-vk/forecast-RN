import React, { useState } from "react";
import { Text, View, Button, StyleSheet, Image, TextInput } from "react-native";
import * as firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props, { navigation }) {
  // console.log(props.route.params.image);
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const uri = props.route.params.image;

    const response = await fetch(uri);
    const blob = await response.blob();
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef
      .child(
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(25)}`
      )
      .put(blob);

    uploadTask.on(
      "state_changed",
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            // console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            // console.log("Upload is running");
            break;
        }
      },
      function(error) {
        console.log(error);
      },
      function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          savePostData(downloadURL);
        });
      }
    );
  };
  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL: downloadURL,
        caption: caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function() {
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a caption ..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
