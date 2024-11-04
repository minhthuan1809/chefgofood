import { toast } from "react-toastify";
import { DecentralizationAction } from "../../action/admin/decentralization";
export const getDecentralization = (apikey) => {
  return async (dispatch) => {
    try {
      const url = `${import.meta.env.VITE_FASTFOOD_ADMIN_API}/admin`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apikey,
        },
      });

      const data = await response.json();
      console.log(data);

      if (!data.ok) {
        toast.error(data.message);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.dismiss();
      toast.success(data.message);

      dispatch(DecentralizationAction(data));

      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);

      throw error;
    }
  };
};
