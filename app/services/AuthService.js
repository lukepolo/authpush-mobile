import { AsyncStorage } from "react-native";

export default class AuthService {
  constructor() {
    this.AUTH_TOKEN_KEY = "@auth:token";
  }

  login(form) {
    return axios.post(`/api/login`, form).then(
      (response) => {
        let authToken = response.data.accessToken;
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

        return AsyncStorage.setItem(this.AUTH_TOKEN_KEY, authToken);
      },
      (error) => {
        // TODO - how do we show errors?
        console.log(error);
      },
    );
  }

  onSignIn() {
    AsyncStorage.setItem(this.AUTH_TOKEN_KEY, "true");
  }

  onSignOut() {
    AsyncStorage.removeItem(this.AUTH_TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
    // TODO - remove rest of state too?
  }

  isSignedIn() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.AUTH_TOKEN_KEY)
        .then((authToken) => {
          if (authToken !== null) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${authToken}`;
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => reject(err));
    });
  }
}
