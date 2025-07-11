"use client";
import { RootState } from "@/redux/store";
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseCart,
  incrementCart,
  removeFromCart,
  getTotals,
} from "@/redux/reducers/cartSlice";
import Image from "next/image";
import { characterLimit } from "@/utils/CharacterLimit";
import Link from "next/link";

interface AddToCartDrawerProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const CartDrawer: FC<AddToCartDrawerProps> = ({ isOpen, onOpenChange }) => {
  const dispatch = useDispatch();
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const handleQuantityChange = (item: any, delta: number) => {
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
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full max-w-md mx-auto">
        {(onClose: () => void) => (
          <>
            <DrawerBody className="py-4 px-4 sm:px-6 lg:px-8">
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center text-sm sm:text-base">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-6">
                  {/* Bag Header */}
                  <div className="border-b pb-2 mb-4">
                    <h2 className="text-xl font-bold sm:text-2xl">YOUR BAG</h2>
                  </div>

                  {/* Offer Banner */}
                  <div className="bg-pink-100 text-pink-800 text-sm p-2 mb-4 rounded flex flex-col sm:flex-row justify-between items-center">
                    <span>Bag It Now, Thank Us Later!</span>
                    <span className="mt-2 sm:mt-0">
                      Offer ends in: 11:49:25
                    </span>
                  </div>

                  {/* Item Summary */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2 border-b pb-2">
                    <span className="text-sm sm:text-base">
                      {cartTotalQuantity} item(s)
                    </span>
                    <span className="font-semibold text-base sm:text-lg">
                      Sub Total: ৳{cartTotalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Product Items */}
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="rounded mb-4 flex flex-col sm:flex-row items-center justify-between"
                    >
                      <div className="flex items-center w-full sm:w-auto">
                        <Image
                          src={
                            item.selectedShade.image ||
                            "https://via.placeholder.com/50x100?text=Product"
                          }
                          alt={item.product.name}
                          className="w-[100px] h-24 object-cover mr-4 rounded"
                          width={48}
                          height={96}
                          sizes="(max-width: 640px) 48px, 48px"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm ">
                            {characterLimit(item.product.name, 30)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.selectedShade.name}
                          </p>
                          <div className="flex items-center mt-1">
                            <button
                              onClick={() => handleQuantityChange(item, -1)}
                              className="bg-gray-200 px-2 py-1 rounded-l text-sm sm:text-base"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 bg-gray-100 text-sm sm:text-base">
                              {item.cartQuantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item, 1)}
                              className="bg-gray-200 px-2 py-1 rounded-r text-sm sm:text-base"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end mt-4 sm:mt-0">
                        <span className="text-red-500 line-through text-sm sm:text-base">
                          ৳{(item.price * item.cartQuantity).toFixed(2)}
                        </span>
                        <span className="font-semibold text-base sm:text-lg">
                          ৳{item.singleCartTotal.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="text-red-500 text-sm mt-1"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Price Details */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2 text-base sm:text-lg">
                      PRICE DETAILS
                    </h3>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm sm:text-base">Total</span>
                      <span className="text-sm sm:text-base">
                        ৳{cartTotalAmount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 bg-yellow-100 p-2 rounded">
                      Please note: Checkout to see your final total with
                      discounts and offers applied.
                    </p>
                  </div>
                </div>
              )}
            </DrawerBody>
            <DrawerFooter className="border-t border-gray-200 pt-2 flex flex-col sm:flex-row gap-2 px-4 sm:px-6 lg:px-8">
              {cartItems.length > 0 && (
                <Button
                  className="uppercase w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                  onPress={onOpenChange}
                >
                  <Link href="/shipping">Checkout</Link>
                </Button>
              )}
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
