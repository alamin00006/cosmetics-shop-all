import { useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { FaRegEdit, FaWhatsapp } from "react-icons/fa";

import { afterOneYear } from "@/utils/afterOneYear";
import { afterSixMonth } from "@/utils/afterSixMonth";
import { formatDate, formattedTime } from "@/utils/dateConvert";
import SeeInvestDetails from "./SeeInvestDetails";
import UpdateStatus from "./UpdateStatus";
import Link from "next/link";
import { formatBDT } from "@/utils/formateBDT";
import DeleteInvestmentModal from "./DeleteInvestmentModal";
import { USER_ROLE } from "@/constants/role";
import { INVESTMENT_STATUS } from "@/constants/investmentStatus";
import ResaleModal from "./ResaleModal";

const AllInvestmentTable = ({
  investments,
  refetch,

  userData,
}) => {
  // Status Modal
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleShowStatusModal = (investment) => {
    setSelectedInvestment(investment);
    setShowStatusModal(true);
  };

  // Details Modal

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const handleShowDetailsModal = (investment) => {
    setSelectedInvestment(investment);
    setShowDetailsModal(true);
  };
  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = (investment) => {
    setSelectedInvestment(investment);
    setShowDeleteModal(true);
  };
  const [showResaleModal, setShowResaleModal] = useState(false);
  const handleShowResaleModal = (investment) => {
    setSelectedInvestment(investment);
    setShowResaleModal(true);
  };

  return (
    <>
      <div className="relative">
        <div
          id="table-container"
          className="overflow-x-auto"
          style={{ display: "flex" }}
        >
          <table className="table-bordered table w-full">
            <thead>
              <tr className="text-sm">
                {/* <th>No.</th> */}
                <th>Inv.Id</th>

                <th>Investor</th>
                {/* <th>Investment Date</th> */}

                <th>Contact No.</th>
                <th>Project Title</th>
                {/* <th>Project Type</th> */}
                <th>PR M.</th>
                {/* <th>Pay Method</th> */}
                <th>Inv. Amount</th>
                <th>Share</th>
                <th>Return Type</th>
                <th>Profit Share Date</th>
                {/* <th>Duration of Inv.</th> */}
                <th>Profit Ratio</th>
                <th>Profit Details</th>
                <th>Status</th>
                <th>Details</th>
                <th>Resale</th>
                {userData?.role === USER_ROLE.COMPANY && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {investments?.map((investment, index) => (
                <tr key={investment._id} className="text-sm ">
                  {/* <td className="uppercase">{index + 1}</td> */}
                  <td className="uppercase">#{investment?.id}</td>
                  <td>{investment?.userId?.name}</td>
                  {/* <td>
                    <p>{formatDate(investment?.createdAt)}</p>
                    <p>{formattedTime(investment?.createdAt)}</p>
                  </td> */}
                  <td>
                    {investment?.userId?.phoneNumber}
                    <Link
                      href={`https://api.whatsapp.com/send?phone=88${investment?.userId?.phoneNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="relative flex items-center justify-center px-3 py-1 text-[#0ec043] text-sm rounded-md animate-pulse">
                        <FaWhatsapp className="w-6 h-6" />
                        {/* Animated pulse effect */}
                        <span className="absolute flex h-3 w-3 top-0 right-0">
                          <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                      </button>
                    </Link>
                  </td>
                  <td>{investment.project?.projectTitle}</td>

                  <td className="font-bold">
                    {investment?.project?.PRManagersDetails?.[0]?.name}
                  </td>
                  {/* <td>{investment.paymentMethod}</td> */}
                  <td className="w-40 font-bold">
                    Tk {formatBDT(investment?.investmentAmount)}
                  </td>
                  <td className="w-30 font-bold">
                    {investment?.totalBuyShare?.toLocaleString()} Share
                  </td>
                  <td>{investment.returnType}</td>
                  <td className="text-red-600 w-32 font-bold">
                    {investment?.returnType === "Yearly"
                      ? formatDate(afterOneYear(investment?.firstReturnDate))
                      : investment?.returnType === "Monthly"
                      ? formatDate(investment?.firstReturnDate)
                      : formatDate(afterSixMonth(investment?.firstReturnDate))}
                  </td>
                  {/* <td>
                    {investment.project?.projectType === "Co-ownership" ? (
                      <div className="text-center font-bold">
                        <span>-</span>
                      </div>
                    ) : (
                      <p className="text-center">
                        {investment.durationOfInvest} Year
                      </p>
                    )}
                  </td> */}
                  <td>Upto {investment?.percentOfReturn}%</td>
                  <td className="w-48 font-bold">
                    P.Count: Tk{" "}
                    {investment.totalProfitAmount
                      ? formatBDT(investment.totalProfitAmount)
                      : 0}
                    <br />
                    <span className="text-green-600">
                      Paid : Tk{" "}
                      {investment.totalPaidProfitAmount
                        ? formatBDT(investment.totalPaidProfitAmount)
                        : 0}
                    </span>
                    <br />
                    <span className="text-red-600">
                      Due : Tk{" "}
                      {investment.totalDueProfitAmount
                        ? formatBDT(investment.totalDueProfitAmount)
                        : 0}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-bold ${
                          investment.status !== INVESTMENT_STATUS.APPROVED
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {investment.status}
                      </p>

                      <button
                        className={`btn btn-sm ${
                          investment.status !== INVESTMENT_STATUS.APPROVED
                            ? "bg-green-500 text-white"
                            : "btn-disabled"
                        }`}
                        onClick={() => handleShowStatusModal(investment)}
                        disabled={
                          investment.status === INVESTMENT_STATUS.APPROVED ||
                          investment.status === INVESTMENT_STATUS.CANCELED
                        }
                      >
                        <FaRegEdit />
                      </button>
                    </div>
                    <p>
                      {investment?.status === INVESTMENT_STATUS.APPROVED &&
                        !investment?.payment?.[0]?.proofOfPaymentPhoto?.length >
                          0 && (
                          <p className="text-rose-500 font-bold">
                            Payment proof missing
                          </p>
                        )}
                    </p>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-light btn btn-sm"
                      onClick={() => handleShowDetailsModal(investment)}
                    >
                      <AiOutlineEye className="h-6 w-6" />
                    </button>
                  </td>
                  <td>
                    <Link
                      href={`resale-investment/${investment?.project?._id}/${investment?._id}`}
                    >
                      <button
                        type="button"
                        className="btn-light btn btn-sm"
                        // onClick={() => handleShowResaleModal(investment)}
                      >
                        <AiOutlineEye className="h-6 w-6" />
                      </button>
                    </Link>
                  </td>

                  {userData?.role === USER_ROLE.COMPANY && (
                    <td>
                      <button
                        type="button"
                        onClick={() => handleShowDeleteModal(investment)}
                        className="btn-light btn btn-sm hover:bg-rose-500 hover:text-white"
                        disabled={investment?.status !== "Canceled"}
                      >
                        <AiOutlineDelete size={25} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modals */}
      {showDetailsModal && (
        <SeeInvestDetails
          show={showDetailsModal}
          setShow={setShowDetailsModal}
          investment={selectedInvestment}
        />
      )}

      {showStatusModal && (
        <UpdateStatus
          show={showStatusModal}
          setShow={setShowStatusModal}
          investment={selectedInvestment}
          refetch={refetch}
          userData={userData}
        />
      )}
      {showDeleteModal && (
        <DeleteInvestmentModal
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          investment={selectedInvestment}
          refetch={refetch}
        />
      )}
      {showResaleModal && (
        <ResaleModal
          show={showResaleModal}
          setShow={setShowResaleModal}
          investment={selectedInvestment}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default AllInvestmentTable;
