export const addCart = async (data, apikey) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/cart/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apikey,
        },
        body: JSON.stringify({
          product_id: data,
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
// xóa sản phẩm trong giỏ hàng
export const getCartDelete = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/cart/delete/${id}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        delete_type: "all",
      }),
    }
  );
  return response.json();
};

//xóa số lượng sản phẩm trong giỏ hàng
export const getCartDeleteQuantity = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/cart/delete/${id}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        delete_type: "reduce",
      }),
    }
  );
  return response.json();
};

export const addCartPay = async (data, id) => {
  try {
    const response = await fetch(
      `http://localhost/WebDoAn/model/order/detail_order.php/${id}`,
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
    return { success: false, error: error.message };
  }
};
