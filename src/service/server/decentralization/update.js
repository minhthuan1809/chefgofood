export const decentralizationUpdate = async (id, data) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_FASTFOOD_ADMIN_API
      }/Decentralization/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          order: data.permissions.order,
          mess: data.permissions.mess,
          statistics: data.permissions.statistics,
          user: data.permissions.user,
          product: data.permissions.product,
          discount: data.permissions.discount,
          layout: data.permissions.layout,
          decentralization: data.permissions.decentralization,
          note: data.note,
        }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};
