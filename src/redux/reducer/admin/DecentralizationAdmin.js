import Cookies from "js-cookie";

const initialState = {
  DecentralizationReducer_dashboard: Cookies.get("apikey_dashboard") || null,
};

export const DecentralizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add/Decentralization/admin": {
      return {
        ...state,
        products: action.payload,
      };
    }

    default:
      return state;
  }
};
