import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const ReceivePayment = ({ showModal, setShowModal, investment, mutate }) => {
  const handleCloseModal = () => setShowModal(false);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [investmentStartDate, setInvestmentStartDate] = useState(new Date());
  const [investmentEndDate, setInvestmentEndDate] = useState(new Date());
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bankName = e.target.bankName?.value;
    const accountHolderName = e.target.accountHolderName?.value;
    const accountNumber = e.target.accountNumber?.value;
    const receiveAmount = Number(e.target.receiveAmount?.value);
    const transferMode = e.target.transferMode?.value;
    const noteForPayment = e.target.noteForPayment?.value;
    const receiverName = e.target.receiverName?.value;

    const paymentData = {
      userId: investment?.userId,
      investId: investment?._id,
      bankName,
      accountHolderName,
      accountNumber,
      receiveAmount,
      totalInvestAmount: investment?.totalInvestAmount,
      transferMode,
      paymentMethod: selectedPaymentMethod,
      paymentDate,
      investmentStartDate,
      investmentEndDate,
      noteForPayment,
      receiverName,
    };

    try {
      await axios.patch(
        `${getBaseUrl()}/investment/${investment?._id}`,
        paymentData
      );
      toast.success("Deposit Success");
      setTimeout(() => {
        handleCloseModal();
      }, 500);
      mutate();
    } catch (err) {
      return toast.error("Something Error Found.");
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Deposit</h3>
              <button
                className="btn btn-circle btn-ghost btn-sm"
                onClick={handleCloseModal}
              >
                x
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <div className="form-control">
                <label className="label">Deposit Date</label>
                <DatePicker
                  selected={paymentDate}
                  onChange={(date) => setPaymentDate(date)}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">Deposit Method</label>
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="select select-bordered"
                  required
                >
                  <option value="" disabled>
                    Select Deposit Method
                  </option>
                  <option>Cash</option>
                  <option>Check</option>
                  <option>Card</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">Received Amount</label>
                <input
                  type="number"
                  name="receiveAmount"
                  placeholder="Enter Received Amount"
                  className="input input-bordered"
                  required
                  onWheel={(e) => e.target.blur()}
                />
              </div>

              <div className="form-control">
                <label className="label">Inv. Start Date</label>
                <DatePicker
                  selected={investmentStartDate}
                  onChange={(date) => setInvestmentStartDate(date)}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">Inv. End Date</label>
                <DatePicker
                  selected={investmentEndDate}
                  onChange={(date) => setInvestmentEndDate(date)}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">Receiver Name</label>
                <input
                  type="text"
                  name="receiverName"
                  placeholder="Enter Receiver Name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control col-span-2">
                <label className="label">Note (Optional)</label>
                <input
                  type="text"
                  name="noteForPayment"
                  placeholder="Enter Note"
                  className="input input-bordered h-24"
                />
              </div>

              <div className="form-control col-span-2">
                <button
                  type="submit"
                  className={`btn btn-success w-full ${
                    loading ? "loading" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReceivePayment;
