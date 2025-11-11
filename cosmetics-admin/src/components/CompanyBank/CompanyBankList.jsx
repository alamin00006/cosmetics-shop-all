"use client";
import { useGetUserQuery } from "@/redux/api/authApi";
import { useGetCompanyBankByCompanyIdQuery } from "@/redux/api/bankApi";
import Link from "next/link";
import BankInfo from "../BankInfo/BankInfo";

const CompanyBankList = () => {
  // Get login user
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  // Get company bank accounts
  const params = {
    companyId: userData?.company?._id,
  };
  const {
    data: companyBankAccounts,
    error: bankError,
    isLoading: bankIsLoading,
  } = useGetCompanyBankByCompanyIdQuery(params);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="md:text-2xl sm:text-xl font-bold text-gray-800">
          Company Bank Accounts
        </h1>
        <Link href="/company-bank-add">
          <button className="bg-[#00c194] hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-lg text-base sm:text-sm">
            + Add New Bank Account
          </button>
        </Link>
      </div>

      <div className="grid gap-8">
        {companyBankAccounts?.map((account, index) => (
          <BankInfo
            account={account}
            key={index}
            route="/company-bank-update"
          />
        ))}
        {(!companyBankAccounts || companyBankAccounts.length === 0) && (
          <div className="text-center text-gray-600 text-lg">
            No bank accounts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyBankList;
