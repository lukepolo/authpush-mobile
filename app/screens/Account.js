import { connect } from "react-redux";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import OneTimeTokenGenerator from "./../services/OneTimeTokenGenerator";

class Account extends Component {
  constructor() {
    super();
    this.oneTimeTokenGenerator = new OneTimeTokenGenerator();

    this.state = {
      countDown: this._countdown(),
      timer: setInterval(this.updateCountDown.bind(this), 1000),
    };
  }

  generateToken() {
    return this.oneTimeTokenGenerator.generate(
      this.props.navigation.getParam("account").credentials.key,
    );
  }

  _countdown() {
    return 30 - Math.round(new Date().getTime() / 1000.0) % 30;
  }

  updateCountDown() {
    let countDown = this._countdown();

    if (countDown <= 0) {
      this.generateToken();
    }

    this.setState(() => {
      return {
        countDown,
      };
    });
  }

  render() {
    let account = this.props.navigation.getParam("account");

    this.token = this.generateToken();

    return (
      <View>
        <Text>
          Account : {account.name} for {account.label}
        </Text>
        <Text>OTP : {this.token}</Text>
        <Text>Regnerates in {this.state.countDown}</Text>
      </View>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
}

const styles = StyleSheet.create({});

export default connect((state) => {
  return {
    accounts: state.accountStore.accounts,
  };
})(Account);
