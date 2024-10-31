export const getProfile = (apikey) => {
  return async (dispatch) => {
    try {
      console.log("API Key:", apikey);
      const url = `http://192.168.1.93/WebDoAn/main.php/profile`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": apikey,
          "Content-Type": "application/json",
        },
        // Add CORS mode
        mode: "cors",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.user);

      dispatch({
        type: "add/profile",
        payload: data.user,
      });

      if (!data.success) {
        throw new Error("API error: " + (data.message || "API error"));
      }

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
