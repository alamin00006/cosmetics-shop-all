import { formatDate } from "@/utils/dateConvert";
import * as XLSX from "xlsx-js-style";

const ExportInvestorData = ({ investors }) => {
  const handleExport = () => {
    const rows = investors?.map((row) => ({
      createdAt: formatDate(row?.createdAt),
      projectName: row.project?.projectTitle,
      investmentId: row.id?.toUpperCase(),
      InvestorName: row.userId?.name,
      contactNo: row.userId?.phoneNumber,
      InvestmentAmount: row?.investmentAmount?.toLocaleString(),
      PRManager: row.project?.PRManagersDetails?.[0]?.name,
      profitRatio: `${row.percentOfReturn}%`,
      returnType: row.returnType,
      status: row.status,
    }));

    // Generate worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profits");

    // Apply custom styles for the header
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "1d6f42" } },
      alignment: { horizontal: "center", vertical: "center" },
    };

    // Add header and apply header styles
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Date",
          "Project Name",
          "Inv.Id",
          "Inv.Name",
          "Inv.Contact No.",
          "Inv.Amount",
          "PR Manager",
          "Profit Ratio",
          "Return Type",
          "Status",
        ],
      ],
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
      { wch: Math.max(...rows.map((r) => (r.projectName || "").length), 20) },
      { wch: Math.max(...rows.map((r) => (r.investmentId || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.InvestorName || "").length), 25) },
      { wch: Math.max(...rows.map((r) => (r.contactNo || "").length), 25) },

      { wch: Math.max(...rows.map((r) => (r.manageUserId || "").length), 20) },
      { wch: Math.max(...rows.map((r) => (r.PRManager || "").length), 25) },
      { wch: 12 },

      { wch: Math.max(...rows.map((r) => (r.returnType || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.profitMonth || "").length), 25) },
      { wch: 20 },
      { wch: Math.max(...rows.map((r) => (r.status || "").length), 10) },
    ];

    worksheet["!cols"] = columnWidths;

    // Write the Excel file and download it
    XLSX.writeFile(workbook, "investor.xlsx", { compression: true });
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

export default ExportInvestorData;
