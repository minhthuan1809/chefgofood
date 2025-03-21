export const deleteUser = async (id) => {
  try {
    const url = `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/user/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
