"use client";
import PaymentMethod from "@/components/shipping/PaymentMethod";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust the import path as needed
import { getTotals } from "@/redux/reducers/cartSlice";
import { useGetUserQuery } from "@/redux/api/authApi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { useRouter } from "next/navigation";

export default function ShippingAddressPage() {
  const {
    data: userData,
    isSuccess: userIsSuccess,
    error: userError,
    isLoading: userIsLoading,
    refetch,
  } = useGetUserQuery();

  const user = userIsSuccess ? userData.data : null;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);

  const [shippingValue, setShippingValue] = useState(0);
  const [shippingValueMissing, setShippingValueMissing] = useState("");

  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const [discountCode, setDiscountCode] = useState("");
  const [total, setTotal] = useState(cartTotalAmount || 0);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  console.log("User Data:", user);
  // Update totals whenever cart changes
  useEffect(() => {
    dispatch(getTotals());
    setTotal(cartTotalAmount || 0);
  }, [cartTotalAmount, dispatch]);

  const handleApplyCoupon = () => {
    if (discountCode === "SAVE10") {
      const discount = total * 0.1;
      setTotal(total - discount);
      alert(`Discount applied! New total: ৳ ${total - discount}`);
    } else {
      alert("Invalid coupon code!");
    }
    setDiscountCode("");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (shippingValue === 0) {
      return setShippingValueMissing(
        "Please select a shipping method to proceed with your order."
      );
    }
    const orderData = {
      user: user?._id || null,
      ...formData,
      shippingValue,
      discountCode,
      total: total + shippingValue,
      orderItems: cartItems,
      cartTotalQuantity,
      cartTotalAmount,
    };

    try {
      setIsUploading(true);

      await axios.post(`${getBaseUrl()}/orders`, {
        ...orderData,
      });
      toast.success("Order submitted successfully!");

      router.push("/thank-you");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to submit order.";
      toast.error(errorMessage);

      console.error("Error submitting order:", error);
    } finally {
      setIsUploading(false);
    }
    // Here you can add API call to submit order to backend
  };

  return (
    <div className="container mx-auto px-4 my-5 ">
      <div className="flex flex-col lg:flex-row bg-yellow-50">
        {/* Left Section (Contact & Delivery) */}
        <div className="w-full lg:w-2/3 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contact</h2>
            <a href="#" className="text-blue-500">
              Log in
            </a>
          </div>
          <form onSubmit={handleSubmit} id="shippingForm" className="space-y-4">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email or mobile phone number"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <select
                name="country"
                className="w-full p-2 border rounded"
                value="Bangladesh"
                disabled
              >
                <option>Bangladesh</option>
              </select>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="w-full sm:w-1/2 p-2 border rounded"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="w-full sm:w-1/2 p-2 border rounded"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-2 border rounded"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="apartment"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full p-2 border rounded"
                value={formData.apartment}
                onChange={handleChange}
              />
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full sm:w-1/3 p-2 border rounded"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full sm:w-1/3 p-2 border rounded"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="zip code"
                  className="w-full sm:w-1/3 p-2 border rounded"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <PaymentMethod
                setShippingValue={setShippingValue}
                shippingValueMissing={shippingValueMissing}
              />
            </div>
          </form>
        </div>

        {/* Right Section (Order Summary) */}
        <div className="w-full lg:w-1/3 ps-5 bg-white sticky top-0 h-[calc(100vh-64px)] overflow-y-auto ">
          <div className="bg-yellow-50 p-4  rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            {cartItems?.map((item) => (
              <div key={item._id} className="mb-4">
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="flex items-center">
                    {/* <img
                    src={item.product.image_url}
                    alt="Product"
                    className="mr-2"
                  /> */}
                    <div>
                      <p className="text-sm">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.selectedShade.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold">
                    ৳ {item.singleCartTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row w-full items-center mb-4 gap-2">
              <input
                type="text"
                placeholder="Discount code"
                className="md:w-full sm:w-auto p-2 border rounded"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button
                className="w-full sm:w-auto p-2 bg-gray-200 rounded mt-2 sm:mt-0"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </div>
            <div className="space-y-2">
              <p>
                Subtotal{" "}
                <span className="float-right">৳ {total.toFixed(2)}</span>
              </p>
              <p>
                Shipping{" "}
                <span className="float-right">
                  {`৳${shippingValue}` || "৳ 0.00"}
                </span>
              </p>
              <p className="font-bold">
                Total{" "}
                <span className="float-right">
                  ৳ {(total + shippingValue).toFixed(2)}
                </span>
              </p>
            </div>
            {/* <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold mt-4"
            form="shippingForm"
          >
            Submit Order
          </button> */}
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
}
