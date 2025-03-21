export const createReview = async (apikey, data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/review`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apikey,
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  } catch (error) {
    console.error("Registration error:", error);
  }
};
