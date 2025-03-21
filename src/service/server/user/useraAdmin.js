export const getUserAdmin = async (searchTerm, limit, page) => {
  try {
    const url = `${
      import.meta.env.VITE_CHEFGOFOOD_SERVER_API
    }/user?q=${searchTerm}&limit=${limit}&page=${page}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
