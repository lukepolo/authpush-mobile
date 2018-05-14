import React from "react";
import configureStore from "./store";
import { Provider } from "react-redux";
import AuthService from "./services/AuthService";
import { createRootNavigator } from "./router";
import { PersistGate } from "redux-persist/integration/react";
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

// TODO - move this into its own service and boot that up
import axios from "axios";

global.axios = axios.create({
  baseURL: "https://authpush.io/api/",
});

let { store, persistor } = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    registerNotificationServices();

    this.authService = new AuthService();

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  componentDidMount() {
    this.authService
      .isSignedIn()
      .then((res) => {
        this.setState({ signedIn: res, checkedSignIn: true });
      })
      .catch((err) => {
        alert("An error occurred");
      });
  }

  // TODO - loading can be a component
  render() {
    const { checkedSignIn, signedIn } = this.state;
    const Layout = createRootNavigator(checkedSignIn, signedIn);
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout />
        </PersistGate>
      </Provider>
    );
  }

  componentWillUnmount() {
    unmountNotificationServices();
  }
}
