import { authKey } from "@/constants/storageKey";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DeleteInvestmentModal = ({ show, setShow, investment, refetch }) => {
  const handleClose = () => setShow(false);
  const [status, setStatus] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    const note = e.target?.note?.value;

    if (status === investment?.status) {
      return toast.error(`Sorry, Already ${investment?.status}`);
    }

    // if (
    //   status === "Received" &&
    //   !investment?.payment?.[0]?.proofOfPaymentPhoto?.length > 0
    // ) {
    //   return toast.error("Sorry, Payment Proof Missing");
    // }

    const updatedStatus = {
      status: status,
      projectId: investment?.project?._id,
      userId: investment?.userId?._id,
    };

    try {
      // Get the access token
      const accessToken = getFromLocalStorage(authKey);
      // Set the headers
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };
      await axios.patch(
        `${getBaseUrl()}/investment/delete/${investment?.id}`,
        updatedStatus,
        { headers }
      );
      toast.success(`${status} successfully!`);
      refetch();
      setTimeout(() => {
        handleClose();
      }, 500);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      {show && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-base font-bold">
              Are You Sure Delete or Hide?{" "}
              <span className="text-sm">
                (Investor : {investment?.userId?.name})
              </span>
            </h3>
            <form onSubmit={handleDelete} className="mt-4">
              <div className="form-control">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="hide">Hide</option>
                  <option value="delete">Delete</option>
                </select>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Delete/Hide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteInvestmentModal;
