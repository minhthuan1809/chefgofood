export const updateUser = async (id, value) => {
  try {
    const url = `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/user/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
