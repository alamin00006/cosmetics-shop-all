"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductThumbnails from "@/components/products/ProductThumbnails";
import { FaStar, FaTrophy } from "react-icons/fa";
import Link from "next/link";
// import Accordion from "@/components/products/Accordion";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getTotals,
  incrementCart,
  decreaseCart,
} from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store";
import { Product } from "@/types/product";
import Accordion, { AccordionItem } from "../products/Accordion";
import RelatedProducts from "../RelatedProduct/RelatedProducts";
import toast, { Toaster } from "react-hot-toast";
import { CartItem, Shade } from "@/types/cart";

// Define interfaces for type safety

const ProductDetails = ({ product }: { product: Product }) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedShade, setSelectedShade] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [displayQuantity, setDisplayQuantity] = useState<number>(1); // Local state for UI quantity
  const dispatch = useDispatch();
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  // Update totals whenever cartItems change
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const productId = (params.id as string) || searchParams.get("id") || "";

  useEffect(() => {
    async function loadProduct() {
      // Simulate fetching product by ID (replace with API call)
      //   setProduct(product.product);
      setSelectedShade(product.availableShades[0] || null);
      setMainImage(product.availableShades[0]?.image || "/placeholder.png");
      setCurrentImageIndex(0);
      setDisplayQuantity(1); // Reset quantity on page load
    }

    loadProduct();
  }, [productId]);

  // Update displayQuantity when shade changes or cart updates
  useEffect(() => {
    const currentCartItem = cartItems.find(
      (item) =>
        item._id === productId &&
        item.selectedShade.name === selectedShade?.name
    );
    setDisplayQuantity(currentCartItem ? currentCartItem.cartQuantity : 1);
  }, [selectedShade, cartItems, productId]);

  const handleThumbnailClick = (image: string) => {
    if (product) {
      const index = product.availableShades.findIndex(
        (shade) => shade.image === image
      );
      setMainImage(image);
      setCurrentImageIndex(index !== -1 ? index : 0);
      setSelectedShade(product.availableShades[index]);
    }
  };

  const handleQuantityChange = (change: number) => {
    if (!selectedShade || !product) return;

    const newQuantity = Math.max(1, displayQuantity + change); // Ensure quantity doesn't go below 1
    setDisplayQuantity(newQuantity);

    const cartItem: CartItem = {
      _id: productId,
      price: product.price,
      quantity: 100, // Default stock quantity, adjust as needed
      cartQuantity: newQuantity, // Use the updated quantity
      singleCartTotal: product.price * newQuantity,
      selectedShade,
      product,
      //   brand_info: product.brand_info,
      //   certifications: product.certifications,
    };

    if (change > 0) {
      dispatch(incrementCart(cartItem));
    } else if (change < 0) {
      dispatch(decreaseCart(cartItem));
    }
  };

  const handleShadeChange = (shade: Shade) => {
    setSelectedShade(shade);
    setMainImage(shade.image);
    setCurrentImageIndex(
      product?.availableShades.findIndex((s) => s.name === shade.name) || 0
    );
    // Quantity will be updated via useEffect based on the new selected shade
  };

  const handleNextImage = () => {
    if (product) {
      const newIndex = (currentImageIndex + 1) % product.availableShades.length;
      setCurrentImageIndex(newIndex);
      setMainImage(product.availableShades[newIndex].image);
      setSelectedShade(product.availableShades[newIndex]);
    }
  };

  const handlePrevImage = () => {
    if (product) {
      const newIndex =
        currentImageIndex === 0
          ? product.availableShades.length - 1
          : currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setMainImage(product.availableShades[newIndex].image);
      setSelectedShade(product.availableShades[newIndex]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedShade) {
      toast.error("Please select a shade before adding to cart.");
      return;
    }

    if (product) {
      const cartItem: CartItem = {
        _id: productId,
        price: product.price,
        quantity: 100, // Default stock quantity, adjust as needed
        cartQuantity: displayQuantity, // Use the current UI quantity
        singleCartTotal: product.price * displayQuantity,
        selectedShade,
        product,
        // brand_info: product.brand_info,
        // certifications: product.certifications,
      };

      dispatch(addToCart(cartItem));
      dispatch(getTotals());
    }
    toast.success("Item added to cart successfully!");
  };

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const accordionItems: AccordionItem[] = [
    {
      title: "Details",
      content: product.description,
    },
    {
      title: "How To Use",
      content: product.howToUse ?? "",
    },
    {
      title: "Ingredients",
      content: product.ingredients ?? "",
    },
    {
      title: "About The Brand",
      content: product.brand?.description ?? "",
    },
  ];

  return (
    <div className="mt-5">
      {/* Product Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Image Section */}
        <div className="col-span-12 md:col-span-6">
          <div className=" flex items-center gap-3">
            <ProductThumbnails
              thumbnails={product.availableShades.map((shade) => shade.image)}
              onThumbnailClick={handleThumbnailClick}
              mainImage={mainImage}
            />
            <Image
              src={mainImage || "/placeholder.png"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full md:h-[500px] sm:h-[300px] rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-span-12 md:col-span-6">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(0) ? "text-yellow-400" : "text-gray-300"
                }`} // Hardcoded rating as 0 per your data
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">(No reviews)</span>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-semibold text-gray-800">
              {product.currency} {product.price}
            </span>
            <span className="text-xs text-gray-500">
              Inclusive of all taxes
            </span>
          </div>

          {/* Points Earned */}
          <div className="flex items-center mb-4">
            <FaTrophy className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-600">
              Earn 200 points on this purchase.{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Learn more
              </Link>
            </span>
          </div>

          {/* Shade Selection */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Shade: {selectedShade?.name || "Select a shade"}
            </h3>
            <div className="flex gap-2">
              {product.availableShades.map((shade) => (
                <button
                  key={shade.name}
                  onClick={() => handleShadeChange(shade)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedShade?.name === shade.name
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: shade.color }}
                  aria-label={`Select ${shade.name}`}
                />
              ))}
            </div>
          </div>

          {/* Available Offers */}
          <details className="mb-4 border border-gray-200 rounded p-2">
            <summary className="text-sm font-medium text-gray-600">
              Available Offers
            </summary>
            <div className="text-sm text-gray-600 mt-2">
              {[
                "Extra ৳100 OFF on orders ৳750+",
                "Extra ৳150 OFF on orders ৳1200+",
                "Extra ৳250 OFF on orders ৳1600+",
                "Offers will be applied at checkout",
              ].map((offer, index) => (
                <p
                  key={index}
                  className={index === 3 ? "text-xs text-gray-500 mt-1" : ""}
                >
                  {offer}
                </p>
              ))}
            </div>
          </details>

          {/* Quantity Selector and Add to Bag Button */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-2 py-1 border border-gray-300 rounded-l text-gray-600 hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300 text-gray-800">
                {displayQuantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-2 py-1 border border-gray-300 rounded-r text-gray-600 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              className="w-full bg-black text-white py-2 rounded text-sm font-semibold uppercase hover:bg-gray-800"
              onClick={handleAddToCart}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Component */}
      <div className="mt-4">
        <Accordion items={accordionItems} />
      </div>

      <RelatedProducts />
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default ProductDetails;
