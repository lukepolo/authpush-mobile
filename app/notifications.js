import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications';
import requestApprovalNotification from './notifications/requestApprovalNotification'

let onNotificationReceivedForeground = (notification) => {
  console.log("Notification Received - Foreground", notification);
}

let onNotificationReceivedBackground = (notification) => {
  console.log("Notification Received - Background", notification);
}

let onNotificationOpened = (notification) => {
  console.log("Notification opened by device user", notification);
}

let onPushRegistered = (deviceToken) => {
  // TODO: register device
  console.log("Device Token Received", deviceToken);
}

let onPushRegistrationFailed = (error) => {
  console.error(error);
}

export const registerNotificationServices = () => {

  NotificationsIOS.addEventListener('remoteNotificationsRegistered', onPushRegistered);
  NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', onPushRegistrationFailed);
  NotificationsIOS.requestPermissions([requestApprovalNotification]);

  NotificationsIOS.consumeBackgroundQueue();

  NotificationsIOS.addEventListener('notificationReceivedForeground', onNotificationReceivedForeground);
  NotificationsIOS.addEventListener('notificationReceivedBackground', onNotificationReceivedBackground);
  NotificationsIOS.addEventListener('notificationOpened', onNotificationOpened);

}

export const unmountNotificationServices = () => {
  NotificationsIOS.removeEventListener('remoteNotificationsRegistered', onPushRegistered);
  NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', onPushRegistrationFailed);
  NotificationsIOS.removeEventListener('notificationReceivedForeground', onNotificationReceivedForeground);
  NotificationsIOS.removeEventListener('notificationReceivedBackground', onNotificationReceivedBackground);
  NotificationsIOS.removeEventListener('notificationOpened', onNotificationOpened);
}
