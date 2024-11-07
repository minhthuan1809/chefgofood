export const addUser = async (value) => {
  try {
    const url = `${import.meta.env.VITE_FASTFOOD_SERVER_API}/register`;

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
    console.log(data);

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
