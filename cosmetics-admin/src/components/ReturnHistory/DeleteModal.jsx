import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";

import toast from "react-hot-toast";

const DeleteModal = ({
  showReturnDelete,
  setSelectReturnForDelete,
  returnData,
  refetch,
}) => {
  const handleClose = () => setSelectReturnForDelete(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${getBaseUrl()}/return/${returnData?._id}`);
      toast.success("Deleted");

      refetch();
      setTimeout(() => {
        handleClose();
      }, 500);
    } catch (err) {
      // console.log(err);
      toast.error("Something Error Found.", "warning");
    }
  };

  if (!showReturnDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal modal-open">
        <div className="modal-box relative">
          <button
            onClick={handleClose}
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            x
          </button>
          <h2 className="text-lg font-semibold">Return Delete</h2>
          <p className="mt-4">Are you sure you want to delete?</p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={handleClose} className="btn btn-error">
              Cancel
            </button>
            <button onClick={handleDelete} className="btn btn-primary">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
