"use client";

import { RootState } from "@/redux/store";
import { useDisclosure } from "@heroui/react";
import { Car } from "lucide-react";
import React from "react";
import { FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import CartDrawer from "../drawer/CartDrawer";

const HeaderIcons = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Function to handle "Select Shade" button click
  const handCartOpen = () => {
    onOpen();
  };
  return (
    <>
      <div className="flex items-center space-x-4 sm:space-x-6">
        {/* User */}
        <FiUser size={18} className="sm:w-5 sm:h-5 w-4 h-4" />

        {/* Wishlist */}
        <div className="relative">
          <FiHeart size={18} className="sm:w-5 sm:h-5 w-4 h-4" />
          <span className="absolute -top-2 -right-2 text-xs text-blue-600">
            (0)
          </span>
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer" onClick={() => handCartOpen()}>
          <FiShoppingBag size={18} className="sm:w-5 sm:h-5 w-4 h-4" />

          <span className="absolute -top-2 -right-2 text-xs text-blue-600">
            ({cartItems.length})
          </span>
        </div>
      </div>
      <CartDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default HeaderIcons;
