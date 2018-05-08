import { connect } from "react-redux";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class Account extends Component {
  viewAccount() {
    this.props.navigation.navigate("Account", {
      account: this.props.account,
    });
  }

  render() {
    return (
      <Button
        onPress={this.viewAccount.bind(this)}
        title={this.props.account.name}
      />
    );
  }
}

class Accounts extends Component {
  addAccount() {
    let { navigate } = this.props.navigation;
    navigate("ScanQR");
  }

  render() {
    return (
      <View>
        <Text>Accounts</Text>
        {this.props.accounts.map((account, index) => {
          return (
            <Account
              key={index}
              account={account}
              navigation={this.props.navigation}
            />
          );
        })}
        <Button
          onPress={this.addAccount.bind(this)}
          title="Add a new account"
          accessibilityLabel="Add a new account"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default connect((state) => {
  return {
    accounts: state.accountStore.accounts,
  };
})(Accounts);
