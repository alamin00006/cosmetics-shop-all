/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SliderContainer from "../Container/SliderContainer";
import Link from "next/link";

// Define the interface for L.A. Girl items
interface BrandOfTheWeekCarouselItem {
  label: string;
  description: string;
  imageUrl: string;
}

// L.A. Girl product data based on the image
const brandOfTheWeekCarouselItemItems: BrandOfTheWeekCarouselItem[] = [
  {
    label: "",
    description: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Correctoor-min.jpg?v=1742639361&width=1920",
  },
  {
    label: "",
    description: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Eyeliner-min.jpg?v=1742639361&width=1920",
  },
  {
    label: "",
    description: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Lip_Oil-min.jpg?v=1742639362&width=1920",
  },
  {
    label: "",
    description: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Foundation-min.jpg?v=1742639362&width=1920",
  },
  {
    label: "",
    description: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Cream_Blush-min.jpg?v=1742639362&width=1920",
  },
  {
    label: "",
    description: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Matte_Lipstick-min.jpg?v=1742639362&width=1920",
  },
];

const BrandOfTheWeekCarousel: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="py-6 bg-gradient-to-b from-pink-200 to-white">
      <SliderContainer className={" "}>
        <div className="relative">
          {/* Header with Title */}
          <div className="flex justify-center items-center mb-4">
            <h2 className="text-4xl md:text-4xl font-bold uppercase text-gray-800 mb-6 text-left">
              Brand of the Week
            </h2>
          </div>
          <div className="flex justify-center items-center mb-6">
            <h3 className="text-3xl font-bold uppercase text-pink-500 text-center">
              L.A. Girl
            </h3>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            slidesPerView={1}
            speed={600}
            onInit={(swiper) => {
              // @ts-expect-error

              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error

              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 8 },
              424: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 12 },
              1024: { slidesPerView: 5.5, spaceBetween: 12 },
            }}
            className="smooth-swiper"
          >
            {brandOfTheWeekCarouselItemItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center relative">
                  {/* Image Container */}
                  <Link
                    href={`/products/details/${item.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <div className="w-48 h-64 sm:w-52 sm:h-72 md:w-70 md:h-98 flex items-center justify-center overflow-hidden relative shadow-lg shadow-pink-100 ">
                      <img
                        src={item.imageUrl}
                        alt={item.label}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/200x300?text=" +
                            item.label;
                        }}
                        width={230}
                        height={330}
                      />
                    </div>
                  </Link>
                  {/* Product Details */}
                  <h3 className="mt-2 text-sm font-semibold text-gray-800 text-center uppercase">
                    {item.label}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-xs text-gray-600 text-center">
                      {item.description}
                    </p>
                  )}
                </div>
              </SwiperSlide>
            ))}
            {/* Navigation Arrows */}
            <button
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
            </button>
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

export default BrandOfTheWeekCarousel;
