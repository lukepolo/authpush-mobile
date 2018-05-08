import { connect } from "react-redux";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import OneTimeTokenGenerator from "./../services/OneTimeTokenGenerator";
import TimerMixin from "react-timer-mixin";

class Account extends Component {
  constructor() {
    super();
    this.countDown = 0;
    this.oneTimeTokenGenerator = new OneTimeTokenGenerator();

    this.state = {
      countDown: 0,
    };
  }

  generateToken() {
    return this.oneTimeTokenGenerator.generate(
      this.props.navigation.getParam("account"),
    );
  }

  updateCountDown() {
    let epoch = Math.round(new Date().getTime() / 1000.0);
    let countDown = 30 - epoch % 30;

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
    this.timer = setInterval(this.updateCountDown.bind(this), 1000);

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
    clearInterval(this.timer);
  }
}

const styles = StyleSheet.create({});

export default connect((state) => {
  return {
    accounts: state.accountStore.accounts,
  };
})(Account);
