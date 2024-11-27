// logo

export const setTrademark = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_RENDER_API}/trademark`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const _data = await response.json();
  return _data;
};

// trang chủ

export const setHomeHeader = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_RENDER_API}/home/header`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const _data = await response.json();
  return _data;
};
