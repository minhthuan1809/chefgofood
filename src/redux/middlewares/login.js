import { toast } from "react-toastify";

/* eslint-disable no-unused-vars */
export const getLogin = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_FASTFOOD_SERVER_API}/apikey`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.ok) {
        dispatch({
          type: "login/apikey",
          payload: result.api_key,
          status: true,
        });
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};
