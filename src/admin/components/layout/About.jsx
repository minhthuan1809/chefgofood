import React, { useEffect, useState } from "react";
import { getUiAbout } from "../../../service/ui/ui_about";
import {
  addBodyUiAbout,
  DeleBodyUiAbout,
  editStandards,
  fixFirstUiAbout,
} from "../../../service/server/layout/api_about_admin";
import { toast } from "react-toastify";
import { DynamicIcon } from "../../../components/util/iconLibraries";
import { MdDelete, MdEdit, MdModeEditOutline } from "react-icons/md";
import ModalEditAbout from "./ModalEditAbout";
import { TiTick } from "react-icons/ti";
import { GiCancel } from "react-icons/gi";

export default function About() {
  const [nameFirst, setNameFirst] = useState("");
  const [descriptionFirst, setDescriptionFirst] = useState("");
  const [btnFirst, setBtnFirst] = useState(false);

  const [nameSecond, setNameSecond] = useState("");
  const [descriptionSecond, setDescriptionSecond] = useState("");
  const [btnSecond, setBtnSecond] = useState(false);
  const [features, setFeatures] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [standards, setStandards] = useState([]);
  const [addInput, setAddInput] = useState("");

  const [inputEdit, setInputEdit] = useState("");
  const [inputEditData, setInputEditData] = useState("");
  const [btnEdit, setBtnEdit] = useState(false);
  // chung
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUiAbout();
        // section 1
        setDescriptionFirst(response.Info[0].description);
        setNameFirst(response.Info[0].name);
        // section 2
        setDescriptionSecond(response.Info[1].description);
        setNameSecond(response.Info[1].name);

        // section 3
        const features = response.session?.filter(
          (item) => item.description && item.id <= 4
        );
        const standards = response.session?.filter(
          (item) => item.id > 5 && item.name.trim()
        );
        setFeatures(features);
        setStandards(standards);
      } catch (error) {
        console.error("Failed to fetch about info:", error);
      }
    };
    fetchData();
  }, [refetch]);

  // sửa section 1
  const handleFixFirstUiAbout = async () => {
    toast.dismiss();
    setBtnFirst(true);
    try {
      const data = {
        name: nameFirst,
        description: descriptionFirst,
      };

      const response = await fixFirstUiAbout(data, 1);
      if (response.ok) {
        toast.success("Cập nhật thành công");
        setRefetch((prev) => !prev);
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      toast.error("Cập nhật thất bại");
    } finally {
      setBtnFirst(false);
    }
  };
  // sửa section 2
  const handleFixSecondUiAbout = async () => {
    toast.dismiss();
    setBtnSecond(true);
    try {
      const data = {
        name: nameSecond,
        description: descriptionSecond,
      };

      const response = await fixFirstUiAbout(data, 2);
      if (response.ok) {
        toast.success("Cập nhật thành công");
        setRefetch((prev) => !prev);
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      toast.error("Cập nhật thất bại");
    } finally {
      setBtnSecond(false);
    }
  };
  // thêm dữ liệu
  const handleAddData = async () => {
    const data = {
      name: addInput,
      description: "",
      icon: "TiTick",
    };
    const response = await addBodyUiAbout(data);
    if (response.ok) {
      toast.success("Thêm thành công");
      setRefetch((prev) => !prev);
    } else {
      toast.error("Thêm thất bại");
    }
    setAddInput("");
  };

  // xóa
  const handleDeleteData = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa không?")) return;
    const response = await DeleBodyUiAbout(id);

    if (response.ok) {
      toast.success("Xóa thành công");
      setRefetch((prev) => !prev);
    } else {
      toast.error("Xóa thất bại");
    }
  };
  // sửa
  const handleFixStandards = async () => {
    toast.dismiss();
    setBtnEdit(true);
    const data = {
      name: inputEditData,
      description: "",
      icon: "TiTick",
    };
    const response = await editStandards(data, inputEdit);
    console.log(response);

    if (response.ok) {
      toast.success("Cập nhật thành công");
      setRefetch((prev) => !prev);
      setInputEdit("");
    } else {
      toast.error("Cập nhật thất bại");
    }
    setBtnEdit(false);
  };
  return (
    <div className="space-y-6 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 space-y-4">
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Giao diện đầu tiên
        </h3>
        <div className="space-y-2">
          <span className="text-lg font-bold">Tiêu đề </span>
          <input
            type="text"
            placeholder="Tiêu đề"
            className="border outline-none w-full rounded-lg p-2"
            onChange={(e) => setNameFirst(e.target.value)}
            value={nameFirst}
          />
        </div>
        <div className="space-y-2">
          <span className="text-lg font-bold">Mô tả </span>
          <textarea
            placeholder="Mô tả"
            className="border outline-none w-full rounded-lg p-2"
            onChange={(e) => setDescriptionFirst(e.target.value)}
            value={descriptionFirst}
          />
        </div>
        <button
          disabled={btnFirst}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handleFixFirstUiAbout}
        >
          {btnFirst ? "Đang cập nhật..." : "Lưu thay đổi"}
        </button>
      </div>
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 space-y-4">
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Giao diện thứ hai
        </h3>
        <div className="space-y-2">
          <span className="text-lg font-bold">Tiêu đề </span>
          <input
            type="text"
            placeholder="Tiêu đề"
            className="border outline-none w-full rounded-lg p-2"
            onChange={(e) => setNameSecond(e.target.value)}
            value={nameSecond}
          />
        </div>
        <div className="space-y-2">
          <span className="text-lg font-bold">Mô tả </span>
          <textarea
            type="text"
            placeholder="Mô tả"
            className="border outline-none w-full rounded-lg p-2"
            onChange={(e) => setDescriptionSecond(e.target.value)}
            value={descriptionSecond}
          />
        </div>
        <button
          disabled={btnSecond}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handleFixSecondUiAbout}
        >
          {btnSecond ? "Đang cập nhật..." : "Lưu thay đổi"}
        </button>
      </div>
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 space-y-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-16">
          {features.map((feature) => (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <DynamicIcon
                  iconName={feature.icon}
                  size={50}
                  className="text-blue-600 mb-2 sm:mb-4"
                />
                <button
                  className="text-blue-600 hover:text-blue-800 transition-all duration-300 "
                  onClick={() => {
                    setModalEdit(true);
                    setDataEdit(feature);
                  }}
                >
                  <MdEdit size={24} />
                </button>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {feature.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      </div>
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 space-y-4">
        <section className="space-y-4">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Đa dạng món ăn
          </h1>
          <div className="flex items-center gap-4">
            {" "}
            <input
              type="text"
              placeholder="Thêm Đa Dạng Món Ăn ...."
              className="border outline-none w-full rounded-lg p-2"
              onChange={(e) => setAddInput(e.target.value)}
              value={addInput}
            />
            <button
              className="bg-blue-600 text-white  p-2 px-4 rounded-lg"
              onClick={handleAddData}
            >
              Thêm
            </button>
          </div>
          <ul className="space-y-2 flex flex-col">
            {standards.map((standard, index) => {
              return (
                <div className="flex items-center justify-between">
                  <li
                    key={standard.id}
                    className="flex items-center gap-2  flex-1 "
                  >
                    <span className="text-lg font-bold">{index + 1}.</span>
                    {inputEdit === standard.id ? (
                      <input
                        type="text"
                        className="border outline-none w-full rounded-lg p-2 mr-2"
                        onChange={(e) => setInputEditData(e.target.value)}
                        value={inputEditData}
                      />
                    ) : (
                      standard.name
                    )}
                  </li>
                  <div className="flex items-center gap-2">
                    {inputEdit === standard.id ? (
                      <>
                        {" "}
                        <button
                          className=" text-green-600 px-4 py-2 rounded-lg"
                          onClick={handleFixStandards}
                          disabled={btnEdit}
                        >
                          {btnEdit ? "..." : <TiTick size={24} />}
                        </button>
                        <button
                          className=" text-red-600 px-4 py-2 rounded-lg"
                          onClick={() => {
                            setInputEdit("");
                            setInputEditData("");
                          }}
                        >
                          <GiCancel size={24} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-600 px-4 py-2 rounded-lg"
                          onClick={() => {
                            setInputEdit(standard.id);
                            setInputEditData(standard.name);
                          }}
                        >
                          <MdModeEditOutline size={24} />
                        </button>
                        <button
                          className="text-red-600 px-4 py-2 rounded-lg"
                          onClick={() => handleDeleteData(standard.id)}
                        >
                          <MdDelete size={24} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </section>
      </div>
      <ModalEditAbout
        modalEdit={modalEdit}
        setModalEdit={setModalEdit}
        setRefetch={setRefetch}
        dataEdit={dataEdit}
      />
    </div>
  );
}
