import urlOtpAuth from "url-otpauth";

export const AccountsActions = {
  ADD_ACCOUNT: "ADD_ACCOUNT",
  GET_ACCOUNTS: "GET_ACCOUNTS",
};

export const AccountActionCreators = {
  addAccount: (account) => {
    return {
      type: AccountsActions.ADD_ACCOUNT,
      credentials: urlOtpAuth.parse(account),
    };
  },
  getAccounts: () => {
    return {
      type: AccountsActions.GET_ACCOUNTS,
    };
  },
};
