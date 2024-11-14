export const forgotPassword = async (data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/forgotpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data }),
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
