import React from "react";

import { StackNavigator, SwitchNavigator } from "react-navigation";

import Login from "./screens/Login";
import Splash from "./screens/Splash";
import ScanQR from "./screens/ScanQR";
import Account from "./screens/Account";
import Dashboard from "./screens/Accounts";

export const SignedOut = StackNavigator({
  SignIn: {
    screen: Login,
  },
});

export const SignedIn = StackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
  Account: {
    screen: Account,
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
