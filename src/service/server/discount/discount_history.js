export const getDiscountHistoryRender = async (limit, page, search) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_FASTFOOD_SERVER_API
      }/discount_history?limit=${limit}&page=${page}&q=${search}`
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};
