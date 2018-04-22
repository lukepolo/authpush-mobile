import React from "react";
import { isSignedIn } from "./auth";
import { createRootNavigator } from "./router";
import {
  registerNotificationServices,
  unmountNotificationServices,
} from "./notifications";

// TODO _ there is a bug watching : https://github.com/react-navigation/react-navigation/issues/3956
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
]);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    registerNotificationServices();

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  componentDidMount() {
    isSignedIn()
      .then((res) => {
        this.setState({ signedIn: res, checkedSignIn: true });
      })
      .catch((err) => {
        alert("An error occurred");
      });
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    const Layout = createRootNavigator(checkedSignIn, signedIn);
    return <Layout />;
  }

  componentWillUnmount() {
    unmountNotificationServices();
  }
}
