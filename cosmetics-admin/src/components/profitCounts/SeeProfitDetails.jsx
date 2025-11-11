import { MdClose } from "react-icons/md";

const SeeProfitDetails = ({ data, setShowDetailsModal, showDetailsModal }) => {
  const handleClose = () => {
    setShowDetailsModal(false);
  };

  return (
    <>
      {showDetailsModal && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="text-lg font-bold">Profit Count Details</h3>

            <button
              onClick={handleClose}
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              <MdClose size={15} />
            </button>
            <div className="bg-gray-100 p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block font-medium">Investment ID</label>
                  <p className="font-bold uppercase">
                    #{data?.investmentId?.id}
                  </p>
                </div>
                <div>
                  <label className="block font-medium">Investor Name</label>
                  <p className="font-bold">{data?.userId?.name}</p>
                </div>
                <div>
                  <label className="block font-medium">PR Name</label>
                  {data?.project?.PRManagers?.map((manager) => (
                    <p key={manager?.id}>{manager?.name}</p>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="mb-2 text-lg font-semibold">Profit Summary</h4>
                <hr className="mb-2 text-slate-300		" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block font-medium">Profit Ratio</label>
                    <p className="font-bold">{data?.percentageOfProfit}%</p>
                  </div>
                  <div>
                    <label className="block font-medium">Profit Count</label>
                    <p className="font-bold">
                      Tk {data?.profitCount?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="block font-medium">
                      Investment Amount
                    </label>
                    <p className="font-bold">
                      Tk{" "}
                      {data?.investmentId?.investmentAmount?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="block font-medium">Return Type</label>
                    <p className="font-bold">{data?.returnType}</p>
                  </div>
                  <div>
                    <label className="block font-medium">Status</label>
                    <p
                      className={`font-bold ${
                        data?.paymentStatus === "Paid"
                          ? "text-green-600"
                          : "text-rose-600"
                      }`}
                    >
                      {data?.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="mb-2 text-lg font-semibold">
                  Bank Account Details
                </h4>
                <hr className="mb-2 text-slate-300" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block font-medium">Account Name</label>
                    <p className="font-bold">
                      {data?.userBankAccount?.bankName}
                    </p>
                  </div>
                  <div>
                    <label className="block font-medium">Account Number</label>
                    <p className="font-bold">
                      {data?.userBankAccount?.accountNumber}
                    </p>
                  </div>
                  <div>
                    <label className="block font-medium">Branch Name</label>
                    <p className="font-bold">
                      {data?.userBankAccount?.branchName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop"></div>
        </div>
      )}
    </>
  );
};

export default SeeProfitDetails;
