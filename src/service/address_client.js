export const createAddress = async (user_id, data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/address/create/${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: data.address,
          note: data.note,
          phone: data.phone,
        }),
      }
    );

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};

// xóa
export const deleteAddress = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/address/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi thêm");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};
// sửa
export const updateAddress = async (id, data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/address/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: data.address,
          note: data.note,
          phone: data.phone,
        }),
      }
    );

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};
