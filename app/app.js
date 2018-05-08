import React from "react";
import configureStore from "./store";
import { isSignedIn } from "./auth";
import { Provider } from "react-redux";
import { createRootNavigator } from "./router";
import {
  registerNotificationServices,
  unmountNotificationServices,
} from "./notifications";
import { PersistGate } from "redux-persist/integration/react";

// TODO _ there is a bug watching : https://github.com/react-navigation/react-navigation/issues/3956
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
]);

let { store, persistor } = configureStore();

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
