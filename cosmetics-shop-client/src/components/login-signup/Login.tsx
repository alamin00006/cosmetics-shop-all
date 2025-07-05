"use client";

import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { isLoggedIn } from "../../services/auth.service";
import { authKey } from "@/constants/authKey";
import {
  handleSubmit,
  passwordCheck,
  phoneNumberCheck,
} from "@/utils/authHelpers";

const Login = ({ setIsSinUpPage, setIsLoginPage, setIsPasswordReset }: any) => {
  // const { userData, error: userError, loading } = useUserData();

  const router = useRouter();

  // Check if the user is logged in
  const userLoggedIn = isLoggedIn();

  useEffect(() => {
    if (userLoggedIn) {
      return router.push("/");
    }
  }, [userLoggedIn, router]);

  const [userInfo, setUserInfo] = useState({ phone: "", password: "" });
  const [error, setError] = useState({ phoneError: "", passwordError: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 login_page">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Login
        </h2>
        <p className="text-center font-medium text-black md:text-2xl sm:text-xl mb-4">
          Welcome Back
        </p>
        <form
          onSubmit={(e) => handleSubmit(e, userInfo, authKey, router)}
          className="space-y-3"
        >
          {/* Phone Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              onChange={(e) =>
                phoneNumberCheck(e, userInfo, setUserInfo, error, setError)
              }
              name="phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Phone Number"
              required
              onWheel={(e: any) => e.target.blur()}
            />
            {error.phoneError && (
              <p className="text-red-500 text-sm mt-2">{error.phoneError}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => passwordCheck(e, setUserInfo, error, setError)}
                placeholder="Enter your password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error.passwordError && (
              <p className="text-red-500 text-sm mt-2">{error.passwordError}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div
            className="flex justify-end cursor-pointer"
            onClick={() => {
              setIsPasswordReset(true);
              setIsLoginPage(false);
            }}
          >
            <p className="text-sm text-primary hover:underline">
              Forgot Password?
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#00a47e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>

        <p
          className="text-center text-sm text-gray-600 mt-6"
          onClick={() => {
            setIsSinUpPage(true);
            setIsLoginPage(false);
          }}
        >
          {`Don't`} have an account?{" "}
          <span className="text-primary hover:text-[#00c194ce] hover:underline font-bold cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginTop: "60px",
          },
        }}
      />
    </div>
  );
};

export default Login;
