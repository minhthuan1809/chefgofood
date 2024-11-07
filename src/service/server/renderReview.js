export const getRenderReview = async (searchTerm, limit, page) => {
  try {
    const url = `${
      import.meta.env.VITE_FASTFOOD_SERVER_API
    }/review?q=${searchTerm}&page=${page}&limit=${limit}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
