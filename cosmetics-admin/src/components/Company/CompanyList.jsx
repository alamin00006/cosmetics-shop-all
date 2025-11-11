"use client";
import React, { useEffect, useState } from "react";

import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

// import { useGetAllCompaniesQuery } from "@/redux/api/companyAuthApi";
import { useGetAllUsersQuery } from "@/redux/api/authApi";
import { USER_ROLE } from "@/constants/role";

const CompanyLists = () => {
  const userParams = {
    role: USER_ROLE.COMPANY,
  };

  const {
    data,
    error: companyGetError,
    isLoading,
  } = useGetAllUsersQuery(userParams);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;

  // Pagination logic
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = data?.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(data?.length / companiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };

  if (companyGetError) {
    toast.error("Failed to fetch companies. Please try again later.");
    // console.error("Error fetching companies:", error);
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end">
        <Link href="/manage-company">
          <button className="rounded-md bg-teal-500 px-4 py-2 text-white shadow-md hover:bg-teal-600">
            Add New Company
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-left text-sm">
              <th>No</th>
              <th>Company Name</th>
              <th>Owner Name</th>
              <th>Owner Email</th>
              <th>Phone Number</th>
              <th>Business Address</th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y">
            {currentCompanies?.map((company, index) => (
              <tr key={company?._id} className="hover:bg-gray-50">
                <td className="text-gray-800 px-4 py-2">{index + 1}</td>
                <td className="text-gray-800 px-4 py-2">
                  {company?.company?.name}
                </td>
                <td className="text-gray-800 px-4 py-2">
                  {company?.company?.companyOwnerName}
                </td>
                <td className="text-gray-800 px-4 py-2">{company?.email}</td>
                <td className="text-gray-800 px-4 py-2">
                  {company?.company?.companyOwnerPhoneNumber}
                </td>
                <td className="text-gray-800 px-4 py-2">
                  {company?.company?.businessAddress}
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

export default CompanyLists;
