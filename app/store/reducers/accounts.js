import { AccountsActions } from "../actions/accounts";

const INITIAL_STATE = {
  accounts: [],
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AccountsActions.ADD_ACCOUNT:
      return {
        ...state,
        accounts: [
          ...state.accounts,
          {
            credentials: action.credentials,
            label: action.credentials.issuer,
            name: action.credentials.account,
          },
        ],
      };
    case AccountsActions.GET_ACCOUNTS:
      return state;
    default:
      return state;
  }
}

export default { accountStore: reducer };
