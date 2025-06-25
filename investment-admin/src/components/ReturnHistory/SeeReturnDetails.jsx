import { formatDate } from "@/utils/dateConvert";
import React from "react";
import { MdClose } from "react-icons/md";

const SeeReturnDetails = ({ data, setShowDetailsModal, showDetailsModal }) => {
  const handleClose = () => {
    setShowDetailsModal(false);
  };

  if (!showDetailsModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal modal-open">
        <div className="modal-box relative">
          <button
            onClick={handleClose}
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            <MdClose size={15} />
          </button>
          <h2 className="text-lg font-semibold">Profit Details</h2>
          <div className="bg-gray-100 mt-4 rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block font-medium">PR Name</label>
                {data?.project?.PRManagers?.map((manager) => (
                  <p key={manager?.id}>{manager?.name}</p>
                ))}
              </div>

              <div>
                <label className="mb-1 block font-medium">Project Name</label>
                <p className="font-bold">{data?.project?.projectTitle}</p>
              </div>

              <div>
                <label className="mb-1 block font-medium">Profit Count</label>
                <p className="font-bold">
                  Tk {data?.totalProfitCount?.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="mb-1 block font-medium">
                  {data?.returnType} Investor
                </label>
                <p className="font-bold">{data?.totalInvestor} Person</p>
              </div>
              <div>
                <label className="mb-1 block font-medium">
                  Total Investment Amount
                </label>
                <p className="font-bold">
                  Tk {data?.totalInvestAmount?.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="mb-1 block font-medium">Return Type</label>
                <p className="font-bold">{data?.returnType}</p>
              </div>
              {data?.returnType !== "Monthly" && (
                <>
                  <div>
                    <label className="mb-1 block font-medium">
                      From Date of Profit Count
                    </label>
                    <p className="font-bold">
                      {formatDate(data?.fromReturnCountDate)}
                    </p>
                  </div>
                  <div>
                    <label className="mb-1 block font-medium">
                      To Date of Profit Count
                    </label>
                    <p className="font-bold">
                      {formatDate(data?.toReturnCountDate)}
                    </p>
                  </div>
                </>
              )}

              <div>
                <label className="mb-1 block font-medium">
                  Percentage of Profit
                </label>
                <p className="font-bold">{data?.percentageOfProfit}%</p>
              </div>

              <div>
                <label className="mb-1 block font-medium">Status</label>
                <p
                  className={`font-bold ${
                    data?.acceptableStatus === "Approved"
                      ? "text-green-600"
                      : "text-rose-600"
                  }`}
                >
                  {data?.acceptableStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeReturnDetails;
