import AuthService from "./../../services/AuthService";

import { DeviceRequests } from "./devices";

export const AuthActions = {
  STORE_TOKEN: "STORE_TOKEN",
};

const authService = new AuthService();

export const AuthActionCreators = {
  storeToken: (authToken) => {
    return {
      authToken,
      type: AuthActions.STORE_TOKEN,
    };
  },
};

export const AuthRequests = {
  login: (credentials, callback) => {
    return (dispatch) => {
      authService.login(credentials).then((authToken) => {
        dispatch(AuthActionCreators.storeToken(authToken));
        dispatch(
          DeviceRequests.createDevice(() => {
            callback();
          }),
        );
      });
    };
  },
};
