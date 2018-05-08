import React from "react";

import { StackNavigator, SwitchNavigator } from "react-navigation";

import Login from "./screens/Login";
import Splash from "./screens/Splash";
import ScanQR from "./screens/ScanQR";
import Dashboard from "./screens/Dashboard";

export const SignedOut = StackNavigator({
  SignIn: {
    screen: Login,
  },
});

export const SignedIn = StackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
});

export const createRootNavigator = (checkedSignIn, signedIn = false) => {
  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SignedOut: {
        screen: SignedOut,
      },
      Splash: {
        screen: Splash,
      },
      ScanQR: {
        screen: ScanQR,
      },
    },
    {
      initialRouteName: checkedSignIn
        ? signedIn
          ? "SignedIn"
          : "SignedOut"
        : "Splash",
    },
  );
};
