"use client";
import { useGetAllCompaniesFormQuery } from "@/redux/api/companyAuthApi";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import SeeCompanyRegistrationDetails from "./SeeCompanyRegistrationDetails";
import UpdateRegistrationStatus from "./UpdateRegistrationStatus";
import { FaRegEdit } from "react-icons/fa";
import { USER_ROLE } from "@/constants/role";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useGetUserQuery } from "@/redux/api/authApi";
import { authKey } from "@/constants/storageKey";

const CompanyRegistration = () => {
  // Details Modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRegistrationDetails, setSelectRegistrationDetails] =
    useState(null);

  const handleDetailsModal = (company) => {
    setSelectRegistrationDetails(company);
    setShowDetailsModal(true);
  };

  // Status Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const handleShowModal = (registrationData) => {
    // console.log(registrationData);
    setSelectedRegistration(registrationData);
    setShowStatusModal(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Get User Data
  const authToken = getFromLocalStorage(authKey);
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery({ token: authToken });

  const {
    data: companiesForm,
    error: companyGetError,
    isLoading,
    refetch,
  } = useGetAllCompaniesFormQuery();

  if (isLoading) return <p>Loading...</p>;
  if (companyGetError) return <p>Error: {companyGetError.message}</p>;

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = companiesForm?.totalPages || 1;

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end"></div>

      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-left text-sm">
              <th>No</th>
              <th>Company Name</th>
              <th>Owner Name</th>
              <th>Owner Email</th>
              <th>Phone Number</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y">
            {companiesForm?.map((company, index) => (
              <tr key={company._id} className="hover:bg-gray-50">
                <td className="text-gray-800 px-4 py-2">{index + 1}</td>
                <td className="text-gray-800 px-4 py-2">{company.name}</td>
                <td className="text-gray-800 px-4 py-2">
                  {company.companyOwnerName}
                </td>
                <td className="text-gray-800 px-4 py-2">{company.email}</td>
                <td className="text-gray-800 px-4 py-2">
                  {company.companyOwnerPhoneNumber}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn-light bg-gradient btn border-0"
                    onClick={() => handleDetailsModal(company)} // Pass company data here
                  >
                    <AiOutlineEye style={{ width: "20px", height: "20px" }} />
                  </button>
                </td>
                <td>
                  <span className={`font-bold px-2 py-1 rounded`}>
                    {company.status}
                  </span>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    {userData?.role === USER_ROLE.SUPER_ADMIN && (
                      <FaRegEdit
                        onClick={() => handleShowModal(company)}
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <nav>
          <ul className="flex items-center space-x-2">
            <li>
              <button
                className="text-gray-600 hover:bg-gray-200 rounded-md border px-3 py-1"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                &laquo; First
              </button>
            </li>
            <li>
              <button
                className="text-gray-600 hover:bg-gray-200 rounded-md border px-3 py-1"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lsaquo; Prev
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  className={`rounded-md border px-3 py-1 ${
                    index + 1 === currentPage
                      ? "bg-teal-500 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="text-gray-600 hover:bg-gray-200 rounded-md border px-3 py-1"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next &rsaquo;
              </button>
            </li>
            <li>
              <button
                className="text-gray-600 hover:bg-gray-200 rounded-md border px-3 py-1"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Status Update Modal */}
      {selectedRegistration && (
        <UpdateRegistrationStatus
          registrationData={selectedRegistration}
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          refetch={refetch}
        />
      )}
      {selectedRegistrationDetails && (
        <SeeCompanyRegistrationDetails
          data={selectedRegistrationDetails}
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}

      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default CompanyRegistration;
