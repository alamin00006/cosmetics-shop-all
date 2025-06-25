/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaHeart } from "react-icons/fa";
import SliderContainer from "../Container/SliderContainer";
import Link from "next/link";

interface NewArrivalItem {
  label: string;
  imageUrl: string;
  imageUrl2: string;
  price: string;
  originalPrice: string;
  discount: string;
  shades: string[];
}

const newArrivalItems: NewArrivalItem[] = [
  {
    label: "Eveline Cosmetics Better Than Perfect Soft Matt Pressed Blush",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/1_38fad031-0d21-454f-baa8-7e26e8f864c1.jpg?v=1745309269",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/2_52a563b8-979c-40f7-b1b5-2bd1618223d1.jpg?v=1745309269",
    price: "৳715",
    originalPrice: "৳795",
    discount: "10% OFF",
    shades: ["#FFB6C1", "#FF6347", "#A0522D"],
  },
  {
    label: "Makeup Revolution Blush Icon Palette",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/81555229535_1.jpg?v=1745309254",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/81555229535_2.jpg?v=1745309254",
    price: "৳716",
    originalPrice: "৳795",
    discount: "10% OFF",
    shades: ["#FF9999", "#FF6666", "#FF3333"],
  },
  {
    label: "L.A. Girl On Cloud Nine Bouncy Eyeshadow",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/makeup-revolution-blush-icon-palette-491846.jpg?v=1745309300",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/makeup-revolution-blush-icon-palette-910294.webp?v=1745309300",
    price: "৳896",
    originalPrice: "৳995",
    discount: "10% OFF",
    shades: ["#D2B48C", "#A0522D", "#8B4513"],
  },
  {
    label: "L.A. Girl On Cloud Nine Bouncy Blush & Bronzer",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/81555964986_1.jpg?v=1745309263",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/81555964986_2.jpg?v=1745309263",
    price: "৳896",
    originalPrice: "৳995",
    discount: "10% OFF",
    shades: ["#FF6347", "#FF4500", "#FF4040"],
  },
  {
    label: "I Heart Revolution Tropical Trip Body Cream Trio",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/1_38fad031-0d21-454f-baa8-7e26e8f864c1.jpg?v=1745309269",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/2_52a563b8-979c-40f7-b1b5-2bd1618223d1.jpg?v=1745309269",
    price: "৳1,350",
    originalPrice: "৳1,500",
    discount: "৳10% OFF",
    shades: ["#FFB6C1", "#FF69B4", "#FF1493"],
  },
  {
    label: "Liquid Lipstick",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/1_ff857fec-df6e-4e6b-a63c-ee34e5ede6e0.jpg?v=1745309271",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/2_71ba344a-82fe-41c3-b2b1-178b119a2298.jpg?v=1745309271",
    price: "৳599",
    originalPrice: "৳699",
    discount: "14% OFF",
    shades: ["#FF4040", "#FF0000", "#DC143C"],
  },
  {
    label: "Mascara",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/5057566846028_1.jpg?v=1745309754",
    imageUrl2:
      "https://hokmakeup.com/cdn/shop/files/5057566846028_2.jpg?v=1745309754",
    price: "৳499",
    originalPrice: "৳599",
    discount: "16% OFF",
    shades: ["#000000", "#333333", "#666666"],
  },
];

const NewArrivalsCarousel: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="py-6 bg-white">
      <SliderContainer className={" "}>
        <div className="relative">
          {/* Header with Title and View All Link */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-4xl md:text-4xl font-bold uppercase text-gray-800 mb-6 text-left">
              New Arrivals
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
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 8 }, // Adjusted for smaller mobile screens
              424: { slidesPerView: 1.7, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 12 },
              1024: { slidesPerView: 5, spaceBetween: 12 },
            }}
            className="smooth-swiper"
          >
            {newArrivalItems.map((item, index) => (
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
                  <h3 className="mt-1 text-xs sm:text-sm font-medium text-gray-800 text-left leading-tight">
                    {item.label.split(" ").slice(0, 3).join(" ")}
                    <br />
                    {item.label.split(" ").slice(3).join(" ")}
                  </h3>

                  {/* Price and Discount */}
                  <div className="flex items-center space-x-1 sm:space-x-2 mt-1 pt-5">
                    <span className="text-sm sm:text-base font-semibold text-gray-800">
                      {item.price}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      {item.originalPrice}
                    </span>
                    <span className="text-xs sm:text-sm text-pink-500">
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
                  <button className="mt-1 px-3 py-1 sm:px-4 sm:py-1 md:w-75 sm:w-auto bg-white border border-gray-300 rounded-full text-xs font-semibold text-gray-800 uppercase hover:bg-gray-100">
                    Select Shade
                  </button>
                </div>
              </SwiperSlide>
            ))}
            {/* Navigation Arrows */}
            {/* <button
              ref={prevRef}
              className="swiper-prev hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 z-10 p-2 bg-gray-100 rounded-full transition-colors"
            >
              <FaChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              ref={nextRef}
              className="swiper-next hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 p-2 bg-gray-100 rounded-full transition-colors"
            >
              <FaChevronRight className="w-5 h-5 text-gray-600" />
            </button> */}
          </Swiper>
        </div>

        {/* Inline CSS for smooth transitions */}
        <style jsx>{`
          .smooth-swiper .swiper-slide {
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          }
        `}</style>
      </SliderContainer>
    </div>
  );
};

export default NewArrivalsCarousel;
