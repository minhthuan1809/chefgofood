const initialState = {
  detailProduct: null,
};

export const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add/detail": {
      return {
        ...state,
        detailProduct: action.payload,
      };
    }

    default:
      return state;
  }
};
