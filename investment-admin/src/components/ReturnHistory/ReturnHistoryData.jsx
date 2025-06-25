"use client";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
// import { getAllReturns } from "@/dataFetching/return";
import SeeReturnDetails from "./SeeReturnDetails";
import UpdateReturnStatus from "./UpdateReturnStatus";
import UpdateReturnData from "./UpdateReturnData";
import DeleteModal from "./DeleteModal";
import ReturnFilter from "./ReturnFilter";
import { formatDate } from "@/utils/dateConvert";

import { authKey } from "@/constants/storageKey";
import { useGetProjectsByCompanyOrPRQuery } from "@/redux/api/projectsApi";
import { useGetReturnsQuery } from "@/redux/api/returnApi";
import { useGetUserQuery } from "@/redux/api/authApi";
import { getFromLocalStorage } from "@/utils/local-storage";
import { USER_ROLE } from "@/constants/role";
import Pagination from "../shared/Pagination";
import { useSelector } from "react-redux";

const ReturnHistoryData = () => {
  const { page, size } = useSelector((state) => state.pagination);

  const [projectId, setProjectId] = useState("");
  const [profitShareType, setProfitShareType] = useState("");

  const authToken = getFromLocalStorage(authKey);
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery({ token: authToken });

  // Return Params
  const params = {
    prManagerId:
      userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
    companyId: userData?.company?._id ? userData?.company?._id : "",
    project: projectId,
    returnType: profitShareType,
    page: page,
    pageSize: size,
  };

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

  //  Get Returns
  const {
    data: returnsData,
    error: returnsError,
    isLoading: returnsErrorIsLoading,
    refetch,
  } = useGetReturnsQuery({ ...params });

  // Status Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const handleShowModal = (returnData) => {
    setSelectedReturn(returnData);
    setShowStatusModal(true);
  };

  // Details Modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReturnDetails, setSelectReturnDetails] = useState(null);

  const handleDetailsModal = (returnData) => {
    setSelectReturnDetails(returnData);
    setShowDetailsModal(true);
  };

  // Return Update Modal
  const [showReturnUpdateModal, setShowReturnUpdateModal] = useState(false);
  const [selectReturnForUpdate, setSelectReturnForUpdate] = useState(null);

  const handleReturnShowUpdateModal = (returnData) => {
    setSelectReturnForUpdate(returnData);
    setShowReturnUpdateModal(true);
  };

  // Delete Modal
  const [showReturnDelete, setShowReturnDelete] = useState(false);
  const [selectReturnForDelete, setSelectReturnForDelete] = useState(null);

  const handleReturnDeleteModal = (returnData) => {
    setSelectReturnForDelete(returnData);
    setShowReturnDelete(true);
  };

  const totalCounts = returnsData?.totalCount;

  return (
    <div className="mx-3">
      <ReturnFilter
        setProfitShareType={setProfitShareType}
        projectId={projectId}
        setProjectId={setProjectId}
        projects={projects?.projects}
        profitShareType={profitShareType}
      />
      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>Submit Date</th>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>PR Manager</th>
              <th>Total Investor</th>
              <th>Inv. Amount</th>
              <th>Profit Ratio</th>
              <th>Profit Count</th>
              <th>Return Type</th>
              <th>Return Month</th>
              <th>Details</th>
              <th>Status</th>
              {userData?.role === USER_ROLE.COMPANY && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {returnsData?.returnsData?.map((returnData, index) => (
              <tr key={returnData?._id}>
                <td>{formatDate(returnData?.createdAt)}</td>
                <td>{returnData.project?.projectTitle}</td>
                <td>{returnData.project?.projectType?.name}</td>
                {returnData?.project?.PRManagers?.map((manager) => (
                  <td key={manager?.id}>{manager?.name}</td>
                ))}
                <td>
                  <span className="font-bold"> {returnData.returnType}</span>:{" "}
                  {returnData?.totalInvestor} Investor
                </td>
                <td>Tk {returnData?.totalInvestAmount?.toLocaleString()}</td>
                {returnData.percentageOfProfit > 0 ? (
                  <td>{returnData.percentageOfProfit}%</td>
                ) : (
                  <td>
                    <p>----------</p>
                  </td>
                )}
                <td> Tk {returnData.totalProfitCount?.toLocaleString()}</td>
                <td>{returnData?.returnType}</td>
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
                      <span>{returnData?.returnMonths}</span>
                      <span>{returnData.returnYear}</span>
                    </>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn-light bg-gradient btn border-0"
                    onClick={() => handleDetailsModal(returnData)}
                  >
                    <AiOutlineEye style={{ width: "20px", height: "20px" }} />
                  </button>
                </td>
                <td>
                  <span
                    className={`font-bold px-2 py-1 rounded ${
                      returnData.acceptableStatus === "Approved"
                        ? "bg-green-500 text-white"
                        : "bg-rose-500 text-white"
                    }`}
                  >
                    {returnData.acceptableStatus}
                  </span>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                    disabled={
                      returnData.acceptableStatus === "Approved" ? true : false
                    }
                  >
                    {userData?.role === USER_ROLE.COMPANY && (
                      <FaRegEdit
                        onClick={() => handleShowModal(returnData)}
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    )}
                  </button>
                </td>
                {userData?.role === USER_ROLE.COMPANY && (
                  <td className="flex space-x-2">
                    <button
                      disabled={
                        returnData.acceptableStatus === "Approved"
                          ? true
                          : false
                      }
                      onClick={() => handleReturnShowUpdateModal(returnData)}
                      className="btn btn-sm bg-[#00c194] text-white hover:bg-[#00c194d2]"
                    >
                      Update
                    </button>
                    <button
                      disabled={
                        returnData.acceptableStatus === "Approved"
                          ? true
                          : false
                      }
                      onClick={() => handleReturnDeleteModal(returnData)}
                      className="btn-danger btn btn-sm"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination totalDataCount={totalCounts || 10} />

      {/* Status Update Modal */}
      {selectedReturn && (
        <UpdateReturnStatus
          returnData={selectedReturn}
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          refetch={refetch}
        />
      )}
      {/* Details Modal */}
      {selectedReturnDetails && (
        <SeeReturnDetails
          data={selectedReturnDetails}
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}

      {/* Return Update Modal */}
      {selectReturnForUpdate && (
        <UpdateReturnData
          showReturnUpdateModal={showReturnUpdateModal}
          setShowReturnUpdateModal={setShowReturnUpdateModal}
          selectReturnForUpdate={selectReturnForUpdate}
          refetch={refetch}
        />
      )}
      {/* Return Delete Modal */}
      {selectReturnForDelete && (
        <DeleteModal
          showReturnDelete={showReturnDelete}
          setSelectReturnForDelete={setSelectReturnForDelete}
          returnData={selectReturnForDelete}
          refetch={refetch}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ReturnHistoryData;
