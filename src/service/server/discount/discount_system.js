export const getDiscountAdmin = async (page, limit, searchTerm) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_CHEFGOFOOD_SERVER_API
      }/discount?page=${page}&limit=${limit}&q=${searchTerm}`
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};
