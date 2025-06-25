"use client";
import {
  useGetFrontEndSingleUserQuery,
  useGetUserQuery,
} from "@/redux/api/authApi";
import { decrypt } from "@/utils/decrypt";
import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import Attachment from "../all-investment/Attachment";
import { handleVerifyUser } from "@/components/users/HandleVerifyUser";
import { USER_ROLE } from "@/constants/role";
import { Toaster } from "react-hot-toast";
import BankInfo from "../BankInfo/BankInfo";

const UserDetails = ({ params }) => {
  // Get Front End User
  const [userData, setEncryptUserData] = useState([]);
  const userId = params?.id;

  const { data, error, isLoading, refetch } = useGetFrontEndSingleUserQuery({
    userId,
  });

  // Get Login User Data
  const {
    data: loginUser,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  useEffect(() => {
    if (data?.content && data?.iv) {
      const decrypted = decrypt(data?.content, data?.iv);
      setEncryptUserData(decrypted);
    }
  }, [data?.content, data?.iv]);

  return (
    <div className="p-5 border-[#d1d5db]  border shadow-lg rounded-lg">
      <div className="flex justify-end mb-2">
        <div>
          <p className="mb-2 text-center text-green-600 font-black">
            {" "}
            {userData?.isVerified ? (
              "Verified"
            ) : (
              <span className="text-rose-500">Unverified</span>
            )}
          </p>
          {(loginUser?.role === USER_ROLE.COMPANY ||
            loginUser?.role === USER_ROLE.PR_MANAGER) && (
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={userData?.isVerified || false}
                onChange={async (e) => {
                  const newValue = e.target.checked;
                  await handleVerifyUser(userData?._id, newValue, refetch);
                }}
              />
            </label>
          )}
        </div>
      </div>
      {/* Personal and Nominee Details */}
      <UserInfo user={userData} nominee={userData?.nominee?.[0]} />
      {/* Attachment */}
      <Attachment
        user={userData}
        nominee={userData?.nominee?.[0]}
        isInvestmentView={false}
      />
      <div className="mt-4">
        {userData?.bankAccounts?.map((account, index) => (
          <BankInfo account={account} key={index} route="/user-bank-update" />
        ))}
      </div>

      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default UserDetails;
