export default class AccountService {
  createAccount(credentials) {
    return axios
      .post("accounts", {
        secret: credentials.key,
        label: credentials.account,
        application: credentials.issuer,
      })
      .then((response) => {
        return response.data;
      });
  }
}
