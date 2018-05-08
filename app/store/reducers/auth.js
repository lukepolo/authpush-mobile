import { AuthActions } from "../actions/auth";

const INITIAL_STATE = {
  accounts: [],
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthActions.STORE_TOKEN:
      return {
        ...state,
        auth_token: action.authToken,
      };
    default:
      return state;
  }
}

export default { authStore: reducer };
