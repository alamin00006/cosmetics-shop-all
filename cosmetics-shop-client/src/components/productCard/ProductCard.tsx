import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import AddToCartDrawer from "../drawer/Drawer";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";

import { CartItem } from "@/types/cart";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { addToCart, getTotals } from "@/redux/reducers/cartSlice";
import toast, { Toaster } from "react-hot-toast";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const dispatch = useDispatch();

  // Update totals whenever cartItems change

  const discount = ((item.price / 100) * item.discount).toFixed(2);
  const discountPrice = item.price - Math.ceil(Number(discount));

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  // Function to handle "Select Shade" button click
  const handleSelectShadeProduct = (item: Product) => {
    setSelectedItem(item);
    onOpen();
  };

  //   const handleAddToCart = () => {
  //     if (selectedItem) {
  //       const cartItem: CartItem = {
  //         _id: selectedItem._id,
  //         price: selectedItem.price,
  //         quantity: 100, // Default stock quantity, adjust as needed
  //         cartQuantity: 1, // Use the current UI quantity
  //         singleCartTotal: selectedItem.price * 1,
  //         selectedShade,
  //         product: selectedItem,
  //         // brand_info: product.brand_info,
  //         // certifications: product.certifications,
  //       };

  //       dispatch(addToCart(cartItem));
  //       dispatch(getTotals());

  //       toast.success("Item added to cart successfully!");
  //     }
  //   };

  return (
    <div className="flex flex-col items-start relative h-[420px]">
      {/* Image Container with Hover Effect */}
      <Link href={`/${item.name}/${item._id}`} className="relative">
        <div className="w-48 h-48 sm:w-52 sm:h-52 md:w-64 md:h-64 flex items-center justify-center overflow-hidden relative group">
          {item.productImage?.length > 0 ? (
            <Image
              src={item.productImage[0].image ?? "/placeholder.png"}
              alt={item.name}
              className="w-full h-full absolute top-0 left-0 duration-300 group-hover:opacity-100"
              width={310}
              height={310}
            />
          ) : (
            <Image
              src={item.availableShades[0].image ?? "/placeholder.png"}
              alt={item.name}
              className="w-full h-full duration-300 group-hover:opacity-0"
              width={310}
              height={310}
            />
          )}

          <Image
            src={
              item.productImage?.length > 0
                ? (item.productImage[1]?.image ?? "/placeholder.png")
                : (item.availableShades?.[1]?.image ?? "/placeholder.png")
            }
            alt={item.name}
            className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            width={310}
            height={310}
          />

          {/* Heart Icon - Positioned lower on the right side */}
          <button className="absolute top-[80%] right-2 z-10 p-1">
            <FaHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </Link>
      {/* Product Details */}
      <h3 className="mt-2 text-xs sm:text-sm font-medium text-gray-800 text-left leading-tight">
        {item.name.split(" ").slice(0, 3).join(" ")}
        <br />
        {item.brand?.name}
      </h3>

      {/* Price and Discount */}
      <div className="flex items-center space-x-1 sm:space-x-2 mt-1 pt-3">
        <span className="text-sm sm:text-base font-semibold text-gray-800">
          ৳{item.price}
        </span>
        <span className="text-xs sm:text-sm text-gray-500 line-through">
          ৳{discountPrice}
        </span>
        <span className="text-xs sm:text-sm font-bold text-pink-500">
          {item.discount} % Off
        </span>
      </div>
      {/* Shade Selection */}
      {item.availableShades && item.availableShades.length > 1 ? (
        <div className="flex items-center space-x-1 mt-2 mb-2">
          {item.availableShades.map((shade, shadeIndex) => (
            <div
              key={shadeIndex}
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: shade.color }}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center space-x-1 mt-2 mb-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full " />
        </div>
      )}

      {item.productImage?.length > 0 ? (
        <button
          //   onClick={handleAddToCart}
          className="px-3 md:py-3 sm:px-4 sm:py-2 w-full bg-white border border-gray-300 rounded-full text-xs font-semibold text-gray-800 uppercase hover:bg-gray-900 hover:text-white transition-colors duration-300 mt-auto"
        >
          Add To Bag
        </button>
      ) : (
        <Button
          onPress={() => handleSelectShadeProduct(item)}
          className="px-3 md:py-3 sm:px-4 sm:py-2 w-full bg-white border border-gray-300 rounded-full text-xs font-semibold text-gray-800 uppercase hover:bg-gray-900 hover:text-white transition-colors duration-300 mt-auto"
        >
          Select Shade
        </Button>
      )}

      <AddToCartDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedItem={selectedItem}
      />
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default ProductCard;
