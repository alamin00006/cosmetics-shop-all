"use client";
import { useState } from "react";
import Link from "next/link";

import { useGetAllUsersQuery, useGetUserQuery } from "@/redux/api/authApi";
import { USER_ROLE } from "@/constants/role";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import SeeAdminUserDetails from "./SeeAdminUserDetails";
import EditAdminUserForm from "./EditAdminUserForm";
import { Toaster } from "react-hot-toast";
import { formatDate } from "@/utils/dateConvert";
import { handleAdminUserActive } from "./handleAdminUserActive";

const AdminUserLists = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditAdminUser, setShowEditAdminUser] = useState(false);
  // Get login user
  const {
    data: loginUser,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  // console.log("hello");
  // get All Users
  const userParams = {
    excludeRole: [
      USER_ROLE.COMPANY,
      loginUser?.role === USER_ROLE.COMPANY ? USER_ROLE.SUPER_ADMIN : null,
    ].filter(Boolean),
  };

  const { data, error, isLoading, refetch } = useGetAllUsersQuery(userParams);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditAdminUser(true);
  };

  return (
    <div
      className={`p-6 ${
        isModalOpen || showEditAdminUser ? "blur-background" : ""
      }`}
    >
      <h2 className="font-bold">Admin Users</h2>
      <div className="mb-4 flex items-center justify-end">
        <Link href="/add-new-user">
          <button className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-500">
            Add New User
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>No</th>
              <th>Id</th>
              <th>Account Create</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>#{user.id}</td>
                <td>{formatDate(user?.createdAt)}</td>
                <td>
                  {user?.PRManager?.name ||
                    user?.SuperAdmin?.name ||
                    user?.admin?.name ||
                    user?.company?.name}
                </td>
                <td>
                  {" "}
                  {user?.PRManager?.phoneNumber ||
                    user?.SuperAdmin?.phoneNumber ||
                    user?.company?.phoneNumber ||
                    user?.admin?.phoneNumber ||
                    "-"}
                </td>

                <td>{user?.email}</td>
                <td>
                  {" "}
                  {user?.PRManager?.gender ||
                    user?.SuperAdmin?.gender ||
                    user?.company?.gender ||
                    user?.admin?.gender ||
                    "-"}
                </td>

                <td className="uppercase font-bold">{user.role}</td>

                <td>
                  <p
                    className={`mb-2 text-center ${
                      user?.status === "Active"
                        ? "text-green-600"
                        : "text-rose-500"
                    }  font-black`}
                  >
                    {" "}
                    {user?.status}
                  </p>
                  {loginUser?.role === USER_ROLE.COMPANY && (
                    <div className="text-center">
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked={user?.status === "Active"}
                        onChange={async (e) => {
                          const newValue = e.target.checked
                            ? "Active"
                            : "Blocked";
                          await handleAdminUserActive(
                            user?._id,
                            newValue,
                            refetch
                          );
                        }}
                      />
                    </div>
                  )}
                </td>

                <td className="text-center">
                  <button
                    onClick={() => handleViewDetails(user)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <AiOutlineEye style={{ width: "24px", height: "24px" }} />
                  </button>
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FaRegEdit style={{ width: "24px", height: "24px" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <SeeAdminUserDetails user={selectedUser} onClose={handleCloseModal} />
      )}

      {showEditAdminUser && (
        <EditAdminUserForm
          user={selectedUser}
          loginUser={loginUser}
          showEditAdminUser={showEditAdminUser}
          setShowEditAdminUser={setShowEditAdminUser}
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

export default AdminUserLists;
