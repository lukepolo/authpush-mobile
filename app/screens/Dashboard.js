import { connect } from "react-redux";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class Dashboard extends Component {
  addAccount() {
    let { navigate } = this.props.navigation;
    navigate("ScanQR");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Accounts</Text>
        {this.props.accounts.map((account, index) => {
          return <Text key={index}>{account.label}</Text>;
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
  console.info(state);
  return {
    accounts: state.accountStore.accounts,
  };
})(Dashboard);
