const initialState = {
    money: "",
    data: {},
  };
  
  export const PayQrReducer = (state = initialState, action) => {
    switch (action.type) {
      case "add/money": {
        return {
          ...state,
          money: action.payload,
        };
      }
      case "add/sepay/data": {
        return {
          ...state,
          data: action.payload,
        };
      }
  
      default:
        return state;
    }
  };
  