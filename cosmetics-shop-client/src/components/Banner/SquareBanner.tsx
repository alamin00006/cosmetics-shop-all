/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import SliderContainer from "../Container/SliderContainer";

const SquareBanner: React.FC = () => {
  // Desktop image with multiple resolutions for srcset
  const desktopImageSrc = "https://hokmakeup.com/cdn/shop/files/Foundation_Finder_Banner_1920x463_84ec4b75-56b0-4587-b569-8426df479283.jpg?v=1741861460&width=1920";
  const desktopSrcSet = [
    { url: `${desktopImageSrc}&width=550`, width: 550 },
    { url: `${desktopImageSrc}&width=750`, width: 750 },
    { url: `${desktopImageSrc}&width=1100`, width: 1100 },
    { url: `${desktopImageSrc}&width=1500`, width: 1500 },
    { url: `${desktopImageSrc}&width=1920`, width: 1920 },
    { url: `${desktopImageSrc}&width=2000`, width: 2000 },
    { url: `${desktopImageSrc}&width=3000`, width: 3000 },
  ].map((set) => `${set.url} ${set.width}w`).join(", ");

  // Mobile image
  const mobileImageSrc = "https://hokmakeup.com/cdn/shop/files/Foundation_Finder_Banner_780x600_b209b435-1752-4842-9622-da3cfa965a64.jpg?v=1741861463&width=550";
  const mobileSrcSet = [
    { url: `${mobileImageSrc}&width=550`, width: 550 },
  ].map((set) => `${set.url} ${set.width}w`).join(", ");

  return (

    <SliderContainer className={" "}>
 <Link href="/collections/buy-any-3-at-949" className="block w-full">
      {/* Desktop Image (Hidden on Mobile) */}
      <div className="hidden md:block">
        <img
          src={`${desktopImageSrc}&width=1920`}
          alt="Beauty Haul Sale Banner"
          srcSet={desktopSrcSet}
          sizes="100vw"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      {/* Mobile Image (Visible on Mobile) */}
      <div className="block md:hidden">
        <img
          src={`${mobileImageSrc}&width=550`}
          alt="Beauty Haul Sale Banner"
          srcSet={mobileSrcSet}
          sizes="100vw"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    </Link>
    </SliderContainer>

   
  );
};

export default SquareBanner;