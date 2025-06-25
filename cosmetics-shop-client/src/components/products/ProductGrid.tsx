/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  imageUrl: string;
  imageUrl2?: string;
  shades?: string[];
};

type ProductGridProps = {
  sortOption: string;
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Lipstick Matte Red",
    description: "Introducing Revolution Introducing Revolution",
    price: "$12.00",
    originalPrice: "$15.00",
    discount: "20% off",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/1_38fad031-0d21-454f-baa8-7e26e8f864c1.jpg?v=1745309269",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/2_52a563b8-979c-40f7-b1b5-2bd1618223d1.jpg?v=1745309269",
    shades: ["#FF0000", "#FF6347", "#C71585"],
  },
  {
    id: 2,
    name: "Foundation Natural Beige",
    description: "Introducing Revolution Introducing Revolution",
    price: "$25.00",
    originalPrice: "$30.00",
    discount: "17% off",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/81555229535_1.jpg?v=1745309254",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/81555229535_2.jpg?v=1745309254",
    shades: ["#F5F5DC", "#DEB887", "#D2B48C"],
  },
  {
    id: 3,
    name: "Mascara Volume Black",
    description: "Introducing Revolution Introducing Revolution",
    price: "$18.00",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/makeup-revolution-blush-icon-palette-491846.jpg?v=1745309300",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/makeup-revolution-blush-icon-palette-910294.webp?v=1745309300",
  },
  {
    id: 4,
    name: "Blush Pink Glow",
    description: "Introducing Revolution Introducing Revolution",
    price: "$20.00",
    originalPrice: "$24.00",
    discount: "15% off",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/81555964986_1.jpg?v=1745309263",
    shades: ["#FFB6C1", "#FF69B4", "#DB7093"],
  },
];

const ProductGrid: React.FC<ProductGridProps> = ({ sortOption }) => {
  const sortedProducts = [...mockProducts].sort((a, b) => {
    const aPrice = parseFloat(a.price.replace("$", "")) || 0;
    const bPrice = parseFloat(b.price.replace("$", "")) || 0;
    switch (sortOption) {
      case "lowToHigh":
        return aPrice - bPrice;
      case "highToLow":
        return bPrice - aPrice;
      case "newest":
        return b.id - a.id; // Assuming higher ID means newer
      default:
        return 0; // 'featured' or unknown -> no sorting
    }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedProducts.map((product) => (
        <div key={product.id} className="flex flex-col items-start relative">
          {/* Image Container with Hover Effect */}
          <Link
            href={`/products/all/details?id=${product.id}`}
            className="relative"
          >
            <div className="w-48 h-48 sm:w-52 sm:h-52 md:w-64 md:h-64 flex items-center justify-center overflow-hidden relative group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/150?text=${product.name}`;
                }}
                width={310}
                height={310}
              />
              {product.imageUrl2 && (
                <img
                  src={product.imageUrl2}
                  alt={product.name}
                  className="w-full h-full object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/150?text=${product.name}`;
                  }}
                  width={310}
                  height={310}
                />
              )}
              {/* Heart Icon */}
              <button className="absolute top-[80%] right-2 z-10 p-1">
                <FaHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </Link>

          {/* Product Details */}
          <h3 className="mt-1 text-xs sm:text-sm font-medium text-gray-800 text-left leading-tight">
            {product.name.split(" ").slice(0, 3).join(" ")}
            <br />
            {product.name.split(" ").slice(3).join(" ")}
          </h3>

          <h3 className="text-xs sm:text-sm text-gray-500">
            {product.description}
          </h3>

          {/* Price and Discount */}
          <div className="flex items-center space-x-1 sm:space-x-2 mt-1 pt-5">
            <span className="text-sm sm:text-base font-semibold text-gray-800">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="text-xs sm:text-sm text-pink-500">
                {product.discount}
              </span>
            )}
          </div>

          {/* Shade Selection */}
          {product.shades && (
            <div className="flex items-center space-x-1 mt-1">
              {product.shades.map((shade, shadeIndex) => (
                <div
                  key={shadeIndex}
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: shade }}
                />
              ))}
            </div>
          )}

          {/* Add To Cart Button */}
          {product.shades && (
            <button className="mt-1 px-8 py-2 sm:px-10 sm:py-2 min-w-[280px] sm:min-w-[280px] bg-white border border-gray-300 rounded-full text-sm font-semibold text-gray-800 uppercase hover:bg-gray-100">
              Add To Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
