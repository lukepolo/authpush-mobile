import axios from "axios/index";
import { AsyncStorage } from "react-native";
import NotificationsIOS, {
  NotificationAction,
  NotificationCategory,
} from "react-native-notifications";

let host = "https://fb9ead28.ngrok.io";

let sendApproval = () => {
  AsyncStorage.getItem("@auth:token").then((token) => {
    axios
      .get(`${host}/api/accounts/1/otp/approve`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          console.info("does it send?");
          console.info(response);
        },
        (error) => {
          console.info("does it error?");
          console.info(error);
        },
      );
  });
};

let requestApprovalNotification = new NotificationCategory({
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
        sendApproval();
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
});

export default requestApprovalNotification;
