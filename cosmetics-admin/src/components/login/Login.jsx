"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { authKey } from "@/constants/storageKey";

import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";

const Login = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const [showPassword, setShowPassword] = useState(false);

  const emailCheck = (e) => {
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

  const passwordCheck = (e) => {
    const passwordRegex = /.{6,}/;
    const validPassword = passwordRegex.test(e.target.value);
    if (validPassword) {
      setUserInfo({ ...userInfo, password: e.target.value });
      setError({ ...error, passwordError: "" });
    } else {
      setError({
        ...error,
        passwordError: "Password must be at least 6 characters long",
      });
      setUserInfo({ ...userInfo, password: "" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: userInfo.email,
      password: userInfo.password,
    };

    try {
      //  login request
      // const res = await userLogin(userData).unwrap();

      const res = await axios.post(
        `${getBaseUrl()}/admin-users/login`,
        userData,
        {
          withCredentials: true,
        }
      );

      // Check if the token is defined and not empty

      toast.success(res?.data?.message);
      localStorage.setItem(authKey, res?.data?.data?.token);
      // console.log(res?.data);
      router.push("/dashboard");
    } catch (error) {
      // console.log(error);
      toast.error(
        error?.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-4 ">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <Link href="/">
              <Image
                width={176}
                height={32}
                src={"/images/logo/Sharikana-logo.png"}
                alt="Logo"
                priority
              />
            </Link>
          </div>
          <h2 className="text-gray-800 mb-2 text-center text-2xl font-bold">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-gray-700 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                onChange={emailCheck}
                name="email"
                className="border-gray-300 placeholder-gray-400 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
              {error.emailError && (
                <p className="text-rose-500 mt-2 text-sm">{error.emailError}</p>
              )}
            </div>
            <div>
              <label className="text-gray-700 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={passwordCheck}
                  placeholder="Enter your password"
                  name="password"
                  className="border-gray-300 placeholder-gray-400 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                <p className="text-rose-500 mt-2 text-sm font-bold">
                  {error.passwordError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[#00c194] px-4 py-2 text-white shadow-sm hover:bg-[#00a47e] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default Login;
