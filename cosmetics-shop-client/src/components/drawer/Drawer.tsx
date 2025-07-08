import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { FC, useState } from "react";

// Define the BestSellerItem interface
interface BestSellerItem {
  label: string;
  imageUrl: string;
  imageUrl2: string;
  price: string;
  originalPrice: string;
  discount: string;
  shades: string[];
}

// Props interface for AddToCartDrawer
interface AddToCartDrawerProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedItem?: BestSellerItem | null;
}

const AddToCartDrawer: FC<AddToCartDrawerProps> = ({
  isOpen,
  onOpenChange,
  selectedItem,
}) => {
  // State to track the selected shade
  const [selectedShade, setSelectedShade] = useState<string | null>(null);

  // Function to handle shade selection
  const handleShadeSelect = (shade: string) => {
    setSelectedShade(shade);
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(onClose: () => void) => (
          <>
            <DrawerHeader className="flex flex-col gap-2 border-b border-gray-200 pb-2">
              {selectedItem ? (
                <>
                  <h2 className="text-lg font-bold text-gray-800 uppercase">
                    {selectedItem.label}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-800">
                      {selectedItem.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {selectedItem.originalPrice}
                    </span>
                    <span className="text-sm text-pink-500 font-medium">
                      {selectedItem.discount}
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
                      <div className="flex flex-col  items-center gap-4">
                        {/* Product Image */}
                        <div className="flex justify-center mb-4">
                          <img
                            src={selectedItem.imageUrl}
                            alt={selectedItem.label}
                            className="w-40 h-40 object-contain"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/150?text=" +
                                selectedItem.label;
                            }}
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
                          {selectedItem.price} {""}
                          <span className="text-sm text-gray-500 line-through">
                            {selectedItem.originalPrice}
                          </span>
                          <span className="text-red-500 line-through">
                            10% Off
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
                        <div className="border border-pink-200 p-2 rounded-b">
                          <select className="w-full p-2 border-none focus:outline-none">
                            <option>Orange</option>
                            <option>Pink</option>
                            <option>White</option>
                            <option>Purple</option>
                            <option>Yellow</option>
                            <option>Light Pink</option>
                            <option>Red</option>
                            <option>Coral</option>
                          </select>
                        </div>
                      </div>

                      {/* Color Swatches */}
                      <div className="flex justify-center gap-2 mt-4">
                        <div className="w-6 h-6 rounded-full bg-orange-400"></div>{" "}
                        {/* Orange */}
                        <div className="w-6 h-6 rounded-full bg-pink-400"></div>{" "}
                        {/* Pink */}
                        <div className="w-6 h-6 rounded-full bg-gray-200"></div>{" "}
                        {/* White */}
                        <div className="w-6 h-6 rounded-full bg-purple-300"></div>{" "}
                        {/* Purple */}
                        <div className="w-6 h-6 rounded-full bg-yellow-300"></div>{" "}
                        {/* Yellow */}
                        <div className="w-6 h-6 rounded-full bg-pink-200"></div>{" "}
                        {/* Light Pink */}
                        <div className="w-6 h-6 rounded-full bg-red-400"></div>{" "}
                        {/* Red */}
                        <div className="w-6 h-6 rounded-full bg-orange-300"></div>{" "}
                        {/* Coral */}
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
                  onPress={() => {
                    if (!selectedShade) {
                      alert("Please select a shade before adding to cart.");
                      return;
                    }
                    alert(
                      `Added to cart: ${selectedItem.label} (${selectedShade})`
                    );
                    onClose();
                  }}
                  className="uppercase w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                >
                  Add to Bag
                </Button>
              )}
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AddToCartDrawer;
