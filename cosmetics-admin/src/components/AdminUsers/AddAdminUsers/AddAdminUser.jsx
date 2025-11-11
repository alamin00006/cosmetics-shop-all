"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaList, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import Link from "next/link";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { USER_ROLE } from "@/constants/role";
import { useGetUserQuery } from "@/redux/api/authApi";

const AddAdminUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  // Get login user
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUserData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phoneNumber: formData.get("phone"),
      additionalPhoneNumber: formData.get("additionalPhoneNumber"),
      additionalName: formData.get("additionalName"),
      company: userData?.role === USER_ROLE.COMPANY ? userData?.company : null,
      address: formData.get("address"),
      role: role,
      incentive: formData?.get("incentive"),
      gender: gender,
    };

    try {
      await axios.post(
        `${getBaseUrl()}/admin-users/create-admin-user`,
        newUserData
      );

      toast.success("Account Created");
      e.target.reset();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-xl font-semibold text-orange-600">
            New User Form
          </h4>
          <Link
            href="/admin-users"
            className="flex items-center font-medium text-teal-500 hover:text-teal-700"
          >
            <FaList className="mr-2" />
            User List
          </Link>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-1">
              <label className="mb-2 block text-lg font-semibold">Name</label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Add User Name"
                name="name"
                required
              />
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-lg font-semibold">Email</label>
              <input
                type="email"
                className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Email"
                name="email"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold">Password</label>
            <div className="border-gray-300 flex items-center rounded-md border">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md border-none px-4 py-2 focus:outline-none"
                placeholder="Enter Password"
                name="password"
                required
              />
              <button
                type="button"
                className="border-gray-300 border-l p-2"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-1">
              <label className="mb-2 block text-lg font-semibold">
                Mobile Number
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Mobile Number"
                name="phone"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-semibold">
                Additional Mobile Number
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Additional Mobile Number"
                name="additionalPhoneNumber"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-semibold">
                Additional Name
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Additional Name"
                name="additionalName"
              />
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-lg font-semibold">Role</label>
              <select
                className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                name="role"
                required
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option disabled value="">
                  Select a Role
                </option>

                {userData?.role === USER_ROLE.SUPER_ADMIN ? (
                  <option value={USER_ROLE.SUPER_ADMIN}>Super Admin</option>
                ) : (
                  ""
                )}

                {userData?.role === USER_ROLE.COMPANY ? (
                  <>
                    <option value={USER_ROLE.PR_MANAGER}>PR Manager</option>
                    <option value={USER_ROLE?.ADMIN}>Admin</option>
                  </>
                ) : (
                  ""
                )}
              </select>
            </div>
          </div>
          {role === USER_ROLE.PR_MANAGER ? (
            <div>
              <label className="mb-2 block text-lg font-semibold">
                Incentive
              </label>
              <input
                type="number"
                className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Incentive"
                name="incentive"
                required
              />
            </div>
          ) : (
            ""
          )}
          <div>
            <label className="mb-2 block text-lg font-semibold">Gender</label>
            <select
              className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              name="gender"
              value={gender}
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold">Address</label>
            <input
              type="text"
              className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="User Address"
              name="address"
              required
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-teal-600 px-6 py-2 text-white hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Create New Account
            </button>
          </div>
        </div>
      </form>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "80px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default AddAdminUser;
