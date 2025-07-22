import { useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

import SeeInvestDetails from "./SeeInvestDetails";
import UpdateStatus from "./UpdateStatus";

import { formatBDT } from "@/utils/formateBDT";
import DeleteInvestmentModal from "./DeleteInvestmentModal";

import { INVESTMENT_STATUS } from "@/constants/investmentStatus";

const AllInvestmentTable = ({ orders, refetch, userData }) => {
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
                <th>Order.Id</th>

                <th>Customer Name</th>
                {/* <th>Investment Date</th> */}

                <th>Contact No.</th>
                <th>Product Title</th>
                {/* <th>Project Type</th> */}

                {/* <th>Pay Method</th> */}
                <th>Quantity</th>
                <th>Total Amount</th>

                <th>Status</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr key={order._id} className="text-sm ">
                  {/* <td className="uppercase">{index + 1}</td> */}
                  <td className="uppercase">#{order?._id?.slice(15)}</td>
                  <td>{order?.user?.name}</td>
                  {/* <td>
                    <p>{formatDate(investment?.createdAt)}</p>
                    <p>{formattedTime(investment?.createdAt)}</p>
                  </td> */}
                  <td>{order?.user?.phoneNumber}</td>
                  <td>{order?.orderItems?.[0]?.product?.name}</td>
                  {/* <td>{investment.paymentMethod}</td> */}

                  <td className="w-30 font-bold">
                    {order?.orderItems?.[0]?.cartQuantity}
                  </td>
                  <td className="w-40 font-bold">
                    Tk {formatBDT(order?.orderItems?.[0]?.singleCartTotal)}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-bold ${
                          order.orderStatus !== INVESTMENT_STATUS.APPROVED
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {order.orderStatus}
                      </p>

                      <button
                        className={`btn btn-sm ${
                          order.orderStatus !== INVESTMENT_STATUS.APPROVED
                            ? "bg-green-500 text-white"
                            : "btn-disabled"
                        }`}
                        onClick={() => handleShowStatusModal(order)}
                        disabled={
                          order.orderStatus === INVESTMENT_STATUS.APPROVED ||
                          order.orderStatus === INVESTMENT_STATUS.CANCELED
                        }
                      >
                        <FaRegEdit />
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-light btn btn-sm"
                      onClick={() => handleShowDetailsModal(order)}
                    >
                      <AiOutlineEye className="h-6 w-6" />
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleShowDeleteModal(order)}
                      className="btn-light btn btn-sm hover:bg-rose-500 hover:text-white"
                      disabled={order?.status !== "Canceled"}
                    >
                      <AiOutlineDelete size={25} />
                    </button>
                  </td>
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
          order={selectedInvestment}
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
    </>
  );
};

export default AllInvestmentTable;
