//cập nhật trạng thái đơn hàng
export const getChatAdminRender = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/message_admin`
  );

  return response.json();
};
//chi tiết tin nhắn
export const getChatAdminDetail = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/detail_message_user/${id}`
  );

  return response.json();
};
//gửi tin nhắn
export const sendMessageAdmin = async (user_id, data, api_key) => {
  const response = await fetch(
    `${import.meta.env.VITE_CHEFGOFOOD_SERVER_API}/message_admin/${user_id.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": api_key,
      },
      body: JSON.stringify({ content: data, status: false }),
    }
  );

  return response.json();
};
