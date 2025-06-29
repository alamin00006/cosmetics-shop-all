"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductThumbnails from "@/components/products/ProductThumbnails";
import { FaStar, FaTrophy } from "react-icons/fa";
import Link from "next/link";
import Accordion from "@/components/products/Accordion";
import NewArrivalsCarousel from "@/components/Carousel/NewArrivalsCarousel";
import Image1 from "../../../../assets/image/image-1.webp";
import Image2 from "../../../../assets/image/image-2.webp";
import Image3 from "../../../../assets/image/image-3.webp";
import Image4 from "../../../../assets/image/image-4.webp";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getTotals,
  incrementCart,
  decreaseCart,
} from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store";

// Define interfaces for type safety
interface Shade {
  name: string;
  color: string;
  image_url: string;
}

interface Product {
  name: string;
  price: number;
  currency: string;
  points_earned: number;
  available_shades: Shade[];
  description: string;
  features: string[];
  ingredients: string[];
  country_of_origin: string;
  manufacturer: string;
  address_of_manufacturer: string;
  how_to_use: string;
  shelf_life: string;
  product_code: string;
}

interface BrandInfo {
  founded: number;
  followers: string;
  locations: string;
  orders: string;
}

interface Certifications {
  authentic: string;
  shipping: string;
  payment: string;
}

interface CartItem {
  _id: string;
  price: number;
  quantity: number;
  cartQuantity: number;
  singleCartTotal: number;
  selectedShade: Shade;
  product: Product;
  brand_info: BrandInfo;
  certifications: Certifications;
}

// Simulated product data (replace with API call)
const productData = {
  _id: "1",
  product: {
    name: "Revolution Pout Lip Oil",
    price: 1800,
    currency: "BDT",
    points_earned: 660,
    available_shades: [
      {
        name: "Shade",
        color: "Snale",
        image_url: Image1.src,
      },
      {
        name: "Watermelon Pink",
        color: "Watermelon Pink",
        image_url: Image2.src,
      },
      {
        name: "Orange Peach",
        color: "Orange Peach",
        image_url: Image3.src,
      },
      {
        name: "Honey Shimmer",
        color: "Honey Shimmer",
        image_url: Image4.src,
      },
    ],
    description:
      "A lightweight lip oil with high-shine finish that shade keeps lips hydrated again and again. Revolution Pout Lip Oil drenches your lips, gloss-free, stick-free.",
    features: [
      "Lightweight lip oil",
      "High-shine finish",
      "Hydrating formula",
      "Inspired by vitamin E, cherry seed oil, and macadamia oil",
      "Seven shimmering shades",
    ],
    ingredients: [
      "Shade - a subtle sheen with dark flecks",
      "Watermelon Pink - a subtle light pink",
      "Orange Peach - a high-shine orange",
      "Honey Shimmer - a subtle sheen with gold flecks",
    ],
    country_of_origin: "China",
    manufacturer: "Revolution Beauty",
    address_of_manufacturer:
      "Unit 4B, Sheet Glass Road, Culvert, Queensborough, NE13 9JS",
    how_to_use: "Apply to lips as needed.",
    shelf_life: "24 Months",
    product_code: "REV12345",
  },
  brand_info: {
    founded: 2012,
    followers: "2K+",
    locations: "25+",
    orders: "10M+",
  },
  certifications: {
    authentic: "100% Authentic",
    shipping: "Free Shipping",
    payment: "Secured Payment",
  },
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
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
      setProduct(productData.product);
      setSelectedShade(productData.product.available_shades[0] || null);
      setMainImage(
        productData.product.available_shades[0]?.image_url || Image1.src
      );
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
      const index = product.available_shades.findIndex(
        (shade) => shade.image_url === image
      );
      setMainImage(image);
      setCurrentImageIndex(index !== -1 ? index : 0);
      setSelectedShade(product.available_shades[index]);
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
      brand_info: productData.brand_info,
      certifications: productData.certifications,
    };

    if (change > 0) {
      dispatch(incrementCart(cartItem));
    } else if (change < 0) {
      dispatch(decreaseCart(cartItem));
    }
  };

  const handleShadeChange = (shade: Shade) => {
    setSelectedShade(shade);
    setMainImage(shade.image_url);
    setCurrentImageIndex(
      product?.available_shades.findIndex((s) => s.name === shade.name) || 0
    );
    // Quantity will be updated via useEffect based on the new selected shade
  };

  const handleNextImage = () => {
    if (product) {
      const newIndex =
        (currentImageIndex + 1) % product.available_shades.length;
      setCurrentImageIndex(newIndex);
      setMainImage(product.available_shades[newIndex].image_url);
      setSelectedShade(product.available_shades[newIndex]);
    }
  };

  const handlePrevImage = () => {
    if (product) {
      const newIndex =
        currentImageIndex === 0
          ? product.available_shades.length - 1
          : currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setMainImage(product.available_shades[newIndex].image_url);
      setSelectedShade(product.available_shades[newIndex]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedShade) {
      alert("Please select a shade before adding to cart.");
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
        brand_info: productData.brand_info,
        certifications: productData.certifications,
      };

      dispatch(addToCart(cartItem));
      dispatch(getTotals());
    }
  };

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const accordionItems = [
    {
      title: "Details",
      content: product.description,
    },
    {
      title: "How To Use",
      content: product.how_to_use,
    },
    {
      title: "Ingredients",
      content: product.ingredients.join(", "),
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <Image
              src={mainImage}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg shadow-md"
              onError={() =>
                setMainImage(
                  `https://via.placeholder.com/400?text=${product.name}`
                )
              }
            />
          </div>
          <div className="mt-4">
            <ProductThumbnails
              thumbnails={product.available_shades.map(
                (shade) => shade.image_url
              )}
              onThumbnailClick={handleThumbnailClick}
              mainImage={mainImage}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
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
              Earn {product.points_earned} points on this purchase.{" "}
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
              {product.available_shades.map((shade) => (
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

          {/* Product Information */}
          <div className="text-sm text-gray-600 mb-4">
            <p className="mb-2">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="mb-2">
              <strong>SKU:</strong> {product.product_code}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> Lip Care
            </p>
            <p className="mb-2">
              <strong>Tags:</strong> {product.features.join(", ")}
            </p>
          </div>

          {/* Back Button */}
          <button
            className="text-sm text-gray-600 hover:underline"
            onClick={() => router.back()}
            aria-label="Back to products"
          >
            Back to Products
          </button>
        </div>
      </div>

      {/* Accordion Component */}
      <div className="mt-4">
        <Accordion items={accordionItems} />
      </div>

      <NewArrivalsCarousel />
    </main>
  );
}
