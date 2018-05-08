import React, { Component } from "react";
import { AuthRequests } from "../store/actions/auth";
import { TextInput, Button, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "support@codepier.io",
      password: "secret",
    };
  }

  login() {
    let { navigate } = this.props.navigation;
    this.props.dispatch(
      AuthRequests.login(this.state, () => {
        navigate("Dashboard");
      }),
    );
    // this.authService.login(this.state).then(() => {
    //   deviceService.addDeviceToAccount().then((device) => {
    //     navigate("Dashboard");
    //   })
    // });
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

export default connect()(Login);
