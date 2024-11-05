const initialState = {
  DecentralizationReducer_dashboard: null,
};

export const DecentralizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add/Decentralization/admin": {
      console.log("thuan");

      return {
        ...state,
        DecentralizationReducer_dashboard: action.payload,
      };
    }

    default:
      return state;
  }
};
