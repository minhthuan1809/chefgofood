export const getProfile = (apikey) => {
  return async (dispatch) => {
    try {
      const url = `${import.meta.env.VITE_FASTFOOD_SERVER_API}/profile`;

      // Log trước khi gọi API để kiểm tra
      console.log("Request Headers:", {
        "X-Api-Key": apikey,
        "Content-Type": "application/json",
      });

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": apikey,
          "Content-Type": "application/json",
        },
      });

      // Log response để debug
      console.log("Response Status:", response.status);
      console.log("Response Headers:", Object.fromEntries(response.headers));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch({
        type: "add/profile",
        payload: data.data,
      });

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
};
