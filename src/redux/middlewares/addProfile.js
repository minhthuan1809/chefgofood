export const getProfile = (apikey) => {
  return async (dispatch) => {
    try {
      const url = `${import.meta.env.VITE_FASTFOOD_SERVER_API}/profile`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": apikey,
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!data.success) {
        throw new Error("API error: " + (data.message || "API error"));
      }

      console.log("Dispatching profile data:", data.user); // Added log
      dispatch({
        type: "add/profile",
        payload: data.user,
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
