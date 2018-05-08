import { connect } from "react-redux";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import OneTimeTokenGenerator from "./../services/OneTimeTokenGenerator";

class Dashboard extends Component {
  constructor() {
    super();
    this.oneTimeTokenGenerator = new OneTimeTokenGenerator();
  }

  render() {
    let account = this.props.navigation.getParam("account");
    return (
      <View>
        <Text>
          Account : {account.name} for {account.label}
        </Text>
        <Text>
          OTP : {this.oneTimeTokenGenerator.generate(account.credentials.key)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default connect((state) => {
  return {
    accounts: state.accountStore.accounts,
  };
})(Dashboard);
