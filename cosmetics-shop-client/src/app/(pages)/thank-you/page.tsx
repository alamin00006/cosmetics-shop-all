"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import thankYouImage from "@/assets//image/thank-you.webp";
export default function ThankYouPage() {
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Simulate fetching order number (replace with actual logic, e.g., from query params or API)
  useEffect(() => {
    // Mock order number generation for demo purposes
    const generatedOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNumber);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        {/* Thank You Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Your order has been successfully placed. We’ve sent a confirmation
          email with all the details.
        </p>

        {/* Order Confirmation Image */}
        <div className="flex justify-center mb-6">
          <Image
            src={thankYouImage}
            alt="Order Confirmed"
            className="w-[400px] h-32 sm:w-40 sm:h-40 object-contain"
            width={400}
            height={160}
            priority
          />
        </div>

        {/* Order Details */}
        {/* <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Order Details
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            <strong>Order Number:</strong> {orderNumber || "Loading..."}
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            <strong>Estimated Delivery:</strong>{" "}
            {new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toLocaleDateString()}
          </p>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            You can track your order or view details in your account.
          </p>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Continue Shopping
            </button>
          </Link>
          <Link href="/order-history" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors">
              View Order Details
            </button>
          </Link>
        </div>

        {/* Support Information */}
        <p className="text-sm text-gray-500 mt-6">
          Need help? Contact our support team at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-500 hover:underline"
          >
            support@example.com
          </a>
        </p>
      </div>
    </div>
  );
}
