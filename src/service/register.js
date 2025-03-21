export const getRegister = async (data) => {
  try {
    //thuan
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};
