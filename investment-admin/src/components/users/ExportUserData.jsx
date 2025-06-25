import { formatDate } from "@/utils/dateConvert";
import * as XLSX from "xlsx-js-style";

const ExportUserData = ({ users }) => {
  const handleExport = () => {
    const rows = users?.map((row) => ({
      createdAt: formatDate(row?.createdAt),
      name: row?.name,
      userId: row?.id,
      contactNo: row?.phoneNumber,
      email: row.email,
      status: row.status,
    }));

    // Generate worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Apply custom styles for the header
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "1d6f42" } },
      alignment: { horizontal: "center", vertical: "center" },
    };

    // Add header and apply header styles
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Account create", "Name", "Id", "Contact No.", "Email", "Status"]],
      { origin: "A1" }
    );
    worksheet["!rows"] = [{ hpx: 25 }];

    const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = headerStyle; // Apply header style
      }
    }

    const rowStartIndex = 1;
    const statusColumnIndex = 9;

    for (let R = rowStartIndex; R <= rows.length; ++R) {
      const statusCellAddress = XLSX.utils.encode_cell({
        r: R,
        c: statusColumnIndex,
      });

      if (worksheet[statusCellAddress]) {
        const statusValue = worksheet[statusCellAddress].v;
        // Conditionally set the style based on the payment status value
        const statusStyle = {
          font: {
            color: { rgb: statusValue === "Approved" ? "1d6f42" : "FF0000" },
            bold: true,
          },
          alignment: { horizontal: "center", vertical: "center" },
        };

        worksheet[statusCellAddress].s = statusStyle;
      }
    }

    // Column widths (dynamic or fixed)
    const columnWidths = [
      { wch: 15 },
      { wch: Math.max(...rows.map((r) => (r.name || "").length), 20) },
      { wch: Math.max(...rows.map((r) => (r.userId || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.contactNo || "").length), 25) },
      { wch: Math.max(...rows.map((r) => (r.email || "").length), 25) },
      { wch: Math.max(...rows.map((r) => (r.status || "").length), 10) },
    ];

    worksheet["!cols"] = columnWidths;

    // Write the Excel file and download it
    XLSX.writeFile(workbook, "users.xlsx", { compression: true });
  };

  return (
    <button
      onClick={handleExport}
      className="bg-[#1d6f42] text-white px-3 py-1 rounded"
    >
      Export to Excel
    </button>
  );
};

export default ExportUserData;
