"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaHeart } from "react-icons/fa";
import SliderContainer from "../Container/SliderContainer";
import Link from "next/link";
import { Button, useDisclosure } from "@heroui/react";
import AddToCartDrawer from "../drawer/Drawer";

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

// Props interface for BestSellerCarousel
interface BestSellerCarouselProps {
  bestSellerlItemItems: BestSellerItem[];
}

const BestSellerCarousel: React.FC<BestSellerCarouselProps> = ({
  bestSellerlItemItems,
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<BestSellerItem | null>(null);

  // Function to handle "Select Shade" button click
  const handleSelectShade = (item: BestSellerItem) => {
    setSelectedItem(item);
    onOpen();
  };

  return (
    <div className="py-6 bg-white">
      <SliderContainer className="">
        <div className="relative">
          {/* Header with Title and View All Link */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-4xl font-bold uppercase text-gray-800 text-left">
              Best Seller
            </h2>
            <Link
              href="/new-arrivals"
              className="text-black-600 text-xs font-semibold uppercase hover:underline"
            >
              View All
            </Link>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={4}
            slidesPerView={1}
            speed={600}
            onInit={(swiper) => {
              const navigation = swiper.params.navigation as {
                prevEl?: HTMLButtonElement | null;
                nextEl?: HTMLButtonElement | null;
              };
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 8 },
              424: { slidesPerView: 1.7, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 12 },
              1024: { slidesPerView: 5, spaceBetween: 12 },
            }}
            className="smooth-swiper"
          >
            {bestSellerlItemItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-start relative">
                  {/* Image Container with Hover Effect */}
                  <Link
                    href={`/products/details/${item.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="relative"
                  >
                    <div className="w-48 h-48 sm:w-52 sm:h-52 md:w-64 md:h-64 flex items-center justify-center overflow-hidden relative group">
                      <img
                        src={item.imageUrl}
                        alt={item.label}
                        className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/150?text=" +
                            item.label;
                        }}
                        width={310}
                        height={310}
                      />
                      <img
                        src={item.imageUrl2}
                        alt={item.label}
                        className="w-full h-full object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/150?text=" +
                            item.label;
                        }}
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
                  <h3 className="mt-1 text-sm sm:text-sm font-medium text-gray-800 text-left leading-tight">
                    {item.label.split(" ").slice(0, 3).join(" ")}
                    <br />
                    {item.label.split(" ").slice(3).join(" ")}
                  </h3>
                  {/* Price and Discount */}
                  <div className="flex items-center space-x-1 sm:space-x-2 mt-1 pt-5">
                    <span className="text-sm sm:text-base font-semibold text-gray-800">
                      {item.price}
                    </span>
                    <span className="text-sm sm:text-sm text-gray-500 line-through">
                      {item.originalPrice}
                    </span>
                    <span className="text-sm sm:text-sm text-pink-500">
                      {item.discount}
                    </span>
                  </div>
                  {/* Shade Selection */}
                  <div className="flex items-center space-x-1 mt-1">
                    {item.shades.map((shade, shadeIndex) => (
                      <div
                        key={shadeIndex}
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: shade }}
                      />
                    ))}
                  </div>
                  {/* Select Shade Button */}
                  <Button
                    onPress={() => handleSelectShade(item)}
                    className="mt-1 px-3 py-1 sm:px-4 sm:py-1 md:w-75 sm:w-auto bg-white border border-gray-300 rounded-full text-xs font-semibold text-gray-800 uppercase hover:bg-gray-100"
                  >
                    Select Shade
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Inline CSS for smooth transitions */}
        <style jsx>{`
          .smooth-swiper .swiper-slide {
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          }
        `}</style>
      </SliderContainer>

      <AddToCartDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default BestSellerCarousel;
