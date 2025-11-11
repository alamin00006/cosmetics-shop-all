import { USER_ROLE } from "@/constants/role";
import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const EditAdminUserForm = ({
  user,
  loginUser,
  showEditAdminUser,
  setShowEditAdminUser,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => setShowEditAdminUser(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phoneNumber = e.target.phone.value;
    const additionalPhoneNumber = e.target.additionalPhoneNumber.value;
    const additionalName = e.target.additionalName.value;
    const address = e.target.address.value;
    const incentive = e.target.incentive ? e.target.incentive.value : null;
    const gender = e.target.gender.value;
    const role = e.target.role.value;
    const company = user?.company?._id;

    const userData = {
      name,
      email,
      password: password ? password : user?.password,
      phoneNumber,
      additionalPhoneNumber,
      additionalName,
      address,
      role,
      incentive,
      gender,
      company,
    };

    try {
      await axios.patch(
        `${getBaseUrl()}/admin-users/${user?._id}/update-admin-user`,
        userData
      );

      toast.success("Account Updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {showEditAdminUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">User Update</h3>
              <button
                onClick={handleCloseModal}
                className="btn btn-circle btn-sm"
              >
                <AiOutlineClose />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex-1">
                    <label className="mb-2 block text-lg font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Add User Name"
                      name="name"
                      required
                      defaultValue={
                        user?.role === USER_ROLE.PR_MANAGER
                          ? user?.PRManager?.name
                          : user?.company?.name || user?.SuperAdmin?.name || ""
                      }
                    />
                  </div>

                  <div className="flex-1">
                    <label className="mb-2 block text-lg font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter Email"
                      name="email"
                      required
                      defaultValue={user?.email}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-lg font-semibold">
                    Password
                  </label>
                  <div className="border-gray-300 flex items-center rounded-md border">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full rounded-md border-none px-4 py-2 focus:outline-none"
                      placeholder="Enter New Password"
                      name="password"
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

                <div className="">
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
                      defaultValue={
                        user?.PRManager?.phoneNumber
                          ? user?.PRManager?.phoneNumber
                          : user?.SuperAdmin?.phoneNumber
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-lg font-semibold">
                      Additional Mobile Number
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Mobile Number"
                      name="additionalPhoneNumber"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="mb-2 block text-lg font-semibold">
                      Additional Name
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Mobile Number"
                      name="additionalName"
                    />
                  </div>
                  <br />

                  <div>
                    <label className="mb-2 block text-lg font-semibold">
                      Role
                    </label>
                    <select
                      className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      name="role"
                      defaultValue={user?.role}
                      required
                    >
                      <option disabled value="">
                        Select a Role
                      </option>

                      {loginUser?.role === USER_ROLE.SUPER_ADMIN ? (
                        <option value={USER_ROLE.SUPER_ADMIN}>
                          Super Admin
                        </option>
                      ) : (
                        ""
                      )}

                      {loginUser?.role === USER_ROLE.COMPANY ? (
                        // <option value="admin">Admin</option>
                        <option value={USER_ROLE.PR_MANAGER}>PR Manager</option>
                      ) : (
                        ""
                      )}
                    </select>
                  </div>
                </div>
                {user?.role === USER_ROLE.PR_MANAGER ? (
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
                      defaultValue={user?.PRManager?.incentive}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <label className="mb-2 block text-lg font-semibold">
                    Gender
                  </label>
                  <select
                    className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    name="gender"
                    defaultValue={
                      user?.PRManager?.gender
                        ? user?.PRManager?.gender
                        : user?.SuperAdmin?.gender
                    }
                    required
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-lg font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    className="border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="User Address"
                    name="address"
                    required
                    defaultValue={
                      user?.PRManager?.address
                        ? user?.PRManager?.address
                        : user?.SuperAdmin?.address
                    }
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-teal-600 px-6 py-2 text-white hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    Update User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAdminUserForm;
