export const AccountsActions = {
  GET_ACCOUNTS: "GET_ACCOUNTS",
};

export const AccountActionCreators = {
  getAccounts: () => {
    return {
      type: AccountsActions.GET_ACCOUNTS,
    };
  },
};
