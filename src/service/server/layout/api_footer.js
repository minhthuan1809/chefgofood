// cập nhật thông tin công ty
export const updateCompanyInfo = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_RENDER_API}/footer/company`,
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

// thêm mạng xã hội
export const addSocialMedia = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_RENDER_API}/footer/social/4`,
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
// xóa mạng xã hội
export const deleteSocialMedia = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_RENDER_API}/footer/social/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const _data = await response.json();
  return _data;
};

// thêm liên hệ
export const addContact = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_RENDER_API}/footer/contact/1`,
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
// sửa liên hệ
export const editContact = async (id, data) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_RENDER_API}/footer/contact/${id}`,
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
// xóa liên hệ
export const deleteContact = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_RENDER_API}/footer/contact/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const _data = await response.json();
  return _data;
};

// sửa mạng xã hội
export const editSocialMedia = async (id, data) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_RENDER_API}/footer/social/${id}`,
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
