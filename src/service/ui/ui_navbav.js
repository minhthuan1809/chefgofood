export const getUiNavbar = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_RENDER_API}/homepage/navbad`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error.message };
  }
};
