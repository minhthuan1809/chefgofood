const initialState = {
  profile: null,
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add/profile": {
      return {
        ...state,
        profile: action.payload,
      };
    }

    default:
      return state;
  }
};
