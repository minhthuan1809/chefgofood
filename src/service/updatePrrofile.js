export const getUpdateProfile = async (data, apikey, id) => {
  console.log("data", data);
  console.log("apikey", apikey);
  console.log("data", data);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/profile/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apikey,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Sửa thất bại");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};
