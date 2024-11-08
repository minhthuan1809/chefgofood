export const getDiscountUser = async (page, limit, searchTerm) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_FASTFOOD_SERVER_API
      }/discount_user/all?q=${searchTerm}&page=${page}&limit=${limit}`
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};
