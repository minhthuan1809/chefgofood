import { getCartAction } from "../../action/client/cart";

export const getCartRender = (apiKey) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/cart`,
        {
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );
      const result = await response.json();

      dispatch(getCartAction(result.data.cart_items));
      return result;
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: error.message };
    }
  };
};
