import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAddress } from "../../../redux/middlewares/client/addAddress";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../../../service/address_client";
import { toast } from "react-toastify";
import { EditModal } from "./model/AddressModel";

const PHONE_PATTERN = /^[0-9]{10,15}$/;
const MAX_ADDRESSES = 3;

export default function Address() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const dataset = useSelector((state) => state.profileAddress.address);

  const [addresses, setAddresses] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    isEditing: false,
    isAdding: false,
  });
  const [editInfo, setEditInfo] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAddresses();
  }, [dispatch, dataset]);

  const fetchAddresses = async () => {
    try {
      await dispatch(getProfileAddress(profile?.id));
      if (dataset) {
        setAddresses(dataset);
      }
    } catch (error) {
      console.error("Error fetching profile address:", error);
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!editInfo.note) newErrors.note = "Tên gợi nhớ không được để trống";
    if (!editInfo.address) newErrors.address = "Địa chỉ không được để trống";

    if (!editInfo.phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!PHONE_PATTERN.test(editInfo.phone)) {
      newErrors.phone = "Số điện thoại không đúng định dạng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateFields()) return;

    try {
      toast.dismiss();
      const data = await createAddress(profile.id, editInfo);

      if (data?.ok) {
        toast.success("Địa chỉ được thêm thành công!");
        closeModal();
      } else {
        handleCreateError(data);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi không xác định, vui lòng thử lại sau!");
      console.error(error);
    }
  };

  const handleCreateError = (data) => {
    if (!data) {
      toast.error("Đã xảy ra lỗi không xác định, vui lòng thử lại sau!");
      return;
    }

    if (data.message === "URL not found") {
      toast.error("Đã có lỗi xảy ra, quý khách vui lòng thử lại sau!");
    } else if (!data.status) {
      toast.error("Tên gợi nhớ đã tồn tại!");
    } else if (!data.limit) {
      toast.error(`Bạn chỉ có thể tạo được ${MAX_ADDRESSES} địa chỉ!`);
    } else {
      toast.error("Thêm địa chỉ thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn muốn xóa địa chỉ này?")) return;

    try {
      const response = await deleteAddress(id);

      if (response?.ok) {
        toast.success("Xóa địa chỉ thành công!");
      } else {
        toast.error("Xóa địa chỉ thất bại!");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      toast.dismiss();
      const data = await updateAddress(editInfo.id, editInfo);

      if (data?.ok) {
        toast.success("Địa chỉ đã thay đổi thành công!");
        closeModal();
      } else if (data && !data.status) {
        toast.error("Tên gợi nhớ đã tồn tại!");
      } else {
        toast.error("Cập nhật địa chỉ thất bại!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi không xác định!");
      console.error(error);
    }
  };

  const handleEditClick = (id) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    setEditInfo({ ...addressToEdit });
    setModalState({
      isOpen: true,
      isEditing: true,
      isAdding: false,
    });
  };

  const handleAddClick = () => {
    setEditInfo({});
    setModalState({
      isOpen: true,
      isEditing: false,
      isAdding: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInfo((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      isEditing: false,
      isAdding: false,
    });
    setEditInfo({});
    setErrors({});
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
                      className="text-blue-600 hover:underline mr-2"
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
        {addresses.length < MAX_ADDRESSES && (
          <button
            onClick={handleAddClick}
            className="px-4 sm:px-6 py-2 bg-[#b17741] text-white rounded-lg hover:bg-[#b17741]/90 transition-colors duration-200"
          >
            Thêm
          </button>
        )}
      </div>

      <EditModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        editInfo={editInfo}
        handleChange={handleChange}
        isEditing={modalState.isEditing}
        onClickCreate={handleCreate}
        onClickSave={handleSave}
        errors={errors}
      />
    </div>
  );
}
