import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import snackbar from "./snackbar";

const rootReducer = combineReducers({
  auth: auth,
  snackbar: snackbar,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
