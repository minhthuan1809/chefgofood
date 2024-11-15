import { toast } from "react-toastify";
import { DecentralizationAction } from "../../action/admin/decentralization";
export const getDecentralization = (apikey) => {
  return async (dispatch) => {
    try {
      const url = `https://3.106.181.73/backend-fastfood/main_admin.php/admin/role`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apikey,
        },
        body: JSON.stringify({
          action: "get_role",
        }),
      });

      const data = await response.json();
      console.log("data", data);
      if (data.success) {
        toast.dismiss();
        toast.success(data.message);
        dispatch(DecentralizationAction(data.roles));
      } else {
        toast.error(
          data.message || "Có lỗi xảy ra khi lấy thông tin phân quyền"
        );
      }

      return data;
    } catch (error) {
      console.error("Lỗi khi gọi API:", error.message);
      toast.error("Có lỗi xảy ra khi lấy thông tin phân quyền");
      throw error;
    }
  };
};
