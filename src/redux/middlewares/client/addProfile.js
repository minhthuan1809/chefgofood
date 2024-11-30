export const getProfile = (apikey) => {
  return async (dispatch) => {
    try {
      const url = `${import.meta.env.VITE_FASTFOOD_SERVER_API}/profile`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-Api-Key": apikey,
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      });

      const data = await response.json();
      dispatch({
        type: "add/profile",
        payload: data.data,
      });

      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);

      if (error instanceof TypeError) {
        console.error(
          "Network error or CORS issue - Please check if the server is running and CORS is properly configured"
        );
      } else {
        console.error("API error:", error.message);
      }

      throw error;
    }
  };
};
