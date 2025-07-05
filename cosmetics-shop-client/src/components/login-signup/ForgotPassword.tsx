"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";

// Define interfaces for props and state
interface ForgotPasswordProps {
  setIsLoginPage: (value: boolean) => void;
  setIsPasswordReset: (value: boolean) => void;
}

interface UserInfo {
  inputIdentifier: string;
  newPassword: string;
  confirmPassword: string;
}

interface ErrorState {
  inputIdentifierError: string;
  passwordError: string;
  confirmPasswordError: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  setIsLoginPage,
  setIsPasswordReset,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    inputIdentifier: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<ErrorState>({
    inputIdentifierError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  // Step 1: Phone/Email, Step 2: OTP, Step 3: New Password
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(180);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const identifierCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    const bdPhoneRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (bdPhoneRegex.test(input) || emailRegex.test(input)) {
      setUserInfo({ ...userInfo, inputIdentifier: input });
      setError({ ...error, inputIdentifierError: "" });
    } else {
      setError({
        ...error,
        inputIdentifierError: "Enter a valid phone number or email",
      });
      setUserInfo({ ...userInfo, inputIdentifier: "" });
    }
  };

  const passwordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /.{6,}/;
    const validPassword = passwordRegex.test(e.target.value);
    if (validPassword) {
      setUserInfo({ ...userInfo, newPassword: e.target.value });
      setError({ ...error, passwordError: "" });
    } else {
      setError({
        ...error,
        passwordError: "Password must be at least 6 characters long",
      });
      setUserInfo({ ...userInfo, newPassword: "" });
    }
  };

  const confirmPasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value !== userInfo.newPassword) {
      setError({ ...error, confirmPasswordError: "Passwords do not match" });
      setUserInfo({ ...userInfo, confirmPassword: "" });
    } else {
      setError({ ...error, confirmPasswordError: "" });
      setUserInfo({ ...userInfo, confirmPassword: value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${getBaseUrl()}/user-verify/send-otp`, {
        identifier: userInfo.inputIdentifier,
      });
      toast.success("OTP sent to your phone.");
      setStep(2);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error sending OTP.");
    }
  };

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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, 5)
      .split("");

    const newOtp = [...otp];
    pastedData.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    setOtp(newOtp);

    if (pastedData.length > 0) {
      const focusInput = document.getElementById(
        `otp-${pastedData.length - 1}`
      ) as HTMLInputElement;
      focusInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 5) {
      return toast.error("Please enter a valid 5-digit OTP.");
    }
    try {
      await axios.post(`${getBaseUrl()}/user-verify/verify-otp`, {
        identifier: userInfo.inputIdentifier,
        otp: otpValue,
      });
      toast.success("OTP verified.");
      setStep(3);
    } catch (error: any) {
      return toast.error(error?.response?.data?.message || "Invalid OTP.");
    }
  };

  useEffect(() => {
    if (step === 2) {
      setTimer(180);
      setIsExpired(false);
    }
  }, [step]);

  useEffect(() => {
    if (timer <= 0) {
      setIsExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (time: number): string => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${getBaseUrl()}/user-verify/send-otp`, {
        identifier: userInfo.inputIdentifier,
      });
      toast.success("OTP sent to your phone.");
      setTimer(180);
      setIsExpired(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error sending OTP.");
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    try {
      await axios.post(`${getBaseUrl()}/user-verify/reset-password`, {
        identifier: userInfo.inputIdentifier,
        password: userInfo.newPassword,
      });
      toast.success("Password reset successfully.");
      setIsPasswordReset(false);
      setIsLoginPage(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error resetting password."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {step === 1 && (
          <form
            onSubmit={handleSendOtp}
            className="space-y-5 max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
          >
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter Phone or Email
              </label>
              <input
                type="text"
                onChange={identifierCheck}
                name="inputIdentifier"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00c194] focus:border-[#00c194] sm:text-sm transition duration-200 ease-in-out"
                placeholder="Enter your phone number or Email"
                required
              />
              {error.inputIdentifierError && (
                <p className="text-red-500 text-sm mt-1">
                  {error.inputIdentifierError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[#00a47e] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00c194]"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Verification
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              Enter the OTP (One Time Password) that has been sent to your
              registered Phone Number or Email
            </p>

            {isExpired ? (
              <p className="text-rose-500 text-sm mb-4 font-bold">
                Expired OTP
              </p>
            ) : (
              <p className="text-sm font-bold text-gray-600 mb-4">
                Time Remaining: {formatTime(timer)}
              </p>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-2">
              <div
                className={`flex gap-x-3 justify-center ${
                  !isExpired ? "mb-3" : "mb-0"
                }`}
              >
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
              {isExpired && (
                <div className="text-right text-sm text-gray-600 mr-9 mt-2">
                  <div onClick={handleResendOtp}>
                    <p className="underline hover:text-[#02625a] text-primary cursor-pointer">
                      Re-send
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="bg-primary text-white py-2 px-16 rounded-md shadow-sm hover:bg-[#00a47e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BBB4] text-sm font-bold"
              >
                Verify
              </button>
            </form>
          </div>
        )}
        {step === 3 && (
          <form
            onSubmit={handleResetPassword}
            className="space-y-5 max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
          >
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={passwordCheck}
                  name="newPassword"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00c194] focus:border-[#00c194] sm:text-sm transition duration-200 ease-in-out"
                  placeholder="Enter your new password"
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </div>
              {error.passwordError && (
                <p className="text-red-500 text-sm mt-1">
                  {error.passwordError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                onChange={confirmPasswordCheck}
                name="confirmPassword"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00c194] focus:border-[#00c194] sm:text-sm transition duration-200 ease-in-out"
                placeholder="Confirm your new password"
                required
              />
              {error.confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {error.confirmPasswordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[#00a47e] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00c194]"
            >
              Reset Password
            </button>
          </form>
        )}

        <p
          className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
          onClick={() => {
            setIsPasswordReset(false);
            setIsLoginPage(true);
          }}
        >
          Remembered your password?{" "}
          <span className="text-[#00BBB4] underline">Login</span>
        </p>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default ForgotPassword;
