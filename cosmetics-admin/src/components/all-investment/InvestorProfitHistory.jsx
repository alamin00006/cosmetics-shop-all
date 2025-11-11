import { formatDate } from "@/utils/dateConvert";
import { formatBDT } from "@/utils/formateBDT";

const InvestorProfitHistory = ({ items }) => {
  return (
    <div className="mt-4 gap-4 border border-[#d1d5db] p-4">
      <h2 className="text-lg font-bold">Product Detail Summary</h2>
      {/* Wrapper for horizontal scrolling */}
      <div className="overflow-x-auto">
        <table className="w-full mt-2 text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th>Project Name</th>
              <th>Inv.Name</th>
              <th>Profit Ratio</th>
              <th>Profit Count</th>
              <th>Return Type</th>
              <th>Profit Month</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((profit) => (
              <tr key={profit?._id} className="border-gray-200 border-b">
                <td>{formatDate(profit?.createdAt)}</td>
                <td className="uppercase">#{profit?.investmentId?.id}</td>
                <td>{profit?.project?.projectTitle}</td>
                <td>{profit?.userId?.name}</td>

                {/* <td>{profit?.manageUserId?.name}</td> */}

                <td>{profit?.percentageOfProfit}%</td>
                <td className="px-4 py-2 font-bold">
                  Tk {formatBDT(profit?.profitCount)}
                </td>
                <td>{profit?.returnType}</td>
                <td>
                  {profit?.returnType !== "Monthly" ? (
                    <div>
                      <p>{`${formatDate(profit?.fromProfitCountDate)} to`}</p>
                      <p>{formatDate(profit?.toProfitCountDate)}</p>
                    </div>
                  ) : (
                    <>
                      <span>{profit?.profitGiveMonths} </span>
                      <span>({profit?.profitGiveYear})</span>
                    </>
                  )}
                </td>

                <td>
                  <span
                    className={`font-bold ${
                      profit?.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-rose-600"
                    }`}
                  >
                    {profit?.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorProfitHistory;
