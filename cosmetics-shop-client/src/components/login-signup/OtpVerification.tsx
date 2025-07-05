"use client";

import { authKey, userDataKey } from "@/constants/storageKey";

import {
  getFromLocalStorage,
  getUserVerificationData,
  removeUserVerificationData,
} from "@/helpers/utils/local-storage";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";

// Define interfaces for props and user data
interface OtpVerificationProps {
  setIsOtpPage: (value: boolean) => void;
  setIsSinUpPage: (value: boolean) => void;
}

interface UserData {
  phoneNumber?: string;
  [key: string]: any;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  setIsOtpPage,
  setIsSinUpPage,
}) => {
  // const [userSignUp] = useUserSignUpMutation();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({});
  const [seconds, setSeconds] = useState<number>(120);

  // Load user data from local storage
  useEffect(() => {
    const getUserData = getUserVerificationData(userDataKey);
    if (getUserData) {
      setUserData(getUserData);
    } else {
      setUserData({});
    }
  }, []);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 4 && value !== "") {
        const nextInput = document.getElementById(
          `otp-${index + 1}`
        ) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  // Handle OTP form submission
  const handleOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const accessToken = getFromLocalStorage(authKey);
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };

      const res = await axios.post(
        `${getBaseUrl()}/users/signup`,
        {
          ...userData,
          customerOtp: otp.join(""),
        },
        { headers }
      );

      const token = res?.data?.data?.token;

      if (token) {
        toast.success(res?.data?.message || "Verification successful");
        localStorage.setItem(authKey, token);
        removeUserVerificationData(userDataKey);
        router.back();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Verification failed");
    }
  };

  // Handle OTP paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, 5)
      .split("");
    const newOtp = [...otp];
    pastedData.forEach((digit, index) => {
      if (index < 5) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    if (pastedData.length > 0) {
      const focusInput = document.getElementById(
        `otp-${pastedData.length - 1}`
      ) as HTMLInputElement;
      focusInput?.focus();
    }
  };

  // Handle resend OTP
  const handleResentOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSeconds(120);

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 120000); // Changed to 120 seconds to match initial timer

    toast.success("Please Check Your Phone Number");
  };

  // Format the remaining seconds as minutes:seconds
  const formattedTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
                    maxLength={1}
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
              <button
                type="submit"
                className="underline hover:text-[#02625a] text-primary cursor-pointer"
              >
                Re-send {seconds <= 0 ? "" : `(${formattedTime(seconds)})`}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default OtpVerification;
