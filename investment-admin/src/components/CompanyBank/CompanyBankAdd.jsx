"use client";

import { USER_ROLE } from "@/constants/role";
import { authKey } from "@/constants/storageKey";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { useGetUserQuery } from "@/redux/api/authApi";
import { useGetProjectsByCompanyOrPRQuery } from "@/redux/api/projectsApi";
import { getFromLocalStorage } from "@/utils/local-storage";
// import { useGetUserQuery } from "@/redux/api/authApi";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaList } from "react-icons/fa";

const CompanyBankAdd = () => {
  const [forProject, setForProject] = useState("");

  // Get login user
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  // Get Projects
  const params = {
    companyId:
      userData?.role === USER_ROLE.COMPANY ? userData?.company?._id : "",
    id: userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
  };

  const {
    data: projects,
    error,
    isLoading,
    refetch,
  } = useGetProjectsByCompanyOrPRQuery({ ...params });

  const handleAddBankAccount = async (e) => {
    e.preventDefault();

    const bankName = e.target.bankName.value;
    const accountHolderName = e.target.accountHolderName.value;
    const accountNumber = e.target.accountNumber.value;
    const accountType = e.target.accountType.value;
    const branchName = e.target.branchName.value;
    const routingNumber = e.target.routingNumber.value;

    const bankAccountData = {
      bankName,
      accountHolderName,
      accountNumber,
      accountType,
      branchName,
      routingNumber,
      company: userData?.company?._id,
      project: forProject ? forProject : null,
    };

    try {
      // Get the access token
      const accessToken = getFromLocalStorage(authKey);
      // Set the headers
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };
      const { data } = await axios.post(
        `${getBaseUrl()}/company-bank`,
        bankAccountData,
        { headers }
      );

      toast.success(data?.message);
      e.target.reset();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-center text-2xl font-semibold text-green-700 mb-5">
        Add Bank Account
      </h2>

      <div className="flex justify-end">
        <Link
          href="/company-bank"
          className="flex items-center font-medium text-teal-500 hover:text-teal-700"
        >
          <FaList className="mr-2" />
          Bank List
        </Link>
      </div>
      <form onSubmit={handleAddBankAccount}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Bank Name</label>
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Account Holder Name</label>
            <input
              type="text"
              name="accountHolderName"
              placeholder="Account Holder Name"
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Account Type</label>
            <input
              type="text"
              name="accountType"
              placeholder="Account Type"
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Branch Name</label>
            <input
              type="text"
              name="branchName"
              placeholder="Branch Name"
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Routing Number</label>
            <input
              type="text"
              name="routingNumber"
              placeholder="Routing Number"
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>

          <div>
            <label className="text-gray-700 mb-2 block font-semibold">
              Assign For Project
            </label>
            <select
              className="text-gray-700 border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-200"
              value={forProject}
              onChange={(e) => setForProject(e.target.value)}
              style={{
                borderColor: "#dddddd",
                outlineColor: "#00c196",
                outlineWidth: "2px",
              }}
            >
              <option value="" disabled>
                Select Project
              </option>
              {projects?.projects?.map((project) => (
                <option key={project?._id} value={project?._id}>
                  {project?.projectTitle}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 px-4 shadow hover:bg-green-400 transition duration-300"
          >
            Confirm
          </button>
        </div>
      </form>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default CompanyBankAdd;
