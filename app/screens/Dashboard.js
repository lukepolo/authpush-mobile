import { connect } from "react-redux";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Dashboard</Text>
        <Text>WOO GOT HERE {this.props.accounts.length} </Text>
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
