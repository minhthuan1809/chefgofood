const initialState = {
  apikey: JSON.parse(localStorage.getItem("apikey")) || [],
  status: false,
};

export const getApiKey = (state = initialState, action) => {
  switch (action.type) {
    case "login/apikey": {
      localStorage.setItem("apikey", JSON.stringify(action.payload));

      return {
        ...state,
        apikey: action.payload,
        status: action.status,
      };
    }
    default:
      return state;
  }
};
