export const getUiFooter = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHEFGOFOOD_RENDER_API}/homepage`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error.message };
  }
};
