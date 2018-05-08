import React, { Component } from "react";

import {
  StyleSheet,
  Dimensions,
  Linking,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";

export default class ScanScreen extends Component {
  onSuccess(e) {
    Linking.openURL(e.data).catch((err) =>
      console.error("An error occured", err),
    );
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
