import React from "react";
import * as XLSX from "xlsx";
export default function ExcelHistoryDiscountUser({
  data,
  fileName = "Lịch sử sử dụng mã giảm giá",
}) {
  const handleExport = () => {
    // Transform data for Excel format
    const excelData = data.map((discount, index) => ({
      STT: index + 1,
      code: discount.discount_code,
      "Mã Đơn Hàng": discount.order_id,
      email: discount.email,
      "Giảm giá": `${discount.discount_percent}%`,
      "Ngày sử dụng": discount.datetime,
      "Trạng thái": discount.status
        .replace("Completed", "Hoàn thành")
        .replace("Cancel", "Đã hủy"),
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 5 }, // STT
      { wch: 30 }, // Mã giảm giá
      { wch: 40 }, // Mã Đơn Hàng
      { wch: 35 }, // Email
      { wch: 10 }, // Giảm giá
      { wch: 30 }, // Ngày sử dụng
      { wch: 15 }, // Trạng thái
    ];
    ws["!cols"] = colWidths;

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lịch sử sử dụng mã giảm giá");

    // Save file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div>
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
    </div>
  );
}
