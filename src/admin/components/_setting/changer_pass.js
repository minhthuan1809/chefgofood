import { toast } from "react-toastify";
import { getChangePassAdmin } from "../../../service/server/changePassAdmin";
import Cookies from "js-cookie";
export default async function handleChangePassword(
  e,
  setNewPassword,
  setOldPassword,
  setConfirmPassword
) {
  if (confirm("Bạn muốn đổi mật khẩu không?")) {
    toast.dismiss();
    try {
      const data = await getChangePassAdmin(e, Cookies.get("admin_apikey"));
      if (data.ok) {
        toast.success(data.message);
        setNewPassword("");
        setOldPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đổi mật khẩu");
      console.log(error);
    }
  }
}
