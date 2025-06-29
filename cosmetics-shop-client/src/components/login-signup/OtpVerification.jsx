"use client";
import { authKey, userDataKey } from "@/constants/storageKey";
import { useUserSignUpMutation } from "@/redux/api/authApi";

import {
  getFromLocalStorage,
  getUserVerificationData,
  removeUserVerificationData,
} from "@/helpers/utils/local-storage";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";

const OtpVerification = ({ setIsOtpPage, setIsSinUpPage }) => {
  const [userSignUp] = useUserSignUpMutation();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const getUserData = getUserVerificationData(userDataKey);

  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (getUserData) {
      setUserData(getUserData);
    } else {
      setUserData({});
    }
  }, []);

  // Format the remaining seconds as minutes:seconds
  const formattedTime = seconds % 60;

  const handleOtpChange = (index, value) => {
    // Validate input to allow only numerical values
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus on the next input field
      if (index < 4 && value !== "") {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();

    try {
      const accessToken = getFromLocalStorage(authKey);
      // Set the headers
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };

      // await placeInvestment(investData);
      const res = await axios.post(
        `${getBaseUrl()}/users/signup`,
        {
          ...userData,
          customerOtp: otp.join(""),
        },
        {
          headers,
        }
      );

      const token = res?.data?.data?.token;

      if (token) {
        toast.success(res?.data?.message);
        localStorage.setItem(authKey, token);
        removeUserVerificationData(userDataKey);
        router.back();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // handle otp paste

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").split("");

    // Update the OTP array with the pasted data
    const newOtp = [...otp];
    pastedData.forEach((digit, index) => {
      if (index < 5) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    // Automatically focus on the next input field
    if (pastedData.length > 0) {
      document.getElementById(`otp-${pastedData.length - 1}`).focus();
    }
  };

  const handleResentOtp = async (e) => {
    e.preventDefault();
    setSeconds(120);

    const intervalId = setInterval(() => {
      // Decrease the remaining seconds by 1
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 60000);
    toast.success("Please Check Your Phone Number");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Verification
          </h2>
          <p className="text-sm text-gray-600 mb-1">
            Enter the OTP (One Time Password) that has been sent to your
            registered Phone Number
          </p>
          <p className="text-sm font-medium text-gray-800 mb-4">
            {userData?.phoneNumber}
          </p>

          <p
            className="underline hover:text-[#02625a] text-primary cursor-pointer mb-8"
            onClick={() => {
              setIsOtpPage(false);
              setIsSinUpPage(true);
            }}
          >
            {" "}
            Change Number
          </p>

          <form onSubmit={handleOtp} className="space-y-6">
            <div className="flex gap-x-3 justify-center">
              {otp.map((digit, index) => (
                <div key={index}>
                  <input
                    type="text"
                    id={`otp-${index}`}
                    name={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onPaste={handlePaste}
                    maxLength="1"
                    className="border border-gray-300 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded text-center focus:outline-none focus:ring-2 focus:ring-[#00BBB4]"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#00a47e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BBB4] text-sm uppercase font-bold"
            >
              Verify
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            {`Didn't`} receive any OTP?{" "}
            <form onSubmit={handleResentOtp}>
              <button className="underline hover:text-[#02625a] text-primary cursor-pointer">
                Re-send {formattedTime <= 0 ? "" : `(${formattedTime}s)`}
              </button>
            </form>
          </div>
          {/* {message && <p className="mt-2 text-sm text-red-500">{message}</p>} */}
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default OtpVerification;
