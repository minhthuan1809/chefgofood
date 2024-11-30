export const renderFavorite = async (user_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/favorites/${user_id}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};
