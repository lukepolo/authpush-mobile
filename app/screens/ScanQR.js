import { connect } from "react-redux";
import React, { Component } from "react";
import { AccountActionCreators } from "../store/actions/accounts";

import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";

class ScanScreen extends Component {
  onSuccess(qrResponse) {
    this.props.dispatch(AccountActionCreators.addAccount(qrResponse.data));
    this.backToDashboard();
  }

  backToDashboard() {
    let { navigate } = this.props.navigation;
    navigate("Dashboard");
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        cameraStyle={styles.cameraContainer}
        bottomViewStyle={styles.bottomContent}
        bottomContent={
          <View>
            <View style={styles.qrOverlay} />
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.5}
              onPress={this.backToDashboard.bind(this)}
            >
              <Text style={styles.TextStyle}> Cancel </Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  qrOverlay: {
    height: Dimensions.get("window").height - 250,
    width: Dimensions.get("window").width - 50,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },

  bottomContent: {
    bottom: 25,
    position: "absolute",
  },

  TextStyle: {
    fontSize: 14,
    color: "#fff",
  },

  backButton: {
    paddingTop: 35,
    paddingRight: 20,
    paddingBottom: 35,
    paddingLeft: 20,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: "#fff",
  },

  cameraContainer: {
    height: Dimensions.get("window").height,
  },
});

export default connect()(ScanScreen);
