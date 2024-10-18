import React, { useState } from "react";

export default function Vat() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      companyName: "cvbn",
      companyAddress: "sdf",
      taxCode: "2345",
      recipientName: "John Doe",
      phoneNumber: "0123456789",
      recipientAddress: "123 Main St",
    },
  ]);

  const [currentInvoice, setCurrentInvoice] = useState({
    id: null,
    companyName: "",
    companyAddress: "",
    taxCode: "",
    recipientName: "",
    phoneNumber: "",
    recipientAddress: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentInvoice((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setInvoices(
        invoices.map((invoice) =>
          invoice.id === currentInvoice.id ? currentInvoice : invoice
        )
      );
      setIsEditing(false);
    } else {
      setInvoices([...invoices, { ...currentInvoice, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (invoice) => {
    setCurrentInvoice(invoice);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  const resetForm = () => {
    setCurrentInvoice({
      id: null,
      companyName: "",
      companyAddress: "",
      taxCode: "",
      recipientName: "",
      phoneNumber: "",
      recipientAddress: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Cập nhật hóa đơn VAT của bạn</h1>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Tên công ty</th>
            <th className="text-left py-2">Địa chỉ công ty</th>
            <th className="text-left py-2">Tax code</th>
            <th className="text-left py-2"></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b">
              <td className="py-2">{invoice.companyName}</td>
              <td className="py-2">{invoice.companyAddress}</td>
              <td className="py-2">{invoice.taxCode}</td>
              <td className="py-2 text-right">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEdit(invoice)}
                >
                  Sửa
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(invoice.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Sửa thông tin hóa đơn" : "Nhập thông tin hóa đơn"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="companyName"
            placeholder="Tên công ty"
            value={currentInvoice.companyName}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="taxCode"
            placeholder="Tax code"
            value={currentInvoice.taxCode}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <input
          type="text"
          name="companyAddress"
          placeholder="Địa chỉ công ty"
          value={currentInvoice.companyAddress}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="recipientName"
            placeholder="Tên người nhận"
            value={currentInvoice.recipientName}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Số điện thoại"
            value={currentInvoice.phoneNumber}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <input
          type="text"
          name="recipientAddress"
          placeholder="Địa chỉ người nhận"
          value={currentInvoice.recipientAddress}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "CẬP NHẬT" : "LƯU"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => {
              setIsEditing(false);
              resetForm();
            }}
          >
            HỦY
          </button>
        )}
      </form>
    </div>
  );
}
