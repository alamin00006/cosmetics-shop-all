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
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";

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

const splideOptions = {
  type: "loop",
  perPage: 6,
  autoplay: true,
  pauseOnHover: true,
  speed: 500,
  gap: "1rem",
  breakpoints: {
    640: {
      perPage: 2,
    },
    768: {
      perPage: 3,
    },
    1024: {
      perPage: 4,
    },
  },
  arrows: true,
  pagination: false,
  interval: 3000,
};

const BrandOfTheWeekCarousel: React.FC = () => {
  return (
    <div className="py-6 bg-gradient-to-b from-pink-200 to-white">
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

      <Splide options={splideOptions}>
        {brandOfTheWeekCarouselItemItems?.map((item, index) => (
          <SplideSlide key={index}>
            <div className="">
              <Image
                src={item.imageUrl}
                alt="Banner image"
                width={1140}
                height={300}
                className="md:object-cover sm:object-contain w-full h-full"
                //  className="w-full h-full object-contain"
                quality={100}
                priority
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default BrandOfTheWeekCarousel;
