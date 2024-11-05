export const decentralizationDelete = async (id) => {
  console.log(id);
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_FASTFOOD_ADMIN_API
      }/Decentralization/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};
