import NotificationsIOS, {
  NotificationAction,
  NotificationCategory,
} from "react-native-notifications";

export default class NotiicationService {
  constructor(updateDeviceTokenCallback) {
    this.updateDeviceToken = updateDeviceTokenCallback;
  }

  registerNotificationServices() {
    this._addNotificationHooks();
    NotificationsIOS.requestPermissions([
      new NotificationCategory({
        identifier: "APPROVE",
        actions: [
          new NotificationAction(
            {
              activationMode: "background",
              title: "Approve",
              identifier: "APPROVE_ACTION",
              authenticationRequired: true,
            },
            (action, completed) => {
              NotificationsIOS.log("ACTION RECEIVED");
              NotificationsIOS.log(JSON.stringify(action));
              this._sendApproval(action.notification.getData().requestHash);
              completed();
            },
          ),
          new NotificationAction(
            {
              activationMode: "background",
              title: "Deny",
              identifier: "DENY_ACTION",
              destructive: true,
            },
            (action, completed) => {
              NotificationsIOS.log("ACTION RECEIVED");
              NotificationsIOS.log(JSON.stringify(action));
              console.info("woo deny");
              completed();
            },
          ),
        ],
        context: "default",
      }),
    ]);

    NotificationsIOS.consumeBackgroundQueue();
  }

  unmountNotificationServices() {
    NotificationsIOS.removeEventListener(
      "notificationOpened",
      this._onNotificationOpened,
    );
    NotificationsIOS.removeEventListener(
      "remoteNotificationsRegistered",
      this.updateDeviceToken,
    );
    NotificationsIOS.removeEventListener(
      "remoteNotificationsRegistrationFailed",
      this._onPushRegistrationFailed,
    );
    NotificationsIOS.removeEventListener(
      "notificationReceivedForeground",
      this._onNotificationReceivedForeground,
    );
    NotificationsIOS.removeEventListener(
      "notificationReceivedBackground",
      this._onNotificationReceivedBackground,
    );
  }

  _addNotificationHooks() {
    NotificationsIOS.addEventListener(
      "notificationOpened",
      this._onNotificationOpened,
    );
    NotificationsIOS.addEventListener(
      "remoteNotificationsRegistered",
      this.updateDeviceToken,
    );
    NotificationsIOS.addEventListener(
      "remoteNotificationsRegistrationFailed",
      this._onPushRegistrationFailed,
    );
    NotificationsIOS.addEventListener(
      "notificationReceivedForeground",
      this._onNotificationReceivedForeground,
    );
    NotificationsIOS.addEventListener(
      "notificationReceivedBackground",
      this._onNotificationReceivedBackground,
    );
  }

  _sendApproval(requestHash) {
    axios.post(`request/${requestHash}/approve`).then(() => {
      console.info("IT SENT!");
    });
  }

  _onNotificationReceivedForeground(notification) {
    console.log("Notification Received - Foreground", notification);
  }

  _onNotificationReceivedBackground(notification) {
    console.log("Notification Received - Background", notification);
  }

  _onNotificationOpened(notification) {
    console.log("Notification opened by device user", notification);
  }

  _onPushRegistrationFailed(error) {
    console.error(error);
  }
}
