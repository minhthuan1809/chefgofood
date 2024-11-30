import React, { useEffect, useState } from "react";
import {
  addContact,
  addSocialMedia,
  deleteContact,
  deleteSocialMedia,
  editContact,
  editSocialMedia,
  updateCompanyInfo,
} from "../../../service/server/layout/api_footer";
import { toast } from "react-toastify";
import { getUiFooter } from "../../../service/ui/ui_footer";
import { Link } from "react-router-dom";
import { MdCancel, MdDeleteForever, MdEdit, MdSave } from "react-icons/md";
import { DynamicIcon } from "../../../components/util/iconLibraries";

export default function FixFooter() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [copyright_text, setCopyrightText] = useState("");
  const [icon, setIcon] = useState("");
  const [link, setLink] = useState("");
  const [iconContact, setIconContact] = useState("");
  const [contentContact, setContentContact] = useState("");
  const [socialMedia, setSocialMedia] = useState([]);
  const [contact, setContact] = useState([]);
  const [editContactId, setEditContactId] = useState(null);
  const [editSocialId, setEditSocialId] = useState(null);
  const [btnEditSocial, setBtnEditSocial] = useState(false);
  const [btnEditContact, setBtnEditContact] = useState(false);
  const [editContactIcon, setEditContactIcon] = useState("");
  const [editContactContent, setEditContactContent] = useState("");
  const [editSocialIcon, setEditSocialIcon] = useState("");
  const [editSocialLink, setEditSocialLink] = useState("");
  const getFooter = async () => {
    const res = await getUiFooter();
    setName(res.companyInfo.name);
    setDescription(res.companyInfo.description);
    setCopyrightText(res.companyInfo.copyright_text);
    setSocialMedia(res.socialMedia);
    setContact(res.contactSection.items);
  };
  useEffect(() => {
    getFooter();
  }, []);

  const handleUpdateCompanyInfo = async (e) => {
    e.preventDefault();
    try {
      toast.dismiss();
      const response = await updateCompanyInfo({
        name,
        description,
        copyright_text,
      });
      console.log(response);
      if (response.ok) {
        toast.success("Cập nhật thông tin chân trang thành công");
      } else {
        toast.error("Cập nhật thông tin chân trang thất bại");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };

  // thêm mạng xã hội
  const handleAddSocial = async (e) => {
    toast.dismiss();
    e.preventDefault();
    if (!icon || !link) {
      toast.error("Vui lòng nhập đẩy đủ thông tin");
      return;
    }
    const res = await addSocialMedia({
      platform: "",
      icon,
      url: link,
    });
    if (res.ok) {
      toast.success("Thêm mạng xã hội thành công");
      setIcon("");
      setLink("");
      getFooter();
    } else {
      toast.error("Thêm mạng xã hội thất bại");
    }
  };

  // xóa mạng xã hội
  const handleDelSocial = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mạng xã hội này không?")) return;
    toast.dismiss();
    const res = await deleteSocialMedia(id);
    if (res.ok) {
      toast.success("Xóa mạng xã hội thành công");
      getFooter();
    } else {
      toast.error("Xóa mạng xã hội thất bại");
    }
  };

  // thêm liên hệ
  const handleAddContact = async (e) => {
    toast.dismiss();
    e.preventDefault();
    if (!iconContact || !contentContact) {
      toast.error("Vui lòng nhập đẩy đủ thông tin");
      return;
    }
    const res = await addContact({
      title: "",
      icon: iconContact,
      content: contentContact,
      type: "",
    });
    if (res.ok) {
      toast.success("Thêm liên hệ thành công");
      setIconContact("");
      setContentContact("");
      getFooter();
    } else {
      toast.error("Thêm liên hệ thất bại");
    }
  };

  // xóa liên hệ
  const handleDelContact = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa liên hệ này không?")) return;
    toast.dismiss();

    const res = await deleteContact(id);
    if (res.ok) {
      toast.success("Xóa liên hệ thành công");
      getFooter();
    } else {
      toast.error("Xóa liên hệ thất bại");
    }
  };

  // sửa liên hệ
  const handleEditContact = async (id) => {
    toast.dismiss();
    setBtnEditContact(true);
    if (!editContactIcon || !editContactContent) {
      toast.error("Vui lòng nhập đẩy đủ thông tin");
      return;
    }
    const res = await editContact(id, {
      title: "",
      icon: editContactIcon,
      content: editContactContent,
      type: "",
    });
    if (res.ok) {
      toast.success("Sửa liên hệ thành công");
      setEditContactId(null);
      setEditContactContent("");
      setEditContactIcon("");
      getFooter();
    } else {
      toast.error("Sửa liên hệ thất bại");
    }
    setBtnEditContact(false);
  };

  // sửa mạng xã hội
  const handleEditSocial = async (id) => {
    toast.dismiss();
    setBtnEditSocial(true);
    if (!editSocialIcon || !editSocialLink) {
      toast.error("Vui lòng nhập đẩy đủ thông tin");
      return;
    }
    const res = await editSocialMedia(id, {
      icon: editSocialIcon,
      url: editSocialLink,
      platform: "",
    });
    if (res.ok) {
      toast.success("Sửa mạng xã hội thành công");
      setEditSocialId(null);
      setEditSocialLink("");
      setEditSocialIcon("");
      getFooter();
    } else {
      toast.error("Sửa mạng xã hội thất bại");
    }
    setBtnEditSocial(false);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Cập nhật thông tin chân trang
          </h2>

          <form onSubmit={handleUpdateCompanyInfo} className="space-y-6">
            <div>
              <label className="text-gray-700 font-semibold block mb-2">
                Tên công ty
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên công ty"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  outline-none"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-semibold block mb-2">
                Mô tả
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Nhập mô tả"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  outline-none"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-semibold block mb-2">
                Bản quyền
              </label>
              <input
                type="text"
                name="copyright_text"
                value={copyright_text}
                onChange={(e) => setCopyrightText(e.target.value)}
                placeholder="Nhập bản quyền"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Cập nhật thông tin
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Quản lý mạng xã hội
          </h2>

          <Link
            to="https://react-icons.github.io/react-icons/"
            className="text-blue-600 hover:text-blue-800 block mb-4"
            target="_blank"
          >
            Xem danh sách icon tại đây
          </Link>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                placeholder="Nhập tên icon..."
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  outline-none"
                required
              />
              <input
                type="text"
                name="link"
                value={link}
                placeholder="Nhập đường dẫn..."
                onChange={(e) => setLink(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  outline-none"
              />
              <button
                onClick={handleAddSocial}
                type="button"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200 outline-none "
              >
                Thêm mới
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Icon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên Icon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đường dẫn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {socialMedia.map((item, index) =>
                    editSocialId === item.id ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <DynamicIcon iconName={item.icon} size={24} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            required
                            type="text"
                            value={editSocialIcon}
                            onChange={(e) => setEditSocialIcon(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            required
                            type="text"
                            value={editSocialLink}
                            onChange={(e) => setEditSocialLink(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditSocialId(null)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-full transition duration-200"
                            >
                              <MdCancel size={24} />
                            </button>
                            <button
                              onClick={() => handleEditSocial(item.id)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition duration-200"
                            >
                              {btnEditSocial ? "..." : <MdSave size={24} />}
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <DynamicIcon iconName={item.icon} size={24} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {item.icon}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={item.url}
                            target="_blank"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {item.url}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelSocial(item.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-full transition duration-200"
                            >
                              <MdDeleteForever size={24} />
                            </button>
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition duration-200"
                              onClick={() => {
                                setEditSocialId(item.id);
                                setEditSocialIcon(item.icon);
                                setEditSocialLink(item.url);
                              }}
                            >
                              <MdEdit size={24} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Thông tin liên hệ
          </h2>

          <Link
            to="https://react-icons.github.io/react-icons/"
            className="text-blue-600 hover:text-blue-800 block mb-4"
            target="_blank"
          >
            Xem danh sách icon tại đây
          </Link>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                required
                type="text"
                placeholder="Nhập tên icon..."
                value={iconContact}
                onChange={(e) => setIconContact(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  outline-none"
              />
              <input
                required
                type="text"
                name="content"
                placeholder="Nhập đường dẫn..."
                value={contentContact}
                onChange={(e) => setContentContact(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  outline-none"
              />
              <button
                onClick={handleAddContact}
                type="button"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 outline-none "
              >
                Thêm mới
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Icon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên Icon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thông tin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contact.map((item, index) => (
                    <tr key={index}>
                      {editContactId === item.id ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <DynamicIcon iconName={item.icon} size={24} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              required
                              type="text"
                              value={editContactIcon}
                              onChange={(e) =>
                                setEditContactIcon(e.target.value)
                              }
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              required
                              type="text"
                              value={editContactContent}
                              onChange={(e) =>
                                setEditContactContent(e.target.value)
                              }
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditContactId(null)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition duration-200"
                              >
                                <MdCancel size={24} />
                              </button>
                              <button
                                onClick={() => handleEditContact(item.id)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition duration-200"
                              >
                                {btnEditContact ? "..." : <MdSave size={24} />}
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <DynamicIcon iconName={item.icon} size={24} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {item.icon}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.content}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDelContact(item.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition duration-200"
                              >
                                <MdDeleteForever size={24} />
                              </button>
                              <button
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition duration-200"
                                onClick={() => {
                                  setEditContactId(item.id);
                                  setEditContactIcon(item.icon);
                                  setEditContactContent(item.content);
                                }}
                              >
                                <MdEdit size={24} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
