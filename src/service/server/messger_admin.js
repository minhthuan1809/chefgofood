//cập nhật trạng thái đơn hàng
export const getChatAdminRender = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/message_admin`
  );

  return response.json();
};
//chi tiết tin nhắn
export const getChatAdminDetail = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/detail_message_user/${id}`
  );

  return response.json();
};
//gửi tin nhắn
export const sendMessageAdmin = async (user_id, data) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/message_admin/${user_id}`,
    { method: "POST", body: JSON.stringify({ content: data }) }
  );

  return response.json();
};
