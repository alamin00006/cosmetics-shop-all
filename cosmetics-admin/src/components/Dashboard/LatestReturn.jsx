"use client";
import { useState } from "react";

import { Toaster } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

import { formatDate } from "@/utils/dateConvert";
import UpdateReturnStatus from "../ReturnHistory/UpdateReturnStatus";
import { useGetReturnsQuery } from "@/redux/api/returnApi";
import { authKey } from "@/constants/storageKey";
import { useGetUserQuery } from "@/redux/api/authApi";
import { getFromLocalStorage } from "@/utils/local-storage";
import { USER_ROLE } from "@/constants/role";
import { PROJECT_TYPE } from "@/constants/projectType";

const Return = () => {
  const authToken = getFromLocalStorage(authKey);
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery({ token: authToken });

  const params = {
    prManagerId:
      userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
    companyId: userData?.company?._id ? userData?.company?._id : "",
  };

  const {
    data: returnsData,
    error: returnsError,
    isLoading: returnsErrorIsLoading,
    refetch,
  } = useGetReturnsQuery({ ...params });

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const handleShowModal = (returnData) => {
    setSelectedReturn(returnData);
    setShowStatusModal(true);
  };

  return (
    <div className="mx-3">
      <div className="flex flex-wrap items-start justify-between rounded-t-lg border-b border-dotted border-black/20 bg-[#EB6753] p-4">
        <div className="font-poppins text-lg font-semibold leading-5 text-white">
          Return
        </div>
        <div className="font-poppins text-sm font-semibold leading-5 text-white">
          <span>Last Update: </span>
          <span>
            {returnsData?.returnsData?.[0]?.createdAt
              ? formatDate(returnsData?.returnsData[0]?.createdAt)
              : ""}
          </span>
        </div>
        <div>
          <Link href="/return-history">
            <span className="font-poppins text-sm font-semibold leading-5 text-white">
              See More
            </span>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Submit Date</th>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Investor</th>
              <th>Inv. Amount</th>
              <th>PR Manager</th>
              <th>Profit Ratio</th>
              <th>Profit Count</th>
              <th>Return Type</th>
              <th>Month</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {returnsData?.returnsData?.map((returnData) => (
              <tr key={returnData?._id}>
                <td>{formatDate(returnData?.createdAt)}</td>
                <td>{returnData.project?.projectTitle}</td>
                <td>{returnData.project?.projectType?.name}</td>
                <td>{returnData?.totalInvestor} Person</td>
                <td>Tk {returnData?.totalInvestAmount?.toLocaleString()}</td>

                {returnData?.project?.PRManagers ? (
                  returnData?.project?.PRManagers?.map((manager) => (
                    <td key={manager?.id}>{manager?.name}</td>
                  ))
                ) : (
                  <td>------</td>
                )}

                {returnData.project?.projectType?.name ===
                PROJECT_TYPE.MURABAHA ? (
                  <td>-------</td>
                ) : (
                  <td>{returnData.percentageOfProfit}%</td>
                )}

                <td>Tk {returnData.totalProfitCount?.toLocaleString()}</td>
                <td>{returnData.returnType}</td>
                <td>
                  {returnData?.returnType !== "Monthly" ? (
                    <div>
                      <p>{`${formatDate(
                        returnData.fromReturnCountDate
                      )} to`}</p>
                      <p>{formatDate(returnData.toReturnCountDate)}</p>
                    </div>
                  ) : (
                    <>
                      <span>{returnData?.returnMonths} </span>
                      <span>{returnData.returnYear}</span>
                    </>
                  )}
                </td>
                <td>
                  <span
                    className={`font-bold ${
                      returnData.acceptableStatus === "Approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {returnData.acceptableStatus}
                  </span>
                  <button
                    className="ml-2"
                    disabled={returnData.acceptableStatus === "Approved"}
                    onClick={() => handleShowModal(returnData)}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      cursor:
                        returnData.acceptableStatus === "Approved"
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {userData?.role === "company" && <FaRegEdit />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Status Update Modal */}
      {selectedReturn && (
        <UpdateReturnStatus
          returnData={selectedReturn}
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          refetch={refetch}
        />
      )}
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

export default Return;
