import Cookies from "js-cookie";
const initialState = {
  apikey_dashboard: Cookies.get("admin_apikey") || null,
};

export const LoginAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add/apikey/login": {
      return {
        ...state,
        products: action.payload,
      };
    }

    default:
      return state;
  }
};
