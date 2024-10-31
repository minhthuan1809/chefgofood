export const getRegister = async (data) => {
  console.log(data);

  try {
    const response = await fetch("http://10.8.0.3/WebDoAn/main.php/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Đăng ký thất bại. Vui lòng thử lại.");
    }

    const result = await response.json();
    console.log("Registration successful:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};
