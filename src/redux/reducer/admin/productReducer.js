const initialState = {
  products: [],
};

export const ProductAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add/product/admin": {
      return {
        ...state,
        products: action.payload,
      };
    }

    default:
      return state;
  }
};
