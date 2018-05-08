import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";
import reduxLogger from "redux-logger";
import storage from "redux-persist/es/storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

let middleware = [reduxThunk, reduxLogger];

const persistConfig = {
  storage,
  key: "root",
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middleware));
  let persistor = persistStore(store);
  return { store, persistor };
};
