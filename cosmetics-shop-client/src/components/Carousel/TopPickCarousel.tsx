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
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";

interface TopPickItem {
  label: string;
  imageUrl: string;
}

const topPickItems: TopPickItem[] = [
  {
    label: "FOUNDATION",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Foundation_3dd5949a-8773-4563-9e10-5ed464d72080.jpg?v=1748345090&width=1920",
  },
  {
    label: "LIP TINT",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Lip_Tint_95659052-b974-4b53-997f-9a3e6f3d58b8.jpg?v=1748345090&width=1920",
  },
  {
    label: "EYESHADOW",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Blush_94f80c59-ded7-4777-a412-c63795ee0d6c.jpg?v=1748345089&width=1920",
  },
  {
    label: "BLUSH",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Liquid_Lipstick_01c3ed0b-ca53-4876-aaa3-b0f6a60b53fc.jpg?v=1748345089&width=1920",
  },
];

const splideOptions = {
  type: "loop",
  perPage: 5,
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
const TopPickCarousel: React.FC = () => {
  return (
    <div className="">
      <h2 className="text-4xl md:text-4xl font-bold uppercase text-gray-800 mb-6 text-left">
        Top Picks
      </h2>

      <Splide options={splideOptions}>
        {topPickItems?.map((banner, index) => (
          <SplideSlide key={index}>
            <div className="">
              <Image
                src={banner.imageUrl}
                alt="Banner image"
                width={300}
                height={350}
                className="md:object-cover sm:object-contain w-[300px] h-[350px]"
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

export default TopPickCarousel;
