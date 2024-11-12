/* eslint-disable react/prop-types */
import React from "react";
import * as XLSX from "xlsx";

const ExportToExcel = ({ data, fileName = "DanhSachSanPham" }) => {
  const handleExport = () => {
    // Transform data for Excel format
    const excelData = data.map((product, index) => ({
      STT: index + 1,
      "Tên sản phẩm": product.name,
      "Mô tả": product.description,
      Giá: product.price,
      "Giảm giá": `${product.discount}%`,
      "Số lượng": product.quantity,
      Loại: product.type
        .toLowerCase()
        .replace("cake", "Bánh")
        .replace("water", "Nước")
        .replace("food", "Đồ ăn"),
      "Trạng thái": product.lock
        ? "Đang dừng"
        : product.status
        ? "Còn hàng"
        : "Hết hàng",
      "Link hình ảnh": product.image_url,
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 5 }, // STT
      { wch: 30 }, // Tên sản phẩm
      { wch: 40 }, // Mô tả
      { wch: 15 }, // Giá
      { wch: 10 }, // Giảm giá
      { wch: 10 }, // Số lượng
      { wch: 15 }, // Loại
      { wch: 15 }, // Trạng thái
      { wch: 50 }, // Link hình ảnh
    ];
    ws["!cols"] = colWidths;

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");

    // Save file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      Xuất Excel
    </button>
  );
};

export default ExportToExcel;
