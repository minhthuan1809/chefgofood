export const getDetailProduct = async (idUser, page) => {
  return async (dispatch) => {
    try {
      //thuan
      const response = await fetch(
        `${
          import.meta.env.VITE_FASTFOOD_SERVER_API
        }/detail/${idUser}?limit=5&page=${page}`
      );
      dispatch({
        type: "add/detail",
        payload: response.data,
      });
      const result = await response.json();
      console.log("result", result);
      return result;
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    }
  };
};
