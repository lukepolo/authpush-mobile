/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import axios from 'axios';
import React, { Component } from 'react';
import { Button, Alert, AlertIOS } from 'react-native';
import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu ',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


let upvoteAction = new NotificationAction({
  activationMode: "background",
  title: 'Approve',
  identifier: "UPVOTE_ACTION"
}, (action, completed) => {
  NotificationsIOS.log("ACTION RECEIVED");
  NotificationsIOS.log(JSON.stringify(action));

  completed();
});


let denyAction = new NotificationAction({
  activationMode: "foreground",
  title: 'Deny',
  identifier: "UPVOTE_ACTION",
  destructive : true,
}, (action, completed) => {
  NotificationsIOS.log("ACTION RECEIVED");
  NotificationsIOS.log(JSON.stringify(action));

  completed();
});


let cat = new NotificationCategory({
  identifier: "APPROVE",
  actions: [upvoteAction, denyAction],
  context: "default",
});


type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
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
      myText: 'My Original Text'
    }
  }

  onNotificationReceivedForeground(notification) {
    console.log("Notification Received - Foreground", notification);
    let data = notification.getData();
    // this.setState({
    //   myText : `Should we approve ${data.label} to log into ${data.domain} `
    // });
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
    axios.get('https://d893e206.ngrok.io/api/accounts/1/otp/approve', {
      headers : {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRlOWQyZjllOTViNDZkODE5ZjM3NTFlODlmZTZlNjQ0Y2JjNTU4ZDJhMWY3YzkzNWQ5NjZiZjg5ZjU4OGFjNWY1MzMzYjI4MTM1YTg0NmZiIn0.eyJhdWQiOiIxIiwianRpIjoiZGU5ZDJmOWU5NWI0NmQ4MTlmMzc1MWU4OWZlNmU2NDRjYmM1NThkMmExZjdjOTM1ZDk2NmJmODlmNTg4YWM1ZjUzMzNiMjgxMzVhODQ2ZmIiLCJpYXQiOjE1MjQyODU2MTksIm5iZiI6MTUyNDI4NTYxOSwiZXhwIjoxNTU1ODIxNjE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.x6FUBxUwQNFWhhOTx_-gLeoKDumWE_xdrKiqY5QzkLOKflww12DK5TUzC7WJuhGbpwG1Nv0vxDT-xcyeQK2yUH-jUQlLFAAhhLLBV-5EjlTWz4s8U-CSD_YChMDBLKWtApIwgT0_nHVswGRGLs66246i3KiZm38rMHwRggoP5hV1piHURtLHvQ3n03ekUg3Qskb_xxtQuGeUZXPmDaO5qkbE8QycTu6WC5IZBLflRUWh672hfSkmBpRc_GUn4Vbk29i4RqPCOeej9WO-QeeAzmMMx1kY8oFKeToim2q1ARh0_T51oHiD1dpPZQOOaOSgrZRT45fb6SA4xYH7yTWjP_41c-cshmDdMpqMOEsuoL8162W_JCL2FhDcqerj0nG8GDaYzYh7o5XfWd_ZSAKrB0-SNDqANd00MvK4aAbnFNnVpTHIS_R5Z37pVly6i4JaffRExUmB7nf8Tu5mRJi4YVmVO7BQ4fGY4Fr_FEvCT6k7S108HNlavlMFokoqhwTObAtDXv7KbUapWg0vkj1jhoookd2XUl88lDE2kwAUjS_m7u-QYb2Xx0NOqBZpgtUhbhdp_7078lHk0774z2BFrMKuifbbaOTRJH8rpGYn54ctUdKNvrxZ2al8Ejeu3rsEMboLBRsBkIA7uUj9rPbLxOZaSDB_DUscWLK-Aj0eOeY'
      }
    }).then((response) => {
      console.info(response.data)
    }, (error) => {
      console.info(error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Text>
          {this.state.myText}
        </Text>
        <Button
          onPress={this._onPressButton}
          title="Approve"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
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
