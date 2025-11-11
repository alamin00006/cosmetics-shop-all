"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-48 p-6 rounded-lg mb-20">
      <FaExclamationTriangle className="text-rose-500 text-6xl mb-4" />
      <h1 className="text-rose-500 text-2xl font-bold mb-2">
        Something Went Wrong!
      </h1>
      <p className="text-gray-600 text-lg mb-6 text-center">
        We encountered an unexpected error. Please try again later or return to
        the home page.
      </p>
      <Link
        href="/dashboard"
        className="ud-btn bg-green-500 text-white py-2 px-4 rounded shadow-lg transition duration-300 hover:bg-green-600"
      >
        Go Back To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
