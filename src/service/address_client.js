export const createAddress = async (apikey) => {
  try {
    //thuan
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apikey,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi xóa");
    }

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};
