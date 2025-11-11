import { getBaseUrl } from "@/helpers/config/envConfig";
// import { useUpdateReturnMutation } from "@/redux/api/returnApi";
import axios from "axios";

import { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

const UpdateReturnStatus = ({
  showStatusModal,
  setShowStatusModal,
  returnData,
  refetch,
}) => {
  const handleClose = () => setShowStatusModal(false);
  const [status, setStatus] = useState("");
  // const [updateReturn, { isLoading: isUpdating, error: updateError }] =
  //   useUpdateReturnMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === returnData?.status) {
      return toast.error(`Sorry Already ${returnData?.status}`);
    }

    const updatedStatus = {
      acceptableStatus: status,
    };

    try {
      await axios.patch(
        `${getBaseUrl()}/return/${returnData?._id}`,
        updatedStatus
      );

      // await updateReturn({
      //   returnId: returnData?._id,
      //   body: { ...updatedStatus },
      // });

      toast.success(status);
      refetch();

      setTimeout(() => {
        handleClose();
      }, 500);
    } catch (err) {
      return toast.error("Something Error Found");
    }
  };

  return (
    <>
      {showStatusModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Return Status Update</h3>
              <button
                className="btn btn-circle btn-ghost btn-sm"
                onClick={handleClose}
              >
                <MdClose size={15} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <select
                value={status}
                className="select select-bordered mb-3 w-full"
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Approved</option>
              </select>

              <p className=" mt-3">
                <span className="font-bold text-warning">Warning:</span> You
                {`can't`} change anything after <b>Approving</b> this Status.
              </p>

              <div className="mt-5 flex justify-end">
                <button type="submit" className="btn btn-success text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateReturnStatus;
