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

                  {/* Shade Selection */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Select Shade:
                    </p>
                    <div className="flex items-center space-x-3">
                      {selectedItem.shades.map((shade, shadeIndex) => (
                        <div
                          key={shadeIndex}
                          className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                            selectedShade === shade
                              ? "border-pink-500"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: shade }}
                          onClick={() => handleShadeSelect(shade)}
                          title={shade}
                        />
                      ))}
                    </div>
                    {selectedShade && (
                      <p className="text-sm text-gray-600 mt-2">
                        Selected Shade:{" "}
                        <span className="font-medium">{selectedShade}</span>
                      </p>
                    )}
                  </div>

                  {/* Product Features (similar to the image) */}
                  <div className="text-sm text-gray-600 space-y-2">
                    <p className="font-medium">Features:</p>
                    <ul className="list-disc pl-4">
                      <li>Smooth, Creamy Texture - No Brushes Needed</li>
                      <li>Twist-Up Crayon for Quick, Smooth Use</li>
                      <li>Long-Lasting, Intense Color Payoff</li>
                      <li>2-in-1 Design: Eyeshadow & Eyeliner</li>
                    </ul>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">
                  No item selected. Please select a product to view details.
                </p>
              )}
            </DrawerBody>
            <DrawerFooter className="border-t border-gray-200 pt-2">
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="uppercase"
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
                  className="uppercase"
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
