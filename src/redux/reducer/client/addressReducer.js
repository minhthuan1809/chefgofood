const initialState = {
  address: null, // Change from [] to null
};

export const AddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add/address": {
      return {
        ...state,
        address: action.payload,
      };
    }

    default:
      return state;
  }
};
