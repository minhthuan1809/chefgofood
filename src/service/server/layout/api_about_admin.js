export const fixFirstUiAbout = async (data, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_RENDER_API}/about/head/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};
export const fixBodyUiAbout = async (data, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_RENDER_API}/about/body_main/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const addBodyUiAbout = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_RENDER_API}/about/body/extra/1`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};
// xóa
export const DeleBodyUiAbout = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_RENDER_API}/about/body/extra/${id}`,
    {
      method: "DELETE",
    }
  );
  return response.json();
};

//edit
export const editStandards = async (data, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_RENDER_API}/about/body/extra/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};
