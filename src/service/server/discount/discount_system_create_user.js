export const createDiscountUser = async (discountData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/discount_user/create`,
      {
        method: "POST",
        body: JSON.stringify(discountData),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};
