"use client";

import { USER_ROLE } from "@/constants/role";
import { authKey } from "@/constants/storageKey";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { useGetUserQuery } from "@/redux/api/authApi";
import { useGetBankAccountByUserIdQuery } from "@/redux/api/userBankApi";

import { getFromLocalStorage } from "@/utils/local-storage";

import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const UserBankUpdate = ({ params }) => {
  // Get login user
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  const query = {
    bankId: params.id,
  };
  const {
    data: userBankAccount,
    error: bankError,
    isLoading: bankIsLoading,
    refetch,
  } = useGetBankAccountByUserIdQuery(query);

  const handleUpdateBankAccount = async (e) => {
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
        `${getBaseUrl()}/bank-account/${userBankAccount?._id}`,
        bankAccountData,
        {
          headers,
        }
      );

      toast.success("Updated");
      e.target.reset();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-center text-2xl font-semibold text-green-700 mb-5">
        Update Bank Account (User)
      </h2>

      <form onSubmit={handleUpdateBankAccount}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Bank Name</label>
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              defaultValue={userBankAccount?.bankName}
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Account Holder Name</label>
            <input
              type="text"
              name="accountHolderName"
              placeholder="Account Holder Name"
              defaultValue={userBankAccount?.accountHolderName}
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              defaultValue={userBankAccount?.accountNumber}
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Account Type</label>
            <input
              type="text"
              name="accountType"
              placeholder="Account Type"
              defaultValue={userBankAccount?.accountType}
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Branch Name</label>
            <input
              type="text"
              name="branchName"
              placeholder="Branch Name"
              defaultValue={userBankAccount?.branchName}
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1">Routing Number</label>
            <input
              type="text"
              name="routingNumber"
              placeholder="Routing Number"
              defaultValue={userBankAccount?.routingNumber}
              className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 px-4 shadow hover:bg-green-400 transition duration-300"
          >
            Update
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

export default UserBankUpdate;
