import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { getApiKey } from "./reducer/client/apikey";
import { ProfileReducer } from "./reducer/client/profileReducer";
import { AddressReducer } from "./reducer/client/addressReducer";
import { ProductReducer } from "./reducer/client/addProduct";
import { detailReducer } from "./reducer/client/detailreducer";

const rootReducer = combineReducers({
  login: getApiKey,
  profile: ProfileReducer,
  profileAddress: AddressReducer,
  product: ProductReducer,
  detail: detailReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
