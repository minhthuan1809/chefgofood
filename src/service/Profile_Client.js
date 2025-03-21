export const getUpdateProfile = async (data, id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/profile/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

export const getDelete = async (apikey) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/delete`,
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

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};
