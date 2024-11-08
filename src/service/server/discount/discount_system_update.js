export const getDiscountUserById = async (id, data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/discount/user/fix/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};
