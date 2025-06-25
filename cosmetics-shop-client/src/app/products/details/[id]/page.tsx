"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image"; // Import Next.js Image component
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
import { getTotals, incrementCart } from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store";

// Define Product interface for type safety
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  originalPrice?: number;
  discount?: string;
  shade?: string;
  shadeImage?: string;
  pointsEarned: number;
  sku: string;
  category: string;
  tags: string[];
  colors: { id: string; name: string; color: string; image: string }[];
  images: string[];
  offers: string[];
  taxInfo?: string;
}

// Simulated product data fetch (replace with API call)
export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const dispatch = useDispatch();
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  // Update totals whenever cartItems change
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);
  const productId = (params.id as string) || searchParams.get("id") || "";

  const products: Product[] = [
    {
      id: "1",
      name: "I Heart Revolution Bath & Body Gift Set Trio – Tropical Caramel & Blossom Bloom",
      price: 1350,
      image: Image1.src, // Fallback main image
      description: "A luxurious bath and body gift set with tropical scents.",
      rating: 0,
      reviews: 0,
      originalPrice: 1500,
      discount: "10% OFF",
      shade: "Blossom Bloom",
      shadeImage: "https://via.placeholder.com/24/FFB6C1/000000?text=B",
      pointsEarned: 1350,
      sku: "SET789",
      category: "Gift Sets",
      tags: ["Bath", "Body", "Tropical"],
      colors: [
        {
          id: "blue-401",
          name: "Blue-401",
          color: "#4682B4",
          image: Image1.src,
        },
        {
          id: "pink-402",
          name: "Pink-402",
          color: "#FF69B4",
          image: Image2.src,
        },
        {
          id: "orange-403",
          name: "Orange-403",
          color: "#FFA500",
          image: Image3.src,
        },
        {
          id: "purple-404",
          name: "Purple-404",
          color: "#800080",
          image: Image4.src,
        },
        {
          id: "yellow-405",
          name: "Yellow-405",
          color: "#FFFF00",
          image: Image4.src,
        },
        {
          id: "green-406",
          name: "Green-406",
          color: "#32CD32",
          image: Image4.src,
        },
        {
          id: "white-407",
          name: "White-407",
          color: "#FFFFFF",
          image: Image4.src,
        },
        { id: "red-408", name: "Red-408", color: "#FF0000", image: Image2.src },
      ],
      images: [Image1.src, Image2.src, Image3.src, Image4.src],
      offers: [
        "Extra ₹100 OFF on orders ₹750+",
        "Extra ₹150 OFF on orders ₹1200+",
        "Extra ₹250 OFF on orders ₹1600+",
        "Offers will be applied at checkout",
      ],
      taxInfo: "Inclusive of all taxes",
    },
  ];

  useEffect(() => {
    async function loadProduct() {
      const fetchedProduct = products.find((p) => p.id === productId);

      setProduct(products[0]); // Use the first product for demonstration
      setSelectedColor(products[0].colors[0]?.id || "");
      setMainImage(products[0].colors[0]?.image || products[0].images[0] || "");
      setCurrentImageIndex(0);
    }

    loadProduct();
  }, [productId]);

  const handleThumbnailClick = (image: string) => {
    if (product) {
      const index = product.images.indexOf(image);
      setMainImage(image);
      setCurrentImageIndex(index !== -1 ? index : 0);
    }
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
    const selectedColorObj = product?.colors.find((c) => c.id === colorId);
    if (selectedColorObj) {
      setMainImage(selectedColorObj.image);
      setCurrentImageIndex(0); // Reset index for color-specific image
    }
  };

  const handleNextImage = () => {
    if (product) {
      const newIndex = (currentImageIndex + 1) % product.images.length;
      setCurrentImageIndex(newIndex);
      setMainImage(product.images[newIndex]);
    }
  };

  const handlePrevImage = () => {
    if (product) {
      const newIndex =
        currentImageIndex === 0
          ? product.images.length - 1
          : currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setMainImage(product.images[newIndex]);
    }
  };

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const accordionItems = [
    {
      title: "Details",
      content:
        "Free shipping on orders above ₹799. Delivery within 3-5 business days.",
    },
    {
      title: "How To Use",
      content: "Use during your bath routine for a luxurious experience.",
    },
    {
      title: "Ingredients",
      content: "Natural extracts, essential oils, and moisturizing agents.",
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
              thumbnails={product.images}
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
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              (
              {product.reviews === 0
                ? "No reviews"
                : `${product.reviews} reviews`}
              )
            </span>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-semibold text-gray-800">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="text-sm text-pink-500">{product.discount}</span>
            )}
            <span className="text-xs text-gray-500">{product.taxInfo}</span>
          </div>

          {/* Points Earned */}
          <div className="flex items-center mb-4">
            <FaTrophy className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-600">
              Earn {product.pointsEarned} points on this purchase.{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Learn more
              </Link>
            </span>
          </div>

          {/* Shade Selection */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Shade:{" "}
              {product.colors.find((c) => c.id === selectedColor)?.name ||
                "Select a shade"}
            </h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color.id
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.color }}
                  aria-label={`Select ${color.name}`}
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
              {product.offers.map((offer, index) => (
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
                {quantity}
              </span>
              <button
                onClick={() => dispatch(incrementCart(product))}
                className="px-2 py-1 border border-gray-300 rounded-r text-gray-600 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              className="w-full bg-black text-white py-2 rounded text-sm font-semibold uppercase hover:bg-gray-800"
              onClick={() =>
                console.log(
                  `Added ${quantity} of ${product.name} (Color: ${selectedColor}) to cart`
                )
              }
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
              <strong>SKU:</strong> {product.sku}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-2">
              <strong>Tags:</strong> {product.tags.join(", ")}
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
