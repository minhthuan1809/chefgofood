const initialState = {
  cartItems: null,
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "get/cart": {
      return {
        ...state,
        cartItems: action.payload,
      };
    }

    default:
      return state;
  }
};
