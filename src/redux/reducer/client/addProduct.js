const initialState = {
  products: null,
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add/product": {
      return {
        ...state,
        products: action.payload,
      };
    }

    default:
      return state;
  }
};
