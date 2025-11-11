"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaList } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { getBaseUrl } from "@/helpers/config/envConfig";

const CompanyAdd = () => {
  const user = getUserInfo(authKey);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const companyData = {
      createdUser: user?.userId,
      name: formData.get("companyName"),
      companyOwnerName: formData.get("companyOwnerName"),
      companyOwnerPhoneNumber: formData.get("companyOwnerPhoneNumber"),
      companyAddress: formData.get("companyAddress"),
      email: formData.get("companyOwnerEmail"),
      role: "company",
      designation: formData.get("designation"),
      tinNumber: formData.get("tinNumber"),
      tradeLicenceNumber: formData.get("tradeLicenceNumber"),
      binNumber: formData.get("binNumber"),
      bankName: formData.get("bankName"),
      accountHolderName: formData.get("accountHolderName"),
      accountNumber: formData.get("accountNumber"),
      password: formData.get("password"),
    };

    try {
      await axios.post(`${getBaseUrl()}/company`, companyData);
      toast.success("Company Created Successfully");
      e.target.reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-gray-800 rounded-md bg-orange-100 px-4 py-2 text-xl font-semibold">
            New Company Registration Form
          </h4>
          <Link
            href="/company"
            className="border-gray-300 hover:bg-gray-100 flex items-center space-x-2 rounded-md border px-4 py-2 text-teal-500"
          >
            <FaList />
            <span>Company List</span>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Company Name
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Company Name"
                name="companyName"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Company Owner Name
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Company Owner Name"
                name="companyOwnerName"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Owner Phone Number
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Owner Phone Number"
                name="companyOwnerPhoneNumber"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Business Address
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Business Address"
                name="companyAddress"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Owner Email
              </label>
              <input
                type="email"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Owner Email"
                name="companyOwnerEmail"
                required
              />
            </div>
          </div>

          <h5 className="text-gray-800 mb-4 text-lg font-semibold">
            Company Validation
          </h5>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Tin Number
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Tin Number"
                name="tinNumber"
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Trade License Number
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Trade Licence Number"
                name="tradeLicenceNumber"
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Bin Number
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Bin Number"
                name="binNumber"
              />
            </div>
          </div>

          <h5 className="text-gray-800 mb-4 text-lg font-semibold">
            Bank Details
          </h5>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Bank Name
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Bank Name"
                name="bankName"
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Account Holder Name
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Account Holder Name"
                name="accountHolderName"
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Account Number
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Account Number"
                name="accountNumber"
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Account Type
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-3"
                placeholder="Account Type"
                name="accountType"
              />
            </div>
            <div className="mb-6">
              <label className="text-gray-700 mb-2 block font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="border-gray-300 w-full rounded-md border p-3 focus:border-green-200"
                  placeholder="Password"
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <h5 className="text-gray-800 mb-4 text-lg font-semibold">
            Attachment
          </h5>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Incorporation Certificate
              </label>
              <input
                type="file"
                className="border-gray-300 w-full rounded-md border p-3"
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Trade License
              </label>
              <input
                type="file"
                className="border-gray-300 w-full rounded-md border p-3"
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Bin Certificate
              </label>
              <input
                type="file"
                className="border-gray-300 w-full rounded-md border p-3"
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Tin Certificate
              </label>
              <input
                type="file"
                className="border-gray-300 w-full rounded-md border p-3"
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block font-medium">
                Company Logo
              </label>
              <input
                type="file"
                className="border-gray-300 w-full rounded-md border p-3"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-teal-500 px-6 py-2 text-white shadow-md hover:bg-teal-600"
            >
              Create New Company
            </button>
          </div>
        </form>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </>
  );
};

export default CompanyAdd;
