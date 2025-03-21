export const getProfileAddress = (id) => {
  return async (dispatch) => {
    try {
      const url = `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/address/${id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      dispatch({
        type: "add/address",
        payload: data.addresses,
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
