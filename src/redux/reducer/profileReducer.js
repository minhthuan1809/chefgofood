const initialState = {
  profile: null, // Change from [] to null
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add/profile": {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case "update/profile": {
      return {
        ...state,
        profile: action.payload,
      };
    }

    default:
      return state;
  }
};
