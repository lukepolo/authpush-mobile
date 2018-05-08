import { AccountsActions } from "../actions/accounts";

// shape is an empty array
const INITIAL_STATE = {
  accounts: [],
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AccountsActions.GET_ACCOUNTS:
      console.info(`ACTION : ${action}`);
      state.accounts = action;
      return state;
    default:
      return state;
  }
}

export default { accountStore: reducer };
