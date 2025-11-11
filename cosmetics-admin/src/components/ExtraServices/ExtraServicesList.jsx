"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { useGetAllExtraServicesQuery } from "@/redux/api/serviceApi";

const ExtraServicesList = () => {
  const {
    data = [],
    error: extraServiceGetError,
    isLoading,
  } = useGetAllExtraServicesQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const extraServicesPerPage = 10;

  // Pagination logic
  const indexOfLastExtraService = currentPage * extraServicesPerPage;
  const indexOfFirstExtraService =
    indexOfLastExtraService - extraServicesPerPage;
  const currentExtraServices = data.slice(
    indexOfFirstExtraService,
    indexOfLastExtraService
  );
  const totalPages = Math.ceil(data.length / extraServicesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };

  useEffect(() => {
    if (extraServiceGetError) {
      toast.error("Failed to fetch Extra Services. Please try again later.");
    }
  }, [extraServiceGetError]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-left text-sm">
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Service Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y">
            {currentExtraServices.map((extraService, index) => (
              <tr key={extraService._id} className="hover:bg-gray-50">
                <td className="text-gray-800 px-4 py-2">
                  {index + 1 + (currentPage - 1) * extraServicesPerPage}
                </td>
                <td className="text-gray-800 px-4 py-2">{extraService.name}</td>
                <td className="text-gray-800 px-4 py-2">
                  {extraService.email}
                </td>
                <td className="text-gray-800 px-4 py-2">
                  {extraService.contactNumber}
                </td>
                <td className="text-gray-800 px-4 py-2">
                  {extraService.serviceType.map((service, idx) => (
                    <div key={idx}>
                      {service.service} ({service.typeOfWork})
                    </div>
                  ))}
                </td>
                <td className="text-gray-800 px-4 py-2">
                  {extraService.status}
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

      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default ExtraServicesList;
