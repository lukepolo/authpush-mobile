import { combineReducers } from "redux";
import AccountReducers from "./accounts";

// glue all the reducers together
export default combineReducers({
  ...AccountReducers,
});
