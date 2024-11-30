export const renderFavorite = async (user_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/favorites/${user_id}`
  );
  const data = await response.json();
  return data;
};

// xóa sản phẩm yêu thích
export const deleteFavorite = async (favorite_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/favorites/${favorite_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

// thêm sản phẩm yêu thích
export const addFavorite = async (user_id, data) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/favorites/create/${user_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const _data = await response.json();
  return _data;
};
