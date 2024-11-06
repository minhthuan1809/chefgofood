export const getChangePassAdmin = async (value, apiKey) => {
  try {
    const url = `${import.meta.env.VITE_FASTFOOD_ADMIN_API}/admin/changePass`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
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
