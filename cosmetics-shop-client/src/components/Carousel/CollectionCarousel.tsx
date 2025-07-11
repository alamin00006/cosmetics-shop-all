"use client";

import React, { useRef } from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";

interface CollectionItem {
  label: string;
  imageUrl: string;
}

const collectionItems: CollectionItem[] = [
  {
    label: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Skin_b07f8aec-247a-4d6b-9919-2d7d7647a35e.jpg?v=1744972602&width=1920",
  },
  {
    label: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Hair_b6e32764-348f-4459-ba87-00b46e064c15.jpg?v=1744972602&width=1920",
  },
  {
    label: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Organizers.jpg?v=1744972602&width=1920",
  },
  {
    label: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Bath_Body_0069d3a4-6ae2-4598-8bbe-c77158012105.jpg?v=1744972602&width=1920",
  },
  {
    label: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Fragrance_7ab772ad-cbec-4387-88f1-5a2920f670b6.jpg?v=1744972602&width=1920",
  },
  {
    label: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Combos_and_Kits_bf9d2d7b-7fcb-4535-9272-9c02e48175e6.jpg?v=1744972602&width=1920",
  },
  {
    label: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Best_Sellers_29cdb50f-dbd0-411f-9b10-5a3498ab5fc2.jpg?v=1744972602&width=1920",
  },
  {
    label: "",
    imageUrl:
      "https://hokmakeup.com/cdn/shop/files/Makeup_4f71f507-47c5-4cba-9985-a77d2d010b04.jpg?v=1744972602&width=1920",
  },
];

const splideOptions = {
  type: "loop",
  perPage: 6,
  autoplay: true,
  pauseOnHover: true,
  speed: 500,

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

const CollectionCarousel: React.FC = () => {
  return (
    <div className="py-10 bg-white">
      <Splide options={splideOptions}>
        {collectionItems?.map((banner, index) => (
          <SplideSlide key={index}>
            <div className="">
              <Image
                src={banner.imageUrl}
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

export default CollectionCarousel;
