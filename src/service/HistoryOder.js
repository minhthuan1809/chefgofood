export const getHistory = async (apikey) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/history_order`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apikey,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi lấy lịch sử");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};
