import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { getApiKey } from "./reducer/apikey";
import { ProfileReducer } from "./reducer/profileReducer";

const rootReducer = combineReducers({
  login: getApiKey,
  profile: ProfileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
