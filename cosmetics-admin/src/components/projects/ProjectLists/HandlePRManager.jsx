"use client";
import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const HandlePRManager = ({
  showPRModal,
  setShowPRModal,
  projectData,
  allUser,
  refetch,
}) => {
  const handleClose = () => setShowPRModal(false);
  const [updateType, setUpdateType] = useState("ADD_PRManger");
  const [prManager, setPrManager] = useState("");

  const handlePRManager = async () => {
    const updatedStatus = {
      updateType: updateType,
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
      console.log(err);
      return toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      {showPRModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">PR Manager Update</h3>
            <div className="custom_form_data">
              <div className="flex gap-5 mt-5">
                <input
                  type="radio"
                  id="add"
                  name="radio-7"
                  className="radio radio-info"
                  defaultChecked
                  value="ADD_PRManger"
                  onChange={(e) => setUpdateType(e.target.value)}
                />
                <label htmlFor="add">Add PR Manager</label>

                <input
                  type="radio"
                  id="remove"
                  name="radio-7"
                  value="REMOVE_PRManger"
                  className="radio radio-info"
                  onChange={(e) => setUpdateType(e.target.value)}
                />
                <label htmlFor="remove">Remove PR Manager</label>
              </div>
              {updateType === "ADD_PRManger" ? (
                <div className="form-control mt-4">
                  <label className="label" htmlFor="prManager">
                    PR Manager
                  </label>
                  <select
                    id="prManager"
                    value={prManager}
                    onChange={(e) => setPrManager(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Select PR Manager
                    </option>
                    {allUser?.map((pr) => (
                      <option key={pr?._id} value={pr?.PRManager?._id}>
                        {pr?.PRManager?.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  {projectData.PRManagerDetails?.map((manager) => (
                    <div className="overflow-hidden mt-3" key={manager?.id}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="w-48">{manager?.name}</td>
                            <td onClick={() => setPrManager(manager?._id)}>
                              <button
                                onClick={handlePRManager}
                                className="bg-primary text-white p-2 rounded"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleClose}
                >
                  Close
                </button>
                {updateType === "ADD_PRManger" && (
                  <button onClick={handlePRManager} className="btn btn-primary">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HandlePRManager;
