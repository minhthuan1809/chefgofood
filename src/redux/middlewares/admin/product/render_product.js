import { productsAction } from "../../../action/admin/productAction";
export const getRenderProduct = (searchTerm, limit, page, type) => {
  return async (dispatch) => {
    try {
      const url = `${
        import.meta.env.VITE_FASTFOOD_SERVER_API
      }/product?q=${encodeURIComponent(
        searchTerm
      )}&limit=${limit}&page=${page}&type=${type}`;
      const response = await fetch(url, {
        method: "GET",
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(productsAction(data.data.products));
      }

      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);

      throw error;
    }
  };
};
