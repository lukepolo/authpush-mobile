import { combineReducers } from "redux";

import AuthReducers from "./auth";
import DeviceReducers from "./devices";
import AccountReducers from "./accounts";

export default combineReducers({
  ...AuthReducers,
  ...DeviceReducers,
  ...AccountReducers,
});
