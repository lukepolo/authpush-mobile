import urlOtpAuth from "url-otpauth";
import DeviceService from "./../../services/DeviceService";
import AccountService from "./../../services/AccountService";

export const AccountsActions = {
  ADD_ACCOUNT: "ADD_ACCOUNT",
  GET_ACCOUNTS: "GET_ACCOUNTS",
};

const deviceService = new DeviceService();
const accountService = new AccountService();

export const AccountActionCreators = {
  addAccount: (credentials) => {
    return {
      credentials,
      type: AccountsActions.ADD_ACCOUNT,
    };
  },
  getAccounts: () => {
    return {
      type: AccountsActions.GET_ACCOUNTS,
    };
  },
};

export const AccountRequests = {
  getAccount: (otpAuthUrl, callback) => {
    let credentials = urlOtpAuth.parse(otpAuthUrl.data);
    return (dispatch) => {
      accountService.createAccount(credentials).then((account) => {
        deviceService.addDeviceToAccount(account).then(() => {
          callback();
          // dispatch(AccountActionCreators.addAccount(credentials))
        });
      });
    };
  },
};
