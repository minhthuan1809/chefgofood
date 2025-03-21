export const productCreateAdmin = async (data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/product`,
      {
        method: "POST",
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
