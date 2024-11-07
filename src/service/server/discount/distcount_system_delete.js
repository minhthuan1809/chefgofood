export const deleteDiscountAdmin = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/discount/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};
