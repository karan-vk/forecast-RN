import React, { Component } from "react";
// import * as firebase from "firebase";
import { TextInput, View, Button } from "react-native";
import firebase from "firebase"; //install react-native-screens

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onLogin = this.onLogin.bind(this);
  }
  onLogin() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => console.log(user))
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button onPress={() => this.onLogin()} title="Sign in" />
      </View>
    );
  }
}
export default Login;
