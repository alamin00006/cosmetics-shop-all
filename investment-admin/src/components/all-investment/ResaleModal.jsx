import { INVESTMENT_STATUS } from "@/constants/investmentStatus";
import { authKey } from "@/constants/storageKey";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Filters from "../filters/Filters";

const ResaleModal = ({ show, setShow, investment, refetch, userData }) => {
  const handleClose = () => setShow(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = e.target?.note?.value;

    if (status === investment?.status) {
      return toast.error(`Sorry, Already ${investment?.status}`);
    }

    if (
      status === INVESTMENT_STATUS.APPROVED &&
      !investment?.payment?.[0]?.proofOfPaymentPhoto?.length > 0
    ) {
      return toast.error("Sorry, Payment Proof Missing");
    }

    const updatedStatus = {
      status: status,
      // projectId: investment?.project?._id,
      userId: investment?.userId?._id,
      note: note,
      statusUpdatedDate: new Date(),
      lastStatusUpdatedBy: userData?._id,
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
        `${getBaseUrl()}/investment/${investment?.id}`,
        updatedStatus,
        { headers }
      );
      toast.success("Status updated successfully!");
      refetch();
      setTimeout(() => {
        handleClose();
      }, 500);
    } catch (err) {
      // console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      {show && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              Resale This Investment{" "}
              <span className="text-sm">
                (Investor : {investment?.userId?.name})
              </span>
            </h3>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="form-control">
                <label
                  htmlFor="search"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Search User
                </label>

                <Filters
                  setSearchQuery={setSearchQuery}
                  setTags={setTags}
                  tags={tags}
                  searchName="Search user"
                />
              </div>

              {/* Conditionally render input fields if needed */}
              {(status === INVESTMENT_STATUS.APPROVED ||
                status === INVESTMENT_STATUS.CANCELED) && (
                <div className="mt-4">
                  <label className="label">
                    <span className="label-text">Note</span>
                  </label>
                  <textarea
                    name="note"
                    rows={2}
                    className="textarea textarea-bordered w-full"
                    placeholder="Note"
                    required
                  />
                </div>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleClose}
                >
                  Cancel
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

export default ResaleModal;
