import { toast } from "react-toastify";
import { addCart } from "../../service/cart_client";

export const addCartUtil = async (data, apikey) => {
  toast.dismiss();
  const result = await addCart(data, apikey);
  return result;
};
