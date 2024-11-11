//render
export const getSupportChat = async (apiKey) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/message`,
    {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    }
  );
  const data = await response.json();

  return data;
};

// create message
export const getSupportChatCreates = async (apiKey, message) => {
  const response = await fetch(
    `${import.meta.env.VITE_FASTFOOD_SERVER_API}/message_user`,
    {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify({ content: message }),
    }
  );
  const data = await response.json();
  console.log("data", data);
  return data;
};
