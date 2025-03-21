export const getDashboard = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/dashboard`
    );

    if (!response.ok) {
      throw new Error("Lỗi lấy dashboard");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

// thống kê số đơn hàng thwo tuần
export const getOrdersChart = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/weekly_orders`
    );
    return response.json();
  } catch (error) {
    console.error("Registration error:", error);
  }
};

// thống kê doanh thu thu tuần
export const getRevenueChart = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/weekly_revenue`
    );
    return response.json();
  } catch (error) {
    console.error("Registration error:", error);
  }
};

// thống kê sản phẩm bán chạy
export const getTopSellingProducts = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/top_selling_products`
    );
    return response.json();
  } catch (error) {
    console.error("Registration error:", error);
  }
};
