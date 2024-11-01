export const apikeyRedux = (value, _state) => {
  return { type: "login/apikey", payload: value, status: _state };
};
export const AddProfileRedux = (value) => {
  return { type: "add/profile", payload: value };
};
