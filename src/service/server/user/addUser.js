export const addUser = async (value) => {
  try {
    const url = `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/register`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: value.username,
        email: value.email,
        password: value.password,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
