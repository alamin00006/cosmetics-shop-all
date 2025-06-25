import { FaWhatsapp } from "react-icons/fa";
import { formatDate, formattedTime } from "@/utils/dateConvert";

import Link from "next/link";
import { USER_ROLE } from "@/constants/role";
import { handleVerifyUser } from "@/components/users/HandleVerifyUser";
import { AiOutlineEye } from "react-icons/ai";
import { handleUserActive } from "./HandleUserActive";

const UserTable = ({ users, page, size, loginUser, refetch }) => {
  return (
    <>
      <div className="relative">
        <div
          id="table-container"
          className="overflow-x-auto"
          style={{ display: "flex" }}
        >
          <table className="table-bordered table w-full">
            <thead>
              <tr className="text-sm">
                <th>No.</th>
                <th>Account Create</th>
                <th>User Id</th>
                <th>Name</th>
                <th>Contact No.</th>
                <th>User Type</th>
                <th>Status</th>
                <th>Verify Status</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr key={user._id} className="text-sm ">
                    <td className="uppercase w-36">
                      {(page - 1) * size + index + 1}
                    </td>
                    <td className="uppercase w-36">
                      <p>{formatDate(user?.createdAt)}</p>
                      <p>{formattedTime(user?.createdAt)}</p>
                    </td>
                    <td className="uppercase w-36">#{user?.id}</td>
                    <td>{user?.name}</td>
                    <td>
                      {user?.phoneNumber}
                      <Link
                        href={`https://api.whatsapp.com/send?phone=88${user?.phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="relative flex items-center justify-center px-3 py-1 text-[#0ec043] text-sm rounded-md animate-pulse">
                          <FaWhatsapp className="w-6 h-6" />
                          {/* Animated pulse effect */}
                          <span className="absolute flex h-3 w-3 top-0 right-0">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                        </button>
                      </Link>
                    </td>

                    <td className="flex items-center gap-2">
                      <p className={`font-bold`}>
                        {user.investment?.length > 0 ? (
                          <span className="text-green-600 font-bold">
                            Investor ({user.investment?.length})
                          </span>
                        ) : (
                          "User"
                        )}
                      </p>
                    </td>
                    <td>
                      <p
                        className={`mb-2 text-center ${
                          user?.status === "active"
                            ? "text-green-600"
                            : "text-rose-500"
                        }  font-black capitalize`}
                      >
                        {" "}
                        {user?.status}
                      </p>
                      {loginUser?.role === USER_ROLE.COMPANY && (
                        <div className="text-center">
                          <input
                            type="checkbox"
                            className="toggle toggle-success"
                            checked={user?.status === "active"}
                            onChange={async (e) => {
                              const newValue = e.target.checked
                                ? "active"
                                : "blocked";
                              await handleUserActive(
                                user?.id,
                                newValue,
                                refetch
                              );
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      <p className="mb-2 text-center text-green-600 font-black">
                        {" "}
                        {user?.isVerified ? (
                          "Verified"
                        ) : (
                          <span className="text-rose-500">Unverified</span>
                        )}
                      </p>
                      {loginUser?.role === USER_ROLE.COMPANY && (
                        <div className="text-center">
                          <input
                            type="checkbox"
                            className="toggle toggle-success"
                            checked={user?.isVerified}
                            onChange={async (e) => {
                              const newValue = e.target.checked ? true : false;
                              await handleVerifyUser(
                                user?._id,
                                newValue,
                                refetch
                              );
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      <Link href={`/user-details/${user?.id}`}>
                        <AiOutlineEye
                          style={{ width: "24px", height: "24px" }}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={`/user-update/${user?.id}`}
                        className="btn-light btn btn-sm bg-green-600 text-white hover:bg-green-400"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {/* {selectedInvestment && (
        <UpdateStatus
          show={showStatusModal}
          setShow={setShowStatusModal}
          investment={selectedInvestment}
          refetch={refetch}
        />
      )} */}
    </>
  );
};

export default UserTable;
