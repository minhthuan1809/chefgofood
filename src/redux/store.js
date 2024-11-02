import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { getApiKey } from "./reducer/apikey";
import { ProfileReducer } from "./reducer/profileReducer";
import { AddressReducer } from "./reducer/addressReducer";
import { ProductReducer } from "./reducer/addProduct";
import { detailReducer } from "./reducer/detailreducer";

const rootReducer = combineReducers({
  login: getApiKey,
  profile: ProfileReducer,
  profileAddress: AddressReducer,
  product: ProductReducer,
  detail: detailReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
