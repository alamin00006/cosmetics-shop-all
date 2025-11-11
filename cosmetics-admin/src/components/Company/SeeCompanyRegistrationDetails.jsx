const SeeCompanyRegistrationDetails = ({
  data,
  setShowDetailsModal,
  showDetailsModal,
}) => {
  const handleClose = () => {
    setShowDetailsModal(false);
  };

  if (!showDetailsModal) return null;

  // Extract the details from data
  const {
    name,
    companyOwnerName,
    email,
    companyOwnerPhoneNumber,
    registrationDate,
    status,
  } = data || {};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md relative z-10 p-6">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
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
        <h2 className="text-2xl font-semibold text-gray-800 pb-1">
          Company Registration Details
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Company Name:</span>
            <span className="text-gray-900">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Owner Name:</span>
            <span className="text-gray-900">{companyOwnerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Owner Email:</span>
            <span className="text-gray-900">{email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Phone Number:</span>
            <span className="text-gray-900">{companyOwnerPhoneNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">
              Registration Date:
            </span>
            <span className="text-gray-900">
              {new Date(registrationDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Status:</span>
            <span
              className={`font-bold px-2 py-1 rounded ${
                status === "Approved"
                  ? "bg-green-500 text-white"
                  : status === "Pending"
                  ? "bg-rose-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeCompanyRegistrationDetails;
