export const getProducts = (keySearch, total) => {
  return async (dispatch) => {
    try {
      const url = `${
        import.meta.env.VITE_FASTFOOD_SERVER_API
      }/product?q=${keySearch}&limit=40 &page=${total}`;

      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      dispatch({
        type: "add/product",
        payload: data.data.products,
      });

      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
};
