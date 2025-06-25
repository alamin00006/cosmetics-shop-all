"use client";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import ProfitStatusUpdate from "./ProfitStatusUpdate";
import SeeProfitDetails from "./SeeProfitDetails";
import ProfitFilter from "./ProfitFilter";
import { formatDate } from "@/utils/dateConvert";
import { useGetProjectsByCompanyOrPRQuery } from "@/redux/api/projectsApi";
import { useGetProfitsQuery } from "@/redux/api/profitApi";
import { useGetUserQuery } from "@/redux/api/authApi";
import { USER_ROLE } from "@/constants/role";
import ExportProfitToExcel from "./ExportProfitToExcel";
import Pagination from "../shared/Pagination";
import { useSelector } from "react-redux";

const ProfitCountsHistory = () => {
  const [projectId, setProjectId] = useState("");
  const [profitShareType, setProfitShareType] = useState("");
  const [withdrawRQ, setWithdrawRQ] = useState("");
  const { page, size } = useSelector((state) => state.pagination);
  // Project Params

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  // Project Params
  const projectParams = {
    companyId: userData?.company?._id ? userData?.company?._id : "",
    id: userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
  };

  const {
    data: projects,
    error: projectGetError,
    isLoading,
  } = useGetProjectsByCompanyOrPRQuery({ ...projectParams });

  // Profit Params
  const params = {
    prManagerId:
      userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
    companyId: userData?.company?._id ? userData?.company?._id : "",
    project: projectId,
    returnType: profitShareType,
    withdrawRQ: withdrawRQ,
    page: page,
    pageSize: size,
  };
  const {
    data: profitCounts,
    error: profitError,
    isLoading: profitIsLoading,
    refetch,
  } = useGetProfitsQuery({ ...params });

  // Status Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedProfit, setSelectedProfit] = useState(null);
  const handleShowStatusModal = (profitData) => {
    setSelectedProfit(profitData);
    setShowStatusModal(true);
  };

  // Details Modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProfitDetails, setSelectProfitDetails] = useState(null);

  const handleDetailsModal = (profitData) => {
    setSelectProfitDetails(profitData);
    setShowDetailsModal(true);
  };

  const totalCounts = profitCounts?.totalCount;

  return (
    <div className="">
      <h2 className="mb-5 font-bold">Withdraw</h2>
      <ProfitFilter
        setProfitShareType={setProfitShareType}
        projectId={projectId}
        setProjectId={setProjectId}
        projects={projects?.projects}
        profitShareType={profitShareType}
        setWithdrawRQ={setWithdrawRQ}
        withdrawRQ={withdrawRQ}
      />
      <div className="flex justify-end mb-5">
        <ExportProfitToExcel profits={profitCounts?.profits} />
      </div>
      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm">
              <th>Date</th>
              <th>Inv.Id</th>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Inv.Name</th>
              <th>Inv.Amount</th>
              <th>PR Manager</th>
              <th>Profit Ratio</th>
              <th>Profit Count</th>
              <th>Return Type</th>
              <th>Profit Month</th>
              <th>Withdraw RQ</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {profitCounts?.profits?.map((profit) => (
              <tr key={profit?._id} className="border-gray-200 border-b">
                <td>{formatDate(profit?.createdAt)}</td>
                <td className="uppercase">#{profit.investmentId?.id}</td>

                <td>{profit.project?.projectTitle}</td>
                <td>{profit.project?.projectType?.name}</td>
                <td>{profit.userId?.name}</td>
                <td>
                  Tk {profit?.investmentId?.investmentAmount.toLocaleString()}
                </td>

                {profit?.project?.PRManagers?.map((manager) => (
                  <td key={manager?.id}>{manager?.name}</td>
                ))}
                <td>{profit.percentageOfProfit}%</td>
                <td className="px-4 py-2 font-bold">
                  Tk {profit.profitCount?.toLocaleString()}
                </td>
                <td>{profit.returnType}</td>
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
                <td className="px-4 py-2 text-center">
                  <p
                    className={`rounded px-2 py-1 font-bold ${
                      profit?.withdrawRQ === "Yes"
                        ? "bg-green-600 text-white"
                        : "bg-rose-500 text-white"
                    }`}
                  >
                    {profit?.withdrawRQ === "Yes" ? "Request" : "No request"}
                  </p>
                </td>
                <td>
                  <span
                    className={`font-bold ${
                      profit.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-rose-600"
                    }`}
                  >
                    {profit.paymentStatus}
                  </span>
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    onClick={() => handleShowStatusModal(profit)}
                    disabled={
                      profit.paymentStatus === "Paid" ||
                      profit?.withdrawRQ === "No"
                    }
                  >
                    {userData?.role !== USER_ROLE.SUPER_ADMIN && (
                      <FaRegEdit className="h-5 w-5" />
                    )}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn-light bg-gradient btn border-0"
                    onClick={() => handleDetailsModal(profit)}
                  >
                    <AiOutlineEye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination totalDataCount={totalCounts || 10} />

      {/* Status Update Modal */}
      {selectedProfit && (
        <ProfitStatusUpdate
          profitData={selectedProfit}
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          refetch={refetch}
        />
      )}

      {/* Details Modal */}
      {selectedProfitDetails && (
        <SeeProfitDetails
          data={selectedProfitDetails}
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProfitCountsHistory;
