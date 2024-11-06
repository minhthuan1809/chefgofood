import { toast } from "react-toastify";
import { DecentralizationAction } from "../../action/admin/decentralization";
export const getDecentralization = (apikey) => {
  return async (dispatch) => {
    try {
      const url = `${import.meta.env.VITE_FASTFOOD_ADMIN_API}/admin/role`;
      console.log("url", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apikey,
        },
      });

      const data = await response.json();
      console.log("xác thực apikey", data);
      if (response.ok) {
        toast.dismiss();
        toast.success(data.message);
        dispatch(DecentralizationAction(data.roles));
      }

      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);

      throw error;
    }
  };
};
