import { getBaseUrl } from "@/helpers/config/envConfig";
// import { useUpdateReturnMutation } from "@/redux/api/returnApi";
import { months } from "@/utils/months";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

const UpdateReturnData = ({
  showReturnUpdateModal,
  setShowReturnUpdateModal,
  selectReturnForUpdate,
  refetch,
}) => {
  const fromDate = useRef(null);
  const toDate = useRef(null);
  const handleCloseModal = () => setShowReturnUpdateModal(false);
  const date = new Date();
  const year = date.getFullYear();

  // const [updateReturn, { isLoading: isUpdating, error: updateError }] =
  //   useUpdateReturnMutation();

  const [percentageOfProfit, setPercentageOfProfit] = useState(
    selectReturnForUpdate?.percentageOfProfit
  );
  const [selectedMonth, setSelectedMonth] = useState(
    selectReturnForUpdate?.returnMonths
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteForReturn = e.target.noteForReturn?.value;
    const newReturnsData = {
      project: selectReturnForUpdate?.project?._id,
      manageUserId: selectReturnForUpdate?.manageUserId?._id,
      company: selectReturnForUpdate?.company?._id,
      percentageOfProfit,
      returnType: selectReturnForUpdate?.returnType,
      returnMonths: selectedMonth,
      returnYear: year,
      noteForReturn,
    };

    try {
      // Call the updateProfit mutation with the data

      await axios.patch(
        `${getBaseUrl()}/return/${selectReturnForUpdate?._id}`,
        newReturnsData
      );

      // await updateReturn({
      //   returnId: selectReturnForUpdate?._id,
      //   body: { ...newReturnsData },
      // });

      // If the response contains data, show success
      toast.success("Profit updated successfully");
      refetch();
      setTimeout(() => {
        handleCloseModal();
      }, 500);
    } catch (err) {
      // Catch any other errors
      // console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };

  if (!showReturnUpdateModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal modal-open">
        <div className="modal-box relative">
          <button
            onClick={handleCloseModal}
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            <MdClose size={15} />
          </button>
          <h2 className="text-lg font-semibold">Income Submit Update</h2>
          <form onSubmit={handleSubmit} className="mt-4 ">
            <div>
              <label htmlFor="returnType" className="my-2 block font-medium">
                Return Type
              </label>
              <select
                required
                className="select select-bordered w-full"
                defaultValue={selectReturnForUpdate?.returnType}
                disabled
              >
                <option>{selectReturnForUpdate?.returnType}</option>
              </select>
            </div>

            {selectReturnForUpdate?.returnType === "Monthly" && (
              <div>
                <label
                  htmlFor="returnMonths"
                  className="my-2 block font-medium"
                >
                  Month
                </label>
                <select
                  defaultValue={selectReturnForUpdate?.returnMonths}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  required
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>
                    Select a month
                  </option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectReturnForUpdate?.returnType !== "Monthly" && (
              <>
                <div className="form-control">
                  <label htmlFor="fromDate" className="block font-medium mb-2">
                    From Date
                  </label>
                  <input
                    id="fromDate"
                    type="date"
                    ref={fromDate}
                    name="fromReturnCountDate"
                    // defaultValue={selectReturnForUpdate?.fromReturnCountDate}
                    placeholder="Profit Percentage"
                    className="input input-bordered mt-1 w-full"
                    required
                    onClick={() => fromDate.current?.showPicker()}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="toDate" className="block font-medium mb-2">
                    To Date
                  </label>
                  <input
                    id="toDate"
                    type="date"
                    ref={toDate}
                    name="toReturnCountDate"
                    // defaultValue={selectReturnForUpdate?.toReturnCountDate}
                    className="input input-bordered mt-1 w-full"
                    required
                    onClick={() => toDate.current?.showPicker()}
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="profit" className="my-2 block font-medium">
                Profit Ratio {selectReturnForUpdate?.monthlyReturnValue}%
              </label>
              <input
                id="profit"
                type="number"
                step="any"
                required
                onChange={(e) => setPercentageOfProfit(e.target.value)}
                onWheel={(e) => e.target.blur()}
                placeholder="Profit Percentage"
                defaultValue={selectReturnForUpdate?.percentageOfProfit}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label htmlFor="noteForReturn" className="my-2 block font-medium">
                Note (Optional)
              </label>
              <input
                type="text"
                placeholder="Note"
                name="noteForReturn"
                className="input input-bordered w-full"
                style={{ height: "60px" }}
              />
            </div>

            <div className="col-span-2 mt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReturnData;
