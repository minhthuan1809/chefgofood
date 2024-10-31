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

      if (!response.ok) {
        throw new Error("Lỗi API");
      }
      console.log(result.api_key);

      dispatch({
        type: "login/apikey", // Corrected from 'types' to 'type'
        payload: result.api_key,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
