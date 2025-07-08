import {
  Drawer,
  DrawerContent,
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
      <DrawerContent className="w-full max-w-md mx-auto ">
        {(onClose: () => void) => (
          <>
            <DrawerBody className="py-4 px-4 sm:px-6 lg:px-8">
              {selectedItem ? (
                <>
                  {/* Main Container */}
                  <div className="space-y-6">
                    {/* Bag Header */}
                    <div className="border-b pb-2 mb-4">
                      <h2 className="text-xl font-bold sm:text-2xl">
                        YOUR BAG
                      </h2>
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
                      <span className="text-sm sm:text-base">1 item(s)</span>
                      <span className="font-semibold text-base sm:text-lg">
                        Sub Total: ৳405.00
                      </span>
                    </div>

                    {/* Product Item */}
                    <div className=" rounded mb-4 flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center w-full sm:w-auto">
                        <img
                          src="https://via.placeholder.com/50x100?text=I+Heart+Revolution"
                          alt="I Heart Revolution Milkshake"
                          className="w-12 h-24 object-cover mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-base sm:text-lg">
                            I Heart Revolution Milkshake
                          </h3>
                          <p className="text-sm text-gray-600">
                            Lip & Cheek Tint
                          </p>
                          <p className="text-sm text-gray-600">
                            Colour: Pink Passion
                          </p>
                          <div className="flex items-center mt-1">
                            <button className="bg-gray-200 px-2 py-1 rounded-l text-sm sm:text-base">
                              -
                            </button>
                            <span className="px-4 py-1 bg-gray-100 text-sm sm:text-base">
                              1
                            </span>
                            <button className="bg-gray-200 px-2 py-1 rounded-r text-sm sm:text-base">
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end mt-4 sm:mt-0">
                        <span className="text-red-500 line-through text-sm sm:text-base">
                          ৳450
                        </span>
                        <span className="font-semibold text-base sm:text-lg">
                          ৳405
                        </span>
                        <button className="text-red-500 text-sm mt-1">X</button>
                      </div>
                    </div>

                    {/* Price Details */}
                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-2 text-base sm:text-lg">
                        PRICE DETAILS
                      </h3>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm sm:text-base">Total</span>
                        <span className="text-sm sm:text-base"> ৳405.00</span>
                      </div>
                      <p className="text-sm text-gray-600 bg-yellow-100 p-2 rounded">
                        Please note: Checkout to see your final total with
                        discounts and offers applied.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 text-center text-sm sm:text-base">
                  No item selected. Please select a product to view details.
                </p>
              )}
            </DrawerBody>
            <DrawerFooter className="border-t border-gray-200 pt-2 px-4 sm:px-6 lg:px-8">
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="uppercase w-full sm:w-auto"
              >
                Close
              </Button>
              {selectedItem && (
                <Button
                  color="primary"
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
                  className="uppercase w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2"
                >
                  Add to Cart
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
