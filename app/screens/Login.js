import axios from "axios";
import React, { Component } from "react";
import { AsyncStorage, TextInput, Button } from "react-native";

import { StyleSheet, Text, View } from "react-native";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
    };
  }

  login() {
    axios.post(`${host}/api/token`, this.state).then(
      (response) => {
        AsyncStorage.setItem("@auth:token", response.data.accessToken).then(
          () => {
            console.info("go to dashboard");
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
