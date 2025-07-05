"use client";
import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons from react-icons/fa
import { useDispatch } from "react-redux";
import axios from "axios";
import { placeLoadingShow } from "@/redux/reducers/profileMenuSlice";
import toast, { Toaster } from "react-hot-toast";

import LoadingState from "@/components/LoadingState/LoadingState";

import { setUserVerificationData } from "@/helpers/utils/local-storage";

import { getBaseUrl } from "@/helpers/config/envConfig";
import { userDataKey } from "@/constants/storageKey";

const SignUpPage = ({ setIsLoginPage, setIsSinUpPage, setIsOtpPage }: any) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [seconds, setSeconds] = useState(120);
  const [randomCode, setRandomCode] = useState(null);

  const generateRandomCode = () => {
    // Generate a random 6-digit number
    const newRandomCode = Math.floor(10000 + Math.random() * 90000);
    setRandomCode(newRandomCode as any);
  };

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passWordError: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  const emailCheck = (e: any) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(e.target.value);
    if (validEmail) {
      setUserInfo({ ...userInfo, email: e.target.value });
      setError({ ...error, emailError: "" });
    } else {
      setError({ ...error, emailError: "Invalid Email" });
      setUserInfo({ ...userInfo, email: "" });
    }
  };

  const passwordCheck = (e: any) => {
    const passwordRegex = /.{6,}/;
    const validPassWord = passwordRegex.test(e.target.value);
    if (validPassWord) {
      setUserInfo({ ...userInfo, password: e.target.value });
      setError({ ...error, passWordError: "" });
    } else {
      setError({
        ...error,
        passWordError: "Password must be at least 6 characters long",
      });
      setUserInfo({ ...userInfo, password: "" });
    }
  };

  const confirmPasswordCheck = (e: any) => {
    const confirmPassword = e.target.value;
    if (confirmPassword === userInfo.password) {
      setUserInfo({ ...userInfo, confirmPass: confirmPassword });
      setError({ ...error, passWordError: "" });
    } else {
      setError({ ...error, passWordError: "Passwords do not match" });
      setUserInfo({ ...userInfo, confirmPass: "" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async (e: any) => {
    // const { firstName, email, phone, password, refferCode } = data;
    e.preventDefault();
    // Check Phone Number

    // if (phoneNumber?.length !== 11 || phoneNumber?.substring(0, 2) !== "01") {
    //   return toast.error("Sorry! you gave me wrong phone number");
    // }
    // if (userInfo?.password !== userInfo?.confirmPass) {
    //   return toast.error("Sorry! Password Not Matched");
    // }

    const otpData = {
      name: name,
      email: userInfo.email,
      phoneNumber: phoneNumber,
      password: userInfo.password,
    };

    try {
      dispatch(placeLoadingShow(true));

      const headers = {
        "Content-Type": "application/json",
      };

      await axios.post(
        `${getBaseUrl()}/users/send-otp`,
        { ...otpData, customerOtp: randomCode },
        {
          headers,
        }
      );

      const intervalId = setInterval(() => {
        // Decrease the remaining seconds by 1
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
      }, 60000);
      dispatch(placeLoadingShow(false));
      toast.success("Please Check Your Phone Number");
      setUserVerificationData(userDataKey, otpData);
      setIsSinUpPage(false);
      setIsOtpPage(true);
    } catch (error: any) {
      dispatch(placeLoadingShow(false));

      return toast.error(error?.response?.data?.message);
    }

    // navigate(location.state?.from || "/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Logo */}
        {/* <div className="flex justify-center mb-2">
          <Link href="/" className="">
            <Image
              width={200}
              height={50}
              className="sm:w-[150px] md:w-[200px] sm:h-[30px]"
              src="/images/home/Sharikana-logo.png"
              alt="Header Logo"
            />
          </Link>
        </div> */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Sign Up
        </h2>
        <form onSubmit={handleSignUp} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={emailCheck}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Email"
            />
            {error.emailError && (
              <p className="text-rose-500 ">{error.emailError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                onChange={passwordCheck}
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Password"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {/* {error.passWordError && (
              <p className="text-rose-500 mt-2 text-sm">
                {error.passWordError}
              </p>
            )} */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                onChange={confirmPasswordCheck}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Confirm Password"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error.passWordError && (
              <p className="text-rose-500 mt-2 text-sm">
                {error.passWordError}
              </p>
            )}
          </div>
          <button
            onClick={generateRandomCode}
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#00a47e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <p
          className="text-center text-sm text-gray-600 mt-6"
          onClick={() => {
            setIsLoginPage(true);
            setIsSinUpPage(false);
          }}
        >
          Already have an account?{" "}
          <span className="text-primary hover:text-[#00c194ce] hover:underline font-bold cursor-pointer">
            Login
          </span>
        </p>
      </div>
      <LoadingState />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignUpPage;
