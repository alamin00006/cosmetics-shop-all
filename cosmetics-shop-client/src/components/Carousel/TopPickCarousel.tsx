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

interface TopPickItem {
  label: string;
  imageUrl: string;
}

const topPickItems: TopPickItem[] = [
  {
    label: "FOUNDATION",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Foundation_f8bf4221-88e0-4d51-9834-c70ec12cfab6.jpg?v=1744979624&width=1920",
  },
  {
    label: "LIP TINT",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Lip_Tint_c5ec1da5-f374-4702-8789-de879aab3a24.jpg?v=1744979624&width=1920",
  },
  {
    label: "EYESHADOW",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Blush_1c38cb28-c062-4588-9a31-6773ca875f15.jpg?v=1744979624&width=1920",
  },
  {
    label: "BLUSH",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Eyeshadow_2a1bbe9f-c7d7-4baf-bd50-6c7d51720e9f.jpg?v=1744979624&width=1920",
  },
  {
    label: "SETTING SPRAY",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Setting_Spray_75fde203-22f6-4312-b8a6-53c2da564adb.jpg?v=1744979624&width=1920",
  },
  {
    label: "LIQUID LIPSTICK",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Liquid_Lipstick_c9a9a53d-1576-4087-b976-379ac7265213.jpg?v=1744979624&width=1920",
  },
  {
    label: "MASCARA",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Mascara_20133d61-596b-473d-801e-0b6c3d173b1a.jpg?v=1744979624&width=1920",
  },
];

const TopPickCarousel: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="py-10 bg-white">
      <SliderContainer className={" "}>
        <div className="relative">
          <h2 className="text-4xl md:text-4xl font-bold uppercase text-gray-800 mb-6 text-left">
            Top Picks
          </h2>
          <Swiper
            modules={[Navigation]}
            spaceBetween={4} // Gap remains unchanged
            slidesPerView={1}
            speed={600} // Slower transition for smoother sliding (600ms)
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              424: { slidesPerView: 1.7, spaceBetween: 12 }, // Gap remains unchanged
              768: { slidesPerView: 3, spaceBetween: 10 }, // Gap remains unchanged
              1024: { slidesPerView: 5, spaceBetween: 12 }, // Gap remains unchanged
            }}
            // Adding custom class for CSS styling
            className="smooth-swiper"
          >
            {topPickItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-56 h-56 sm:w-52 sm:h-52 md:w-80 md:h-80 bg-pink-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.label}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/150?text=" + item.label;
                      }}
                    />
                  </div>
                  <h3 className="mt-4 text-sm sm:text-base md:text-base font-semibold text-gray-800 text-center">
                    {item.label}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
            {/* Navigation Arrows Inside Swiper */}
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

export default TopPickCarousel;
