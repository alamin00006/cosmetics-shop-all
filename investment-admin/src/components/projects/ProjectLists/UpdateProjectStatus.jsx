"use client";
import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const UpdateProjectStatus = ({
  showStatusModal,
  setShowStatusModal,
  projectData,
  allUser,
  refetch,
}) => {
  const handleClose = () => setShowStatusModal(false);
  const [status, setStatus] = useState("");
  const [prManager, setPrManager] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === projectData?.status) {
      return toast.error(`Sorry Already ${projectData?.status}`);
    }

    const updatedStatus = {
      status: status,
      prManager: prManager,
    };

    try {
      const { data } = await axios.patch(
        `${getBaseUrl()}/project/${projectData?._id}`,
        updatedStatus
      );
      toast.success(data?.message);
      refetch();
      setTimeout(() => {
        handleClose();
      }, 500);
    } catch (err) {
      // console.log(err);
      return toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      {showStatusModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Project Status Update</h3>
            <form onSubmit={handleSubmit} className="custom_form_data">
              <div className="form-control">
                <label className="label" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option>Pending</option>
                  <option>On-Going</option>
                  <option>Canceled</option>
                  <option>Upcoming</option>
                </select>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
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

export default UpdateProjectStatus;
