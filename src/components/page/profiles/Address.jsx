import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAddress } from "../../../redux/middlewares/addAddress";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../../../service/address_client";
import { toast } from "react-toastify";
import { EditModal } from "./model/AddressModel";

export default function Address() {
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const dataset = useSelector((state) => state.profileAddress.address);
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editInfo, setEditInfo] = useState({});
  const [errors, setErrors] = useState({}); // Trạng thái cho lỗi

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProfileAddress(profile?.id));
        if (dataset) {
          setAddresses(dataset);
        }
      } catch (error) {
        console.error("Error fetching profile address:", error);
      }
    };

    fetchData();
  }, [dispatch, dataset]); //dispatch, profile?.id, dataset

  const validateFields = () => {
    const newErrors = {};
    if (!editInfo.note) newErrors.note = "Tên gợi nhớ không được để trống";
    if (!editInfo.address) newErrors.address = "Địa chỉ không được để trống";
    const phonePattern = /^[0-9]{10,15}$/; // Điều kiện số điện thoại
    if (!editInfo.phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!phonePattern.test(editInfo.phone)) {
      newErrors.phone = "Số điện thoại không đúng định dạng";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleCreate = async () => {
    if (!validateFields()) return; // Kiểm tra lỗi trước khi tiếp tục
    // Thêm địa chỉ mới
    const data = await createAddress(profile.id, editInfo);
    toast.dismiss();
    console.log(data);

    if (data) {
      if (data.ok) {
        toast.success("Địa chỉ được thêm !");
        setIsAdding(false);
        setEditInfo("");
        setErrors({}); // Đặt lại lỗi sau khi thành công
      } else {
        // Xử lý các thông báo lỗi khi ok là false
        if (data.message === "URL not found") {
          toast.error("Đã lỗi xảy ra , quý khách vui lòng thử lại sau !");
        } else if (!data.status) {
          toast.error("Tên gợi nhớ đã tồn tại !");
        } else if (!data.limit) {
          toast.error("bạn chỉ có thể tạo được 3 địa chỉ !");
        } else {
          toast.error("Thêm thất bại !");
        }
      }
    } else {
      toast.error("Đã xảy ra lỗi không xác định, vui lòng thử lại sau !");
    }
  };

  //xóa

  const handleDelete = async (id) => {
    if (confirm("bạn muốn xóa địa chỉ này ?")) {
      try {
        const response = await deleteAddress(id);
        console.log(response);

        if (response.ok) {
          toast.success("Địa chỉ có thể xoá !");
        } else {
          toast.error("Xóa thể thất bại !");
        }
      } catch (error) {
        toast.error("Đã có lỗi xảy ra!");
        console.log(error);
      }
    }
  };
  // sửa
  const handleSave = async () => {
    if (!validateFields()) return;
    toast.dismiss();
    console.log(editInfo.id);

    const data = await updateAddress(editInfo.id, editInfo);
    if (data) {
      if (data.ok) {
        toast.success("Địa chỉ đã thay đổi !");
        setIsEditing(false);
        setEditInfo("");
        setErrors({});
      } else if (!data.status) {
        toast.error("Tên gợi nhớ đã tồn tại !");
      } else {
        toast.error("Sửa thể thất bị !");
      }
    } else {
      toast.error("Đã xảy ra lỗi xảy ra !");
    }
    console.log("data", data);

    setErrors({}); // Đặt lại lỗi sau khi thành công
  };

  const handleEditClick = (id) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    setEditInfo({ ...addressToEdit });
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setEditInfo({});
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setIsEditing(false);
    setIsAdding(false);
    setErrors({}); // Đặt lại lỗi khi đóng modal
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Cập nhật địa chỉ</h1>

      {addresses.length === 0 ? (
        <p className="text-center text-gray-500 mb-4">Bạn chưa nhập địa chỉ</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 sm:px-4 py-2 border">Tên gợi nhớ</th>
                <th className="px-2 sm:px-4 py-2 border">Địa chỉ</th>
                <th className="px-2 sm:px-4 py-2 border">Số điện thoại</th>
                <th className="px-2 sm:px-4 py-2 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.id}>
                  <td className="px-2 sm:px-4 py-2 border">{address.note}</td>
                  <td className="px-2 sm:px-4 py-2 border">
                    {address.address}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border">{address.phone}</td>
                  <td className="px-2 sm:px-4 py-2 border">
                    <button
                      onClick={() => handleEditClick(address.id)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(address.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end">
        {addresses.length < 3 && (
          <button
            onClick={handleAddClick}
            className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Thêm
          </button>
        )}
      </div>

      <EditModal
        isOpen={isEditing || isAdding}
        onClose={handleClose}
        editInfo={editInfo}
        handleChange={handleChange}
        isEditing={isEditing}
        onClickCreate={handleCreate}
        onClickSave={handleSave}
        errors={errors}
      />
    </div>
  );
}
