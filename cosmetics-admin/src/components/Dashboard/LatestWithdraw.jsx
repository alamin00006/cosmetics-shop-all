"use client";
import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { formatDate } from "@/utils/dateConvert";
import Link from "next/link";
import { useGetProfitsQuery } from "@/redux/api/profitApi";

import { authKey } from "@/constants/storageKey";
import { USER_ROLE } from "@/constants/role";
import { useGetUserQuery } from "@/redux/api/authApi";
import { getFromLocalStorage } from "@/utils/local-storage";

const WithdrawTable = () => {
  const authToken = getFromLocalStorage(authKey);
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery({ token: authToken });

  // Profit Params
  const params = {
    prManagerId:
      userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
    companyId: userData?.company?._id ? userData?.company?._id : "",
    withdrawRQ: "Yes",
  };

  const {
    data: profitCounts,
    error: profitError,
    isLoading: profitIsLoading,
  } = useGetProfitsQuery({ ...params });

  const allProfits = profitCounts?.profits;

  const [requestWithdraw, setRequestWithdraw] = useState([]);

  useEffect(() => {
    const findRequestWithdraw = allProfits?.filter(
      (profit) => profit?.paymentStatus !== "Paid"
    );
    setRequestWithdraw(findRequestWithdraw);
  }, [allProfits]);

  return (
    <div className="mx-3">
      <div className="flex flex-wrap items-start justify-between rounded-t-lg border-b border-dotted border-black/20 bg-[#8E44AD] p-4">
        <div className="text-lg font-semibold text-white">Withdraw Request</div>
        <div className="text-sm font-semibold text-white">
          <span>Last Update: </span>
          <span>
            {allProfits?.[0]?.createdAt
              ? formatDate(allProfits[0]?.createdAt)
              : ""}
          </span>
        </div>
        <div>
          <Link href="/profit-counts">
            <span className="text-sm font-semibold text-white">See More</span>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Date</th>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Investor</th>
              <th>Inv. Amount</th>
              <th>PR Manager</th>
              <th>Profit Ratio</th>
              <th>Profit Count</th>
              <th>Return Type</th>
              <th>Profit Month</th>
              <th>Withdraw RQ</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {requestWithdraw?.map((profit) => (
              <tr key={profit?._id}>
                <td>{formatDate(profit?.createdAt)}</td>
                <td>{profit.project?.projectTitle}</td>
                <td>{profit.project?.projectType?.name}</td>
                <td>{profit.userId?.name}</td>
                <td>
                  Tk {profit?.investmentId?.investmentAmount.toLocaleString()}
                </td>
                {profit?.project?.PRManagers ? (
                  profit?.project?.PRManagers?.map((manager) => (
                    <td key={manager?.id}>{manager?.name}</td>
                  ))
                ) : (
                  <td>------</td>
                )}
                <td>{profit.percentageOfProfit}%</td>
                <td className="font-bold">
                  Tk {profit.profitCount?.toLocaleString()}
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
                      <span>{profit?.profitGiveMonths}</span>
                      <span>({profit?.profitGiveYear})</span>
                    </>
                  )}
                </td>
                <td>
                  <span
                    className={`badge text-white ${
                      profit?.withdrawRQ === "Yes"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {profit?.withdrawRQ === "Yes" ? "Request" : "No request"}
                  </span>
                </td>
                <td>
                  <span
                    className={`font-bold ${
                      profit.paymentStatus === "Paid"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {profit.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "Poppins",
          },
        }}
      />
    </div>
  );
};

export default WithdrawTable;
