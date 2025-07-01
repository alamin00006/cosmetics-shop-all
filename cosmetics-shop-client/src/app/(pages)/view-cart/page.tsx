"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCart,
  getTotals,
  incrementCart,
  removeFromCart,
} from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartItems, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const [orderInstructions, setOrderInstructions] = useState("");

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const handleQuantityChange = (item: any, delta: any) => {
    const newQuantity = Math.max(1, item.cartQuantity + delta);
    const updatedItem = {
      ...item,
      cartQuantity: newQuantity,
      singleCartTotal: item.price * newQuantity,
    };

    if (delta > 0) {
      dispatch(incrementCart(updatedItem));
    } else if (delta < 0) {
      dispatch(decreaseCart(updatedItem));
    }
  };

  const handleRemoveItem = (item: any) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Your Cart</h2>
          <Link href="/" className="text-blue-500 text-sm">
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="py-2">PRODUCT</th>
                  <th className="py-2">QUANTITY</th>
                  <th className="py-2">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="py-4 pr-4">
                      <div className="flex items-center">
                        <img
                          src={
                            item.selectedShade.image_url ||
                            "https://via.placeholder.com/40"
                          }
                          alt={item.product.name}
                          className="w-10 h-10 mr-4 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.selectedShade.name}
                          </p>
                          <p className="text-sm">৳ {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                          className="px-2 py-1 border rounded-l text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300 text-gray-800">
                          {item.cartQuantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, 1)}
                          className="px-2 py-1 border rounded-r text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium">
                      ৳ {item.singleCartTotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="w-full md:w-1/2">
                <textarea
                  value={orderInstructions}
                  onChange={(e) => setOrderInstructions(e.target.value)}
                  placeholder="Order special instructions"
                  className="w-full p-2 border rounded text-sm"
                  rows={3}
                />
              </div>
              <div className="w-full md:w-1/3">
                <p className="text-sm text-gray-600">Estimated Total</p>
                <p className="text-lg font-bold">
                  ৳ {cartTotalAmount.toFixed(2)}
                </p>
                {/* <p className="text-sm text-gray-500">
                  Taxes included. Discounts and shipping calculated at checkout.
                </p> */}
              </div>
            </div>

            <Link href="/shipping-address" className="w-full block mt-6">
              <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800">
                Check out
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
