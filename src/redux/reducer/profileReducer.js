const initialState = {
  profile: [],
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.types) {
    case "add/profile": {
      return {
        ...state,
        products: action.payload,
      };
    }
    case "update/profile": {
      return {
        ...state,
        products: action.payload,
      };
    }

    default:
      return state;
  }
};
