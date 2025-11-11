import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const UpdateRegistrationStatus = ({
  showStatusModal,
  setShowStatusModal,
  registrationData,
  refetch,
}) => {
  const [status, setStatus] = useState("");

  const handleClose = () => setShowStatusModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === registrationData?.status) {
      return toast.error(`Status is already ${registrationData?.status}`);
    }

    const updatedStatus = {
      status: status,
    };

    try {
      await axios.patch(
        `${getBaseUrl()}/company/company-form/${registrationData?._id}`,
        updatedStatus
      );

      toast.success(`Status updated to ${status}`);
      refetch();
      setTimeout(() => handleClose(), 500);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {showStatusModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleClose}
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={handleClose}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Update Registration Status
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1 "
                >
                  Select Status
                </label>
                <select
                  id="status"
                  value={status}
                  className="block w-full mt-1 border-gray-600 rounded-md shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Update Status
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateRegistrationStatus;
