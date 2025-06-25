"use client";

import React from "react";
import Link from "next/link";
import SliderContainer from "./Container/SliderContainer";


interface TrendItem {
  label: string;
  imageUrl: string;
  link: string;
  isVideo?: boolean;
}

const trendItems: TrendItem[] = [
  {
    label: "Trends You Can't Miss",
    imageUrl: "https://hokmakeup.com/cdn/shop/videos/c/vp/90514734fb504836a6e14886f6092383/90514734fb504836a6e14886f6092383.SD-480p-0.9Mbps-45548618.mp4?v=0",
    link: "https://hokmakeup.com/cdn/shop/videos/c/vp/90514734fb504836a6e14886f6092383/90514734fb504836a6e14886f6092383.SD-480p-0.9Mbps-45548618.mp4?v=0",
    isVideo: true,
  },
  {
    label: "Explore Lip Oils",
    imageUrl: "https://hokmakeup.com/cdn/shop/files/Artboard_1_c973caca-d705-4b2e-9cad-37559f7c9a78.jpg?v=1744098408",
    link: "/trends/lip-oils",
    isVideo: false,
  },
  {
    label: "Explore Ultra Matte",
    imageUrl: "https://hokmakeup.com/cdn/shop/files/Artboard_2_e0c84a0f-7231-4901-8b0c-c38a5412b2ce.jpg?v=1744098408",
    link: "/trends/ultra-matte",
    isVideo: false,
  },
];

const TrendsSection: React.FC = () => {
  return (
    <section className="py-6 bg-white">
      <SliderContainer className={" "}>
        {/* Section Title */}
        <h2 className="text-4xl md:text-4xl font-bold uppercase text-gray-800 mb-6 text-left">
          Trends You Cant Miss
        </h2>

        {/* Grid Layout for Media */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Left Large Media (Video) */}
          <Link href={trendItems[0].link} className="relative block h-90 sm:h-96 md:h-[41rem] md:col-span-2">
            {trendItems[0].isVideo ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={trendItems[0].imageUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${trendItems[0].imageUrl})` }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-base sm:text-lg md:text-xl font-semibold">
                {trendItems[0].label}
              </span>
            </div>
          </Link>

          {/* Right Stacked Images */}
          <div className="flex flex-col gap-2 md:col-span-1">
            {/* Top Right Image */}
            <Link href={trendItems[1].link} className="relative block h-40 sm:h-48 md:h-80">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${trendItems[1].imageUrl})` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base md:text-lg font-semibold">
                    {trendItems[1].label}
                  </span>
                </div>
              </div>
            </Link>

            {/* Bottom Right Image */}
            <Link href={trendItems[2].link} className="relative block h-40 sm:h-48 md:h-80">
              <div
                className="w-full h-full bg-cover bg-center "
                style={{ backgroundImage: `url(${trendItems[2].imageUrl})` }}
              >
                <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base md:text-lg font-semibold">
                    {trendItems[2].label}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </SliderContainer>
    </section>
  );
};

export default TrendsSection;