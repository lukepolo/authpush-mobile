import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Dashboard extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Dashboard
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});