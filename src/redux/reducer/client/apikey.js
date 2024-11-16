const initialState = {
  apikey: localStorage.getItem("apikey") || null,
  status: false,
};

// Tạo một biến để track xem đã init chưa
let isInitialized = false;

export const getApiKey = (state = initialState, action) => {
  // Chỉ init một lần khi reducer được tạo lần đầu
  if (!isInitialized && state === initialState) {
    isInitialized = true;
    const storedApiKey = localStorage.getItem("apikey");
    if (storedApiKey) {
      return {
        ...state,
        apikey: JSON.parse(storedApiKey),
        status: true, // nếu có apikey thì set status = true
      };
    }
  }

  console.log("action.type:", action.type, "current state:", state);

  switch (action.type) {
    case "login/apikey": {
      // Chỉ update nếu payload không null
      if (action.payload) {
        localStorage.setItem("apikey", JSON.stringify(action.payload));
        console.log("Setting new apikey:", action.payload);
        return {
          ...state,
          apikey: action.payload,
          status: action.status,
        };
      }
      return state;
    }
    default:
      return state;
  }
};
