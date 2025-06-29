"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";

const ForgotPassword = ({ setIsLoginPage, setIsPasswordReset }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [userInfo, setUserInfo] = useState({
    inputIdentifier: "",
    newPassword: "",
    confirmPassword: "", // Added confirm password field
  });
  const [error, setError] = useState({
    inputIdentifierError: "",
    passwordError: "",
    confirmPasswordError: "", // Added confirm password error
  });

  // Step 1: Phone, Step 2: OTP, Step 3: New Password
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  // Phone number validation
  // const phoneCheck = (e) => {
  //   const phoneNumber = e.target.value;

  //   // Check if the phone number has 11 or more digits
  //   if (phoneNumber.length >= 11) {
  //     const bdPhoneNumberRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
  //     const validPhone = bdPhoneNumberRegex.test(phoneNumber);
  //     if (validPhone) {
  //       setUserInfo({ ...userInfo, phone: phoneNumber });
  //       setError({ ...error, phoneError: "" });
  //     } else {
  //       setError({ ...error, phoneError: "Invalid Phone Number" });
  //       setUserInfo({ ...userInfo, phone: "" });
  //     }
  //   } else {
  //     setError({ ...error, phoneError: "" }); // Clear error while typing less than 11 digits
  //   }
  // };

  const identifierCheck = (e) => {
    const input = e.target.value.trim();
    const bdPhoneRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (bdPhoneRegex.test(input) || emailRegex.test(input)) {
      setUserInfo({ ...userInfo, identifier: input });
      setError({ ...error, inputIdentifierError: "" });
    } else {
      setError({
        ...error,
        inputIdentifierError: "Enter a valid phone number or email",
      });
      setUserInfo({ ...userInfo, identifier: "" });
    }
  };

  // Password validation
  const passwordCheck = (e) => {
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

  // Confirm password validation
  const confirmPasswordCheck = (e) => {
    const { value } = e.target;
    if (value !== userInfo.newPassword) {
      setError({ ...error, confirmPasswordError: "Passwords do not match" });
      setUserInfo({ ...userInfo, confirmPassword: "" });
    } else {
      setError({ ...error, confirmPasswordError: "" });
      setUserInfo({ ...userInfo, confirmPassword: value });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${getBaseUrl()}/user-verify/send-otp`, {
        identifier: userInfo.identifier,
      });
      toast.success("OTP sent to your phone.");
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sending OTP.");
    }
  };

  // Handle OTP change
  const handleOtpChange = (index, value) => {
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

  // Handle OTP paste
  const handlePaste = (e) => {
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
      document.getElementById(`otp-${pastedData.length - 1}`).focus();
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 5) {
      return toast.error("Please enter a valid 5-digit OTP.");
    }
    try {
      await axios.post(`${getBaseUrl()}/user-verify/verify-otp`, {
        identifier: userInfo.identifier,
        otp: otpValue,
      });
      toast.success("OTP verified.");
      setStep(3);
    } catch (error) {
      return toast.error(error?.response?.data?.message || "Invalid OTP.");
    }
  };

  // Timer, For 3 minutes
  const [timer, setTimer] = useState(180);
  const [isExpired, setIsExpired] = useState(false);

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

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // resend Otp Button
  const handleResendOtp = async (e) => {
    try {
      await axios.post(`${getBaseUrl()}/user-verify/send-otp`, {
        identifier: userInfo.identifier,
      });
      toast.success("OTP sent to your phone.");
      setTimer(180);
      setIsExpired(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sending OTP.");
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    try {
      await axios.post(`${getBaseUrl()}/user-verify/reset-password`, {
        identifier: userInfo.identifier,
        password: userInfo.newPassword,
      });
      toast.success("Password reset successfully.");
      // router.push("/login");
      setIsPasswordReset(false);
      setIsLoginPage(true);
    } catch (error) {
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
                name="phone"
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
              {/* <b>{`${userInfo?.phone?.slice(0, 3)}**${userInfo?.phone?.slice(
                9
              )}`}</b> */}
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
                      maxLength="1"
                      className="border border-gray-300 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded text-center focus:outline-none focus:ring-2 focus:ring-[#00BBB4]"
                    />
                  </div>
                ))}
              </div>
              {isExpired && (
                <div className="text-right text-sm text-gray-600  mr-9 mt-2">
                  <div onClick={handleResendOtp}>
                    <p className="underline hover:text-[#02625a] text-primary cursor-pointer">
                      Re-send
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`  bg-primary text-white py-2 px-16 rounded-md shadow-sm hover:bg-[#00a47e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BBB4] text-sm  font-bold`}
                // disabled={isExpired} // Disable button if OTP is expired
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
          className="mt-4 text-center text-sm text-gray-600 cursor-pointer "
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
