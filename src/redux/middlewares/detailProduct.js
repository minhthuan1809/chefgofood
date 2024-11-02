import { detailAction } from "../action/client/detail";

export const getDetailProduct = (idUser, page) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_FASTFOOD_SERVER_API
        }/detail/${idUser}?limit=4&page=${page}`
      );
      const result = await response.json();

      dispatch(detailAction(result.data));

      return result;
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: error.message };
    }
  };
};
