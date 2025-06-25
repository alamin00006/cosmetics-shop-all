"use client";
import { USER_ROLE } from "@/constants/role";
import { authKey } from "@/constants/storageKey";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { useGetUserQuery } from "@/redux/api/authApi";
import { getFromLocalStorage } from "@/utils/local-storage";
import { uploadImageToImgBB } from "@/utils/uploadPhoto";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const authToken = getFromLocalStorage(authKey);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleTogglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery({ token: authToken });

  // Handle Password Change
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const passwordUpdate = {
        oldPassword: passwords.oldPassword,
        password: passwords.newPassword,
      };

      await axios.patch(
        `${getBaseUrl()}/admin-users/${userData?._id}/update-password`,
        passwordUpdate
      );

      toast.success("Password has been successfully updated.");
      e.target.reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred!");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Photo Profile Photo Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const profilePic = await uploadImageToImgBB(profilePhoto[0]);

      const withAttachmentUserData = {
        profilePhoto: profilePic,
        role: userData?.role,
      };

      await axios.patch(
        `${getBaseUrl()}/admin-users/${
          userData?.PRManager?._id
            ? userData?.PRManager?._id
            : userData?.SuperAdmin?._id
            ? userData?.SuperAdmin?._id
            : userData?.company?._id
        }/update-profile-photo`,
        withAttachmentUserData
      );

      toast.success("Uploaded successfully");
      // e.target.reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-270 ">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handlePasswordUpdate}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        {/* Your SVG icon */}
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Full Name"
                        disabled
                        value={
                          userData?.role === USER_ROLE.PR_MANAGER
                            ? userData?.PRManager?.name
                            : userData?.company?.name ||
                              userData?.SuperAdmin?.name ||
                              ""
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      disabled
                      defaultValue={
                        userData?.role === USER_ROLE.PR_MANAGER
                          ? userData?.PRManager?.phoneNumber
                          : userData?.company?.companyOwnerPhoneNumber ||
                            userData?.SuperAdmin?.phoneNumber ||
                            ""
                      }
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      {/* Your SVG icon */}
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      disabled
                      defaultValue={userData?.email}
                    />
                  </div>
                </div>

                {/* Change Password Section */}
                <div className="mb-5.5">
                  <button
                    type="button"
                    className="mb-3 block text-sm font-medium text-green-500 hover:underline"
                    onClick={handleTogglePasswordFields}
                  >
                    Change Password
                  </button>

                  {showPasswordFields && (
                    <div className="flex flex-col gap-5.5">
                      <div className="relative">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="oldPassword"
                        >
                          Old Password
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type={showOldPassword ? "text" : "password"}
                          name="oldPassword"
                          id="oldPassword"
                          placeholder="Enter old password"
                          value={passwords.oldPassword}
                          onChange={handlePasswordChange}
                        />
                        <span
                          className="absolute right-4 top-12 cursor-pointer"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                        >
                          {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>

                      <div className="relative">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="newPassword"
                        >
                          New Password
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          placeholder="Enter new password"
                          value={passwords.newPassword}
                          onChange={handlePasswordChange}
                        />
                        <span
                          className="absolute right-4 top-12 cursor-pointer"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <div className="flex justify-end gap-4">
                        <button
                          className="flex justify-center rounded-lg bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700 transition duration-200"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Change Password"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-lg  bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b  px-2 py-1 dark:border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white my-3 ">
                Your Photo
              </h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleUpdate}>
                <div className="mb-6 flex items-center justify-center">
                  {userData?.PRManager?.userPhoto ||
                  userData?.SuperAdmin?.userPhoto ||
                  userData?.company?.companyLogo ? (
                    <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-blue-500">
                      <Image
                        src={
                          userData?.PRManager?.userPhoto ||
                          userData?.SuperAdmin?.userPhoto ||
                          userData?.company?.companyLogo
                        }
                        width={128}
                        height={128}
                        className="w-full h-full object-contain"
                        alt="User"
                      />
                    </div>
                  ) : (
                    <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-gray-300">
                      <Image
                        src={"/images/user/user13.png"}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                        alt="Default User"
                      />
                    </div>
                  )}
                </div>

                <div
                  id="FileUpload"
                  className="relative mb-6 block w-full cursor-pointer rounded-lg border border-dashed border-blue-500 bg-gray-100 px-4 py-6 dark:bg-gray-700"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePhoto(e.target.files)}
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-2 "
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className="flex justify-center rounded-lg bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700 transition duration-200"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default Profile;
