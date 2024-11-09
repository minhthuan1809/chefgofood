import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
// client
import { getApiKey } from "./reducer/client/apikey";
import { ProfileReducer } from "./reducer/client/profileReducer";
import { AddressReducer } from "./reducer/client/addressReducer";
import { ProductReducer } from "./reducer/client/addProduct";
import { detailReducer } from "./reducer/client/detailreducer";
//admin
import { LoginAdminReducer } from "./reducer/admin/reducer_login";
import { DecentralizationReducer } from "./reducer/admin/DecentralizationAdmin";
import { ProductAdminReducer } from "./reducer/admin/productReducer";
import { CartReducer } from "./reducer/client/cart";

const rootReducer = combineReducers({
  login: getApiKey,
  profile: ProfileReducer,
  profileAddress: AddressReducer,
  product: ProductReducer,
  detail: detailReducer,
  loginAdmin: LoginAdminReducer,
  decentralization: DecentralizationReducer,
  productsAdmin: ProductAdminReducer,
  cart: CartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
