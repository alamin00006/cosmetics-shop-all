import { formatDate } from "@/utils/dateConvert";
import * as XLSX from "xlsx-js-style";

const ExportProfitToExcel = ({ profits }) => {
  const handleExport = () => {
    const rows = profits?.map((row) => ({
      createdAt: formatDate(row?.createdAt),
      projectName: row.project?.projectTitle,
      investmentId: row.investmentId?.id?.toUpperCase(),
      InvestorName: row.userId?.name,
      InvestmentAmount: row?.investmentId?.investmentAmount.toLocaleString(),
      manageUserId: row?.manageUserId?.name,
      percentageOfProfit: `${row.percentageOfProfit}%`,
      profitCount: row.profitCount?.toLocaleString(),
      returnType: row.returnType,
      profitMonth: `${
        row?.profitGiveMonths && row?.profitGiveYear
          ? `${row?.profitGiveMonths} (${row?.profitGiveYear})`
          : `${formatDate(row?.fromProfitCountDate)} to ${formatDate(
              row?.toProfitCountDate
            )}`
      }`,
      withdrawRQ: row?.withdrawRQ === "Yes" ? "Request" : "No request",
      Status: row.paymentStatus,
      bankName: row?.userBankAccount?.bankName,
      accountNumber: `${row?.userBankAccount?.accountNumber}`,
      bankBranch: row?.userBankAccount?.branchName,
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
          "Inv.Amount",
          "PR Manager",
          "Profit Ratio",
          "Profit Count",
          "Return Type",
          "Profit Month",
          "Withdraw Request",
          "Status",
          "Bank Account Name",
          "Bank Account No.",
          "Bank Branch",
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
    const withdrawRequestColumnIndex = 10;
    const statusColumnIndex = 11;

    for (let R = rowStartIndex; R <= rows.length; ++R) {
      const withdrawCellAddress = XLSX.utils.encode_cell({
        r: R,
        c: withdrawRequestColumnIndex,
      });

      if (worksheet[withdrawCellAddress]) {
        const withdrawValue = worksheet[withdrawCellAddress].v;
        // Conditionally set the style based on the withdraw request value
        const withdrawRequestStyle = {
          font: {
            color: { rgb: withdrawValue === "Request" ? "1d6f42" : "FF0000" },
            bold: true,
          }, // Green for "Request", Red otherwise
          alignment: { horizontal: "center", vertical: "center" },
        };

        worksheet[withdrawCellAddress].s = withdrawRequestStyle; // Apply the conditional style
      }

      const statusCellAddress = XLSX.utils.encode_cell({
        r: R,
        c: statusColumnIndex,
      });

      if (worksheet[statusCellAddress]) {
        const statusValue = worksheet[statusCellAddress].v;
        // Conditionally set the style based on the payment status value
        const statusStyle = {
          font: {
            color: { rgb: statusValue === "Paid" ? "1d6f42" : "FF0000" },
            bold: true,
          }, // Green for "Paid", Red for "Unpaid"
          alignment: { horizontal: "center", vertical: "center" },
        };

        worksheet[statusCellAddress].s = statusStyle; // Apply the conditional style
      }
    }

    // Column widths (dynamic or fixed)
    const columnWidths = [
      { wch: 15 },
      { wch: Math.max(...rows.map((r) => (r.projectName || "").length), 20) },
      { wch: Math.max(...rows.map((r) => (r.investmentId || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.InvestorName || "").length), 15) },
      { wch: 12 },
      { wch: Math.max(...rows.map((r) => (r.manageUserId || "").length), 20) },
      { wch: 12 },
      { wch: 12 },
      { wch: Math.max(...rows.map((r) => (r.returnType || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.profitMonth || "").length), 25) },
      { wch: 20 },
      { wch: Math.max(...rows.map((r) => (r.Status || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.bankName || "").length), 20) },
      { wch: Math.max(...rows.map((r) => (r.accountNumber || "").length), 20) },
      { wch: Math.max(...rows.map((r) => (r.bankBranch || "").length), 15) },
    ];

    worksheet["!cols"] = columnWidths;

    // Write the Excel file and download it
    XLSX.writeFile(workbook, "Profits.xlsx", { compression: true });
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

export default ExportProfitToExcel;
