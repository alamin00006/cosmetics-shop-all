import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import Image from "next/image";
import { useEffect } from "react";

const SeeWaitingListDetails = ({ waitingList, onClose }) => {
  useEffect(() => {
    // Lock the background scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Restore on close
    };
  }, []);

  if (!waitingList) {
    return (
      <div className="text-center text-gray-500">No details available</div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal Content */}
      <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto md:p-8 overflow-auto md:max-h-[90%] md:overflow-visible">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Waiting List Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full md:col-span-1">
            <label className="block text-sm font-medium text-gray-600">
              Project Image:
            </label>
            {waitingList.project.projectPicture?.length > 0 ? (
              <Image
                src={waitingList.project.projectPicture[0]}
                alt="Project Picture"
                width={120}
                height={120}
                className="rounded-md shadow-md mt-2"
              />
            ) : (
              <div className="text-gray-500 mt-2">No Image Available</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Company Name:
            </label>
            <div className="p-3 mt-2 bg-white  rounded-md shadow-sm">
              {waitingList.company.name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Project Title:
            </label>
            <div className="p-3 mt-2 bg-white  rounded-md shadow-sm">
              {waitingList.project.projectTitle}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Total Project Value:
            </label>
            <div className="p-3 mt-2 bg-white  rounded-md shadow-sm">
              {`Tk ${waitingList.project.totalProjectValue?.toLocaleString()}`}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Per Share Value:
            </label>
            <div className="p-3 mt-2 bg-white  rounded-md shadow-sm">
              {`Tk ${waitingList.project.perShareValue?.toLocaleString()}`}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Total Share Value:
            </label>
            <div className="p-3 mt-2 bg-white  rounded-md shadow-sm">
              {`${waitingList.project.totalShareValue?.toLocaleString()}`}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              User Name:
            </label>
            <div className="p-3 mt-2 bg-white  rounded-md shadow-sm">
              {waitingList.user.name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone Number:
            </label>
            <div className="p-3 mt-2 bg-white rounded-md shadow-sm">
              {waitingList.user.phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeWaitingListDetails;
