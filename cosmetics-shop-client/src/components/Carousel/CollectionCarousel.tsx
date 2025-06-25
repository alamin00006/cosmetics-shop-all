/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SliderContainer from "../Container/SliderContainer";

interface CollectionItem {
  label: string;
  imageUrl: string;
}

const collectionItems: CollectionItem[] = [
  { label: '', imageUrl: 'https://hokmakeup.com/cdn/shop/files/Skin_b07f8aec-247a-4d6b-9919-2d7d7647a35e.jpg?v=1744972602&width=1920' },
  { label: '', imageUrl: 'https://hokmakeup.com/cdn/shop/files/Hair_b6e32764-348f-4459-ba87-00b46e064c15.jpg?v=1744972602&width=1920' },
  { label: '', imageUrl: 'https://hokmakeup.com/cdn/shop/files/Organizers.jpg?v=1744972602&width=1920' },
  { label: '', imageUrl: 'https://hokmakeup.com/cdn/shop/files/Bath_Body_0069d3a4-6ae2-4598-8bbe-c77158012105.jpg?v=1744972602&width=1920' },
  { label: '', imageUrl: 'https://hokmakeup.com/cdn/shop/files/Fragrance_7ab772ad-cbec-4387-88f1-5a2920f670b6.jpg?v=1744972602&width=1920' },
  { label: '', imageUrl: 'https://hokmakeup.com/cdn/shop/files/Combos_and_Kits_bf9d2d7b-7fcb-4535-9272-9c02e48175e6.jpg?v=1744972602&width=1920' },
  { label: '', imageUrl: 'https://hokmakeup.com/cdn/shop/files/Best_Sellers_29cdb50f-dbd0-411f-9b10-5a3498ab5fc2.jpg?v=1744972602&width=1920' },
  { label: '', imageUrl: 'https://hokmakeup.com/cdn/shop/files/Makeup_4f71f507-47c5-4cba-9985-a77d2d010b04.jpg?v=1744972602&width=1920' },
];

const CollectionCarousel: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="py-10 bg-white">
      <SliderContainer className={" "}>
        <div className="relative">
          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={4}
            slidesPerView={3} // Show 3 images on mobile by default
            speed={800} // Increased transition speed for smoother sliding (800ms)
            grabCursor={true} // Adds a grabbing cursor for better UX
            resistanceRatio={0.85} // Slightly reduces resistance at edges for smoother feel
            onInit={(swiper) => {
            
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              424: { slidesPerView:2.4, spaceBetween: 8 }, // Still 3 images on smaller screens
              768: { slidesPerView: 3, spaceBetween: 10 }, // 4 images on tablet (optional intermediate step)
              1024: { slidesPerView: 6.5, spaceBetween: 12 }, // 6.5 images on PC (unchanged)
            }}
            className="smooth-swiper"
          >
            {collectionItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                <div className="w-44 h-44 sm:w-24 sm:h-24 md:w-64 md:h-64 min-w-0 bg-pink-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.label}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=' + item.label;
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

          {/* Inline CSS for smooth transitions */}
          <style jsx>{`
            .smooth-swiper .swiper-slide {
              transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
          `}</style>
        </div>
      </SliderContainer>
    </div>
  );
};

export default CollectionCarousel;