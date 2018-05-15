import urlOtpAuth from "url-otpauth";
import AccountService from "./../../services/AccountService";

export const AccountsActions = {
  ADD_ACCOUNT: "ADD_ACCOUNT",
};

export const AccountActionCreators = {
  addAccount: (credentials) => {
    return {
      credentials,
      type: AccountsActions.ADD_ACCOUNT,
    };
  },
};

const accountService = new AccountService();

export const AccountRequests = {
  getAccount: (otpAuthUrl, callback) => {
    let credentials = urlOtpAuth.parse(otpAuthUrl.data);
    return (dispatch) => {
      accountService.createAccount(credentials).then(() => {
        dispatch(AccountActionCreators.addAccount(credentials));
        callback();
      });
    };
  },
};
