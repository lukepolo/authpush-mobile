import axios from "axios";
import React, { Component } from "react";
import {
  AsyncStorage,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

let host = "https://9cfc0a23.ngrok.io";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
    };
    this.navigation = null;
  }

  login() {
    let { navigate } = this.props.navigation;
    axios.post(`${host}/api/login`, this.state).then(
      (response) => {
        AsyncStorage.setItem("@auth:token", response.data.accessToken).then(
          () => {
            navigate("Dashboard");
          },
        );
      },
      (error) => {
        console.log(error);
      },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Please Login</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true}
        />
        <Button
          onPress={this.login.bind(this)}
          title="Login"
          accessibilityLabel="Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
