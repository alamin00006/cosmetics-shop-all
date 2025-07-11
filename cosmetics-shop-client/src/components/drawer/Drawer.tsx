import { addToCart, getTotals } from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface AddToCartDrawerProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedItem: Product | null;
}

const AddToCartDrawer: FC<AddToCartDrawerProps> = ({
  isOpen,
  onOpenChange,
  selectedItem,
}) => {
  const dispatch = useDispatch();
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  // Update totals whenever cartItems change
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const discount = selectedItem
    ? ((selectedItem.price / 100) * selectedItem.discount).toFixed(2)
    : "0.00";
  const discountPrice = selectedItem
    ? selectedItem.price - Math.ceil(Number(discount))
    : 0;
  // State to track the selected shade
  const [selectedShade, setSelectedShade] = useState<any | null>(null);

  // Function to handle shade selection
  const handleShadeSelect = (shade: any) => {
    setSelectedShade(shade);
  };

  const drawerCloser = (onClose: () => void) => {
    onClose();
  };
  const handleAddToCart = () => {
    if (!selectedShade) {
      toast.error("Please select a shade before adding to cart.");
      return;
    }

    if (selectedItem) {
      const cartItem: CartItem = {
        _id: selectedItem._id,
        price: selectedItem.price,
        quantity: 100, // Default stock quantity, adjust as needed
        cartQuantity: 1, // Use the current UI quantity
        singleCartTotal: selectedItem.price * 1,
        selectedShade,
        product: selectedItem,
        // brand_info: product.brand_info,
        // certifications: product.certifications,
      };

      dispatch(addToCart(cartItem));
      dispatch(getTotals());
      drawerCloser(onOpenChange);
      toast.success("Item added to cart successfully!");
    }
  };

  // Find the image for the selected shade
  const selectedShadeImage = selectedItem
    ? (selectedItem.availableShades.find(
        (shade) => shade.color === selectedShade
      )?.image ??
      selectedItem.availableShades[0]?.image ??
      "/placeholder.png")
    : "/placeholder.png";

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(onClose: () => void) => (
          <>
            <DrawerHeader className="flex flex-col gap-2 border-b border-gray-200 pb-2">
              {selectedItem ? (
                <>
                  <h2 className="text-lg font-bold text-gray-800 uppercase">
                    {selectedItem.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-800">
                      ৳ {selectedItem.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ৳ {discountPrice}
                    </span>
                    <span className="text-sm text-pink-500 font-medium">
                      {selectedItem.discount} % Off
                    </span>
                  </div>
                </>
              ) : (
                <h2 className="text-lg font-bold text-gray-800 uppercase">
                  Select a Product
                </h2>
              )}
            </DrawerHeader>
            <DrawerBody className="py-4">
              {selectedItem ? (
                <>
                  <div className="">
                    {/* Main Container */}
                    <div className="">
                      {/* Product Image and Details */}
                      <div className="flex flex-col items-center gap-4">
                        {/* Product Image */}
                        <div className="flex justify-center mb-4">
                          <Image
                            src={selectedShadeImage}
                            alt={selectedItem.name}
                            className="w-full h-[300px] duration-300"
                            width={310}
                            height={200}
                          />
                        </div>
                        {/* Product Description */}
                      </div>

                      {/* Price and Points Section */}
                      <div className="mt-6 text-center">
                        <p className="text-gray-700">
                          🎯 Earn up to 536 points on this purchase
                        </p>
                        <p className="text-xl font-semibold text-green-600 mt-2">
                          ৳ {selectedItem.price} {""}
                          <span className="text-sm text-gray-500 line-through">
                            ৳ {discountPrice}
                          </span>
                          <span className="text-red-500 line-through ml-2">
                            {selectedItem.discount}% Off
                          </span>
                        </p>
                      </div>

                      {/* Available Offers */}
                      <div className="mt-4">
                        <div className="bg-pink-100 p-2 rounded-t">
                          <span className="text-pink-800 font-semibold">
                            % Available Offers
                          </span>
                        </div>
                        <div className="border border-pink-200 p-2 rounded-b mt-2">
                          <select
                            className="w-full p-2 border-none focus:outline-none"
                            onChange={(e) => handleShadeSelect(e.target.value)}
                          >
                            {selectedItem.availableShades.map(
                              (shade, shadeIndex) => (
                                <option key={shadeIndex} value={shade.color}>
                                  {shade.name}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>

                      {/* Color Swatches */}
                      <div className="flex items-center space-x-1 mt-4 mb-2">
                        {selectedItem.availableShades.map(
                          (shade, shadeIndex) => (
                            <div
                              key={shadeIndex}
                              className={`md:w-8 md:h-8 sm:w-5 sm:h-5 rounded-full border ${
                                selectedShade === shade.color
                                  ? "border-indigo-500 ring-2 ring-indigo-500"
                                  : "border-gray-300"
                              } cursor-pointer`}
                              style={{ backgroundColor: shade.color }}
                              onClick={() => handleShadeSelect(shade.color)}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">
                  No item selected. Please select a product to view details.
                </p>
              )}
            </DrawerBody>
            <DrawerFooter className="border-t border-gray-200 pt-2 flex flex-col sm:flex-row gap-2 px-4 sm:px-6 lg:px-8">
              {selectedItem && (
                <Button
                  onPress={handleAddToCart}
                  className="uppercase w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                >
                  Add to Bag
                </Button>
              )}
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </Drawer>
  );
};

export default AddToCartDrawer;
