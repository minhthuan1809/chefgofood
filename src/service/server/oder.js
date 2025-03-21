// Lấy danh sách đơn hàng chờ xác nhận
export const ConfirmOrder = async (page, limit, searchTerm) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_CHEFGOFOOD_SERVER_API
    }/order?page=${page}&limit=${limit}&q=${searchTerm}`
  );
  return response.json();
};

// Lấy chi tiết đơn hàng
export const detailOrder = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/order_detail/${id}`
  );

  const data = await response.json();
  return data;
};

// Lấy lịch sử đơn hàng admin
export const getHistoryRender = async (page, limit, searchTerm) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_CHEFGOFOOD_SERVER_API
      }/history_order_admin?page=${page}&limit=${limit}&q=${searchTerm}`
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};

//cập nhật trạng thái đơn hàng
export const updateStatusOrder = async (order_id, status) => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/order/fix/${order_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    }
  );

  return response.json();
};
