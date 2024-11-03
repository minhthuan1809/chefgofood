export const getUiDiscountUser = async (IdUser) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/discount/user/${IdUser}`
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error.message };
  }
};
