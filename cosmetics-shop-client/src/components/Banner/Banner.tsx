/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const Banner: React.FC = () => {
  // Desktop image with multiple resolutions for srcset
  const desktopImageSrc = "https://hokmakeup.com/cdn/shop/files/The_Beauty_Haul_Sale_Banner_1920x160_e9ae385e-0ddd-4d08-b8a9-7e2432ae9cc3.jpg?v=1743766095";
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
  const mobileImageSrc = "https://hokmakeup.com/cdn/shop/files/The_Beauty_Haul_Sale_Banner_550_x_275.jpg?v=1743766095";
  const mobileSrcSet = [
    { url: `${mobileImageSrc}&width=550`, width: 550 },
  ].map((set) => `${set.url} ${set.width}w`).join(", ");

  return (
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
  );
};

export default Banner;