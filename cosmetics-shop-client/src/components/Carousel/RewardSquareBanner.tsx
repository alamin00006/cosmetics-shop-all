"use client";

import Link from "next/link";

const RewardSquareBanner: React.FC = () => {
  // Desktop video
  const desktopVideoSrc =
    "https://hokmakeup.com/cdn/shop/videos/c/vp/1d22d719572e4e41ab94bdc896101328/1d22d719572e4e41ab94bdc896101328.SD-480p-1.5Mbps-43646755.mp4?v=0";

  // Mobile video
  const mobileVideoSrc =
    "https://hokmakeup.com/cdn/shop/videos/c/vp/02859b7ef98f46658e94f16b9bbe5d43/02859b7ef98f46658e94f16b9bbe5d43.SD-480p-1.5Mbps-43646957.mp4?v=0";

  return (
    <Link href="/collections/buy-any-3-at-949" className="block w-full">
      {/* Desktop Video (Hidden on Mobile) */}
      <div className="hidden md:block">
        <video
          src={desktopVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover"
        >
          <source src={desktopVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Mobile Video (Visible on Mobile) */}
      <div className="block md:hidden">
        <video
          src={mobileVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover"
        >
          <source src={mobileVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Link>
  );
};

export default RewardSquareBanner;
