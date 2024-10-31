export const getRegister = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://10.8.0.3/WebDoAn/main.php/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Nguyễn Minh Thuậfn",
          email: "dfsdg@gmail.com",
          password: "123456",
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);

      if (!result.ok) {
        throw new Error("API Error");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
};
