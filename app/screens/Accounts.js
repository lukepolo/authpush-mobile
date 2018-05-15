import { connect } from "react-redux";
import React, { Component } from "react";
import { DeviceRequests } from "../store/actions/devices";
import { StyleSheet, Text, View, Button } from "react-native";
import NotificationService from "./../services/NotificationService";

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
  constructor() {
    super();
    this.notificationService = new NotificationService((token) => {
      let device = this.props.device;
      if (!device.registered) {
        this.props.dispatch(
          DeviceRequests.updateNotificationToken(
            this.props.device,
            token,
            () => {
              console.info("registered");
              // TODO - some notification?
            },
          ),
        );
      }
    });
    this.notificationService.registerNotificationServices();
  }

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

  componentWillUnmount() {
    this.notificationService.unmountNotificationServices();
  }
}

const styles = StyleSheet.create({});

export default connect((state) => {
  return {
    device: state.deviceStore.device,
    accounts: state.accountStore.accounts,
  };
})(Accounts);
