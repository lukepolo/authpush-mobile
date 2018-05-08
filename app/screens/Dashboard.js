import { connect } from "react-redux";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class Dashboard extends Component {
  constructor() {
    super();
  }

  addAccount() {
    let { navigate } = this.props.navigation;
    navigate("ScanQR");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Dashboard</Text>
        <Text>WOO GOT HERE {this.props.accounts.length} </Text>
        <Button
          onPress={this.addAccount.bind(this)}
          title="Add A Account"
          accessibilityLabel="Add A Account"
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
})(Dashboard);
