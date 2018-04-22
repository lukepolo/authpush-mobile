/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import axios from 'axios';
import React, { Component } from 'react';
import { AsyncStorage, TextInput, Button } from 'react-native';
import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

let host = 'https://c8e47e36.ngrok.io';

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();

    let approveAction = new NotificationAction({
      activationMode: "background",
      title: 'Approve',
      identifier: "APPROVE_ACTION"
    }, (action, completed) => {
      NotificationsIOS.log("ACTION RECEIVED");
      NotificationsIOS.log(JSON.stringify(action));
      this.sendApproval()
      completed();
    });

    let denyAction = new NotificationAction({
      activationMode: "background",
      title: 'Deny',
      identifier: "DENY_ACTION",
      destructive : true,
    }, (action, completed) => {
      NotificationsIOS.log("ACTION RECEIVED");
      NotificationsIOS.log(JSON.stringify(action));
      console.info('woo deny')
      completed();
    });


    let cat = new NotificationCategory({
      identifier: "APPROVE",
      actions: [approveAction, denyAction],
      context: "default",
    });

    NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
    NotificationsIOS.requestPermissions([cat]);

    NotificationsIOS.consumeBackgroundQueue();

    this._boundOnNotificationReceivedForeground = this.onNotificationReceivedForeground.bind(this);
    this._boundOnNotificationReceivedBackground = this.onNotificationReceivedBackground.bind(this);
    this._boundOnNotificationOpened = this.onNotificationOpened.bind(this);

    NotificationsIOS.addEventListener('notificationReceivedForeground', this._boundOnNotificationReceivedForeground);
    NotificationsIOS.addEventListener('notificationReceivedBackground', this._boundOnNotificationReceivedBackground);
    NotificationsIOS.addEventListener('notificationOpened', this._boundOnNotificationOpened);

    this.state = {
      email: 'support@codepier.io',
      password : 'secret'
    }
  }

  onNotificationReceivedForeground(notification) {
    console.log("Notification Received - Foreground", notification);
    let data = notification.getData();
    console.info('we should go to the requests screen')
  }

  onNotificationReceivedBackground(notification) {
    console.log("Notification Received - Background", notification);
  }

  onNotificationOpened(notification) {
    console.log("Notification opened by device user", notification);
    // aka lets go to the approval sections!
  }

  onPushKitRegistered(deviceToken) {
    console.log("PushKit Token Received: " + deviceToken);
  }

  onPushRegistered(deviceToken) {
    // TODO: Send the token to my server so it could send back push notifications...
    console.log("Device Token Received", deviceToken);
  }

  onPushRegistrationFailed(error) {
    console.error(error);
  }

  componentWillUnmount() {
    // prevent memory leaks!
    NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
    NotificationsIOS.removeEventListener('notificationReceivedForeground', this._boundOnNotificationReceivedForeground);
    NotificationsIOS.removeEventListener('notificationReceivedBackground', this._boundOnNotificationReceivedBackground);
    NotificationsIOS.removeEventListener('notificationOpened', this._boundOnNotificationOpened);
  }

  _onPressButton() {
    this.sendApproval()
  }

  login() {
    axios.post(`${host}/api/token`, this.state).then((response) => {
      AsyncStorage.setItem('@auth:token', response.data.accessToken).then(() => {
        console.info('go to dashboard');
      });
    }, (error) => {
      console.log(error)
    })
  }

  sendApproval() {
    AsyncStorage.getItem('@auth:token').then((token) => {
      console.info('sending now')
      axios.get(`${host}/api/accounts/1/otp/approve`, {
        headers : {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.info('does it send?')
        console.info(response)
      }, (error) => {
        console.info('does it error?')
        console.info(error);
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Please Login
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
        />
        <Button
          onPress={this.login.bind(this)}
          title="Login"
          accessibilityLabel="Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
