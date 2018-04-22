import React from "react";

import {
  StackNavigator,
  SwitchNavigator
} from "react-navigation";

import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

export const SignedOut = StackNavigator({
  SignIn: {
    screen: Login,
  }
});

export const SignedIn = StackNavigator(
  {
    Home: {
      screen: Dashboard,
    },
  },
);

export const createRootNavigator = (signedIn = false) => {
  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
