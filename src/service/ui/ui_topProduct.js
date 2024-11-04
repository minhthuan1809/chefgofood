const errorConfig = {
  log: true, // Log errors to the console
  returnErrorObject: true, // Return an error object
};

export const getUiTopProduct = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FASTFOOD_SERVER_API}/products/top?limit=20`
    );
    const result = await response.json();

    return result;
  } catch (error) {
    if (errorConfig.log) {
      console.error("Error:", error);
    }
    if (errorConfig.returnErrorObject) {
      return { success: false, error: error.message };
    }
    return null;
  }
};
