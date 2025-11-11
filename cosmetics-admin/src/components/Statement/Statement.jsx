"use client";
import { BlobProvider } from "@react-pdf/renderer";
import Image from "next/image";
import DownloadStatement from "../Statement/DownloadStatement";
import { useGetSingleInvestmentByUserORInvestIdQuery } from "@/redux/api/investmentApi";
import { useGetProfitsByUserIdQuery } from "@/redux/api/profitApi";
import { formatDate } from "@/utils/dateConvert";
import Invoice from "./DownloadInvoice";

const Statement = ({ params }) => {
  const investmentParams = {
    investmentId: params?.id,
  };

  const {
    data: investment,
    error: investmentError,
    isLoading: investmentIsLoading,
  } = useGetSingleInvestmentByUserORInvestIdQuery(investmentParams);

  const {
    data: profits,
    error,
    isLoading,
  } = useGetProfitsByUserIdQuery(params?.id);

  if (investmentIsLoading) return <p>Loading...</p>;
  if (investmentError) return <p>Error loading investment data.</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-8 relative ">
      {/* Watermark */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none ">
        <p className="text-9xl font-bold text-gray-400 rotate-[-45deg]">
          e-Statement
        </p>
      </div>

      <div
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-[#d1d5db]"
        style={{ height: "297mm" }}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#d1d5db] pb-4">
            <div>
              <Image
                src="/images/logo/Rtemis.png"
                alt="Sharikana Logo"
                width={150}
                height={40}
              />
              <p className="text-gray-500 text-sm ms-[40px] -mt-10">
                www.rtemisbd.com
              </p>
            </div>
            <div className="text-right">
              {/* <p className="text-sm text-gray-700">
                Issue Date: {formatDate(new Date())}
              </p> */}
              <p className="text-sm text-gray-700">
                PR Name: {investment?.project?.PRManagersDetails?.[0]?.name}
              </p>
              <p className="text-sm text-gray-700">
                PR Mobile:{" "}
                {investment?.project?.PRManagersDetails?.[0]?.phoneNumber}
              </p>
            </div>
          </div>

          {/* Personal Details */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">Personal Details</h2>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <p>
                <span className="font-semibold">Investor Name:</span>{" "}
                {investment?.userId?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">NID Number:</span>{" "}
                {investment?.userId?.personalDetails?.nidOrPassportNo || "N/A"}
              </p>
              <p>
                <span className="font-semibold ">Investor ID:</span> #
                <span className="uppercase"> {investment?.id || "N/A"}</span>
              </p>
              <p>
                <span className="font-semibold">Mobile:</span>{" "}
                {investment?.userId?.phoneNumber || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {investment?.userId?.email || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {investment?.userId?.address?.addressLine1 || "N/A"}
              </p>
            </div>
          </div>

          {/* Investment Details */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">Investment Details</h2>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <p>
                <span className="font-semibold">Investment Date:</span>{" "}
                {formatDate(investment?.createdAt) || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Project Name:</span>{" "}
                {investment?.project?.projectTitle || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Project Type:</span>{" "}
                {investment?.project?.projectType?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold"> Amount of Investment:</span>{" "}
                BDT {investment?.investmentAmount?.toLocaleString() || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Number of Share:</span>{" "}
                {investment?.totalBuyShare || "N/A"} Share
              </p>
              {investment?.durationOfInvest ? (
                <p>
                  <span className="font-semibold">
                    {" "}
                    Duration of Investment :
                  </span>{" "}
                  {investment?.durationOfInvest || "N/A"} Years
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Profit Disbursement Summary */}
          <div className="mt-10">
            <h2 className="text-lg font-bold">Profit Disburse Summary</h2>
            <table className="w-full mt-5 text-sm border-t border-b border-gray-300 border-dashed">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border-t border-b border-gray-300 border-dashed">
                    Date
                  </th>

                  <th className="p-2 border-t border-b border-gray-300 border-dashed">
                    Profit Ratio
                  </th>
                  <th className="p-2 border-t border-b border-gray-300 border-dashed">
                    Profit Count
                  </th>
                  <th className="p-2 border-t border-b border-gray-300 border-dashed">
                    Return Type
                  </th>
                  <th className="p-2 border-t border-b border-gray-300 border-dashed">
                    Profit Month
                  </th>
                  <th className="p-2 border-t border-b border-gray-300 border-dashed">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {profits?.map((profit) => (
                  <tr key={profit?._id}>
                    <td className="p-2 border-t border-b border-gray-300 border-dashed">
                      {formatDate(profit?.createdAt)}
                    </td>

                    {/* <td className="p-2 border-t border-b border-gray-300 border-dashed">
                      Tk{" "}
                      {profit?.investmentId?.investmentAmount?.toLocaleString() ||
                        "N/A"}
                    </td> */}
                    <td className="p-2 border-t border-b border-gray-300 border-dashed">
                      {profit?.percentageOfProfit || "N/A"}%
                    </td>
                    <td className="p-2 border-t border-b border-gray-300 border-dashed">
                      Tk {profit?.profitCount?.toLocaleString() || "N/A"}
                    </td>
                    <td className="p-2 border-t border-b border-gray-300 border-dashed">
                      {profit?.returnType || "N/A"}
                    </td>
                    <td className="p-2 border-t border-b border-gray-300 border-dashed">
                      {profit?.returnType !== "Monthly" ? (
                        <>
                          <p>{`${formatDate(
                            profit?.fromProfitCountDate
                          )} to`}</p>
                          <p>{formatDate(profit?.toProfitCountDate)}</p>
                        </>
                      ) : (
                        <>
                          <span>{profit?.profitGiveMonths || "N/A"} </span>
                          <span>({profit?.profitGiveYear || "N/A"})</span>
                        </>
                      )}
                    </td>
                    <td className="p-2 border-t border-b border-gray-300 border-dashed">
                      <span
                        className={`font-bold ${
                          profit?.paymentStatus === "Paid"
                            ? "text-green-600"
                            : "text-rose-600"
                        }`}
                      >
                        {profit?.paymentStatus || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Totals at the Bottom */}
          <div className="mt-2 text-right text-sm">
            <p>
              <span className="font-semibold">Total Profit Count:</span> BDT{" "}
              {investment?.totalProfitAmount?.toLocaleString() || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Total Paid Amount:</span> BDT{" "}
              {investment?.totalPaidProfitAmount?.toLocaleString() || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Total Due Amount:</span> BDT{" "}
              {investment?.totalDueProfitAmount?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center gap-3 items-center mt-2">
        <BlobProvider
          document={
            <DownloadStatement investment={investment} profits={profits} />
          }
        >
          {({ url }) => (
            <a
              href={url}
              download={`${investment?.userId?.name}_profit.pdf`}
              className="px-3 py-3 mt-5 rounded text-white font-medium bg-green-600 hover:bg-green-500"
            >
              Download Statement
            </a>
          )}
        </BlobProvider>
      </div>
      <div className="flex justify-center gap-3 items-center mt-2">
        <BlobProvider document={<Invoice investment={investment} />}>
          {({ url }) => (
            <a
              href={url}
              download={`${investment?.userId?.name}_invoice.pdf`}
              className="px-3 py-3 mt-5 rounded text-white font-medium bg-green-600 hover:bg-green-500"
            >
              Download Invoice
            </a>
          )}
        </BlobProvider>
      </div>
    </div>
  );
};

export default Statement;
