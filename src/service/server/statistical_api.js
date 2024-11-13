///  product
export const getStatisticalProduct = async (
  start_date,
  end_date,
  page,
  limit,
  search
) => {
  try {
    const url = `${
      import.meta.env.VITE_FASTFOOD_SERVER_API
    }/product_statistics?start_date=${start_date}&end_date=${end_date}&page=${page}&limit=${limit}&q=${search}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};

// order
export const getStatisticalOrder = async (
  start_date,
  end_date,
  page,
  limit,
  search
) => {
  try {
    const url = `${
      import.meta.env.VITE_FASTFOOD_SERVER_API
    }/order_statistics?start_date=${start_date}&end_date=${end_date}&page=${page}&limit=${limit}&q=${search}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
// user
export const getStatisticalUser = async (
  start_date,
  end_date,
  page,
  limit,
  search
) => {
  try {
    const url = `${
      import.meta.env.VITE_FASTFOOD_SERVER_API
    }/user_statistics?start_date=${start_date}&end_date=${end_date}&page=${page}&limit=${limit}&q=${search}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
