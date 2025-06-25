/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MobileSlideContent from "./MobileSlideContent";

interface Slide {
  type: "image" | "video";
  src: string;
  alt?: string;
  showButtons: boolean;
  mobileContent?: boolean;
}

const SLIDES: ReadonlyArray<Slide> = [
  {
    type: "image",
    src: "https://hokmakeup.com/cdn/shop/files/Organizer_Desktop.jpg?v=1741249861",
    alt: "HOK Makeup Declutter in Style",
    showButtons: true,
    mobileContent: true,
  },

  {
    type: "image",
    src: "https://hokmakeup.com/cdn/shop/files/A_Pop_of_Pink_A_Dash_of_Cute_DESKTOP.jpg?v=1739193187",
    alt: "Pop of Pink Collection",
    showButtons: true,
    mobileContent: false,
  },
  {
    type: "image",
    src: "https://hokmakeup.com/cdn/shop/files/LA_Colors_Lip_Balm_Desktop.jpg?v=1740143456",
    alt: "LA Colors Lip Balm",
    showButtons: true,
    mobileContent: false,
  },
  {
    type: "video",
    src: "https://hokmakeup.com/cdn/shop/videos/c/vp/a7e5006146404823a5be9d2ddb14ab37/a7e5006146404823a5be9d2ddb14ab37.HD-720p-1.6Mbps-46491679.mp4?v=0",
    showButtons: false,
    mobileContent: false,
  },
  {
    type: "image",
    src: "https://hokmakeup.com/cdn/shop/files/Milani_Desktop.jpg?v=1744357698",
    alt: "Milani Collection",
    showButtons: true,
    mobileContent: false,
  },
] as const;

const Banner: React.FC = () => {
  const buttons = (
    <div className="flex gap-4 mt-6">
      <button className="bg-white text-black w-[160px] py-3 font-semibold uppercase hover:bg-gray-200 transition-colors duration-300">
        Shop Now
      </button>
      <button className="bg-black text-white w-[160px] py-3 font-semibold uppercase border border-white hover:bg-gray-800 transition-colors duration-300">
        Shop Brand
      </button>
    </div>
  );

  const mobileButtons = (
    <div className="flex gap-2 mt-4 sm:hidden">
      <button className="bg-white text-black w-[45%] py-2 text-sm font-semibold uppercase border border-black hover:bg-gray-200 transition-colors duration-300">
        Shop Now
      </button>
      <button className="bg-black text-white w-[45%] py-2 text-sm font-semibold uppercase hover:bg-gray-800 transition-colors duration-300">
        Shop Brand
      </button>
    </div>
  );

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/80",
          bulletActiveClass: "!bg-white !w-[24px] !rounded-md",
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        className="w-full h-[667px] sm:h-[725px]"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0  opacity-20 blur-3xl rounded-full   sm:to-black" />

              {slide.type === "video" ? (
                <video
                  className="w-full h-full object-cover sm:object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={slide.src}
                />
              ) : (
                <img
                  src={slide.src}
                  alt={slide.alt || "Slide image"}
                  className="w-full h-full object-cover sm:object-contain"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              )}

              <div
                className={`absolute z-10 ${
                  slide.showButtons
                    ? slide.mobileContent
                      ? "bottom-[3%] w-[70%] max-w-[70%] text-center sm:top-[65%] sm:left-[5%] sm:w-full sm:max-w-[160%] sm:md:max-w-[900px]"
                      : "top-[75%] left-[5%] w-full max-w-[160%] md:max-w-[900px]"
                    : "top-[65%] left-[6%] max-w-[90%] md:max-w-[500px]"
                }`}
              >
                {slide.showButtons && <MobileSlideContent />}
                {slide.showButtons &&
                  (slide.mobileContent ? mobileButtons : buttons)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        aria-label="Previous slide"
        className="swiper-button-prev-custom absolute left-4 top-1/2 z-20 -translate-y-1/2 !w-10 !h-10 !rounded-full !bg-white/20 !backdrop-blur-md hover:!bg-white/30 transition-all duration-300"
      />
      <button
        aria-label="Next slide"
        className="swiper-button-next-custom absolute right-4 top-1/2 z-20 -translate-y-1/2 !w-10 !h-10 !rounded-full !bg-white/20 !backdrop-blur-md hover:!bg-white/30 transition-all duration-300"
      />

      <style jsx global>{`
        /* Navigation Arrows */
        .swiper-button-next-custom,
        .swiper-button-prev-custom {
          display: flex !important;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          outline: none;
        }

        .swiper-button-next-custom::after,
        .swiper-button-prev-custom::after {
          content: "";
          width: 10px;
          height: 10px;
          border-right: 2px solid white;
          border-top: 2px solid white;
        }

        .swiper-button-prev-custom::after {
          transform: rotate(-135deg);
          margin-right: 2px;
        }

        .swiper-button-next-custom::after {
          transform: rotate(45deg);
          margin-left: 2px;
        }

        /* Pagination */
        .swiper-pagination-bullet {
          width: 12px;
          height: 4px;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          width: 24px;
          background: white !important;
        }

        /* Mobile Styles */
        @media (max-width: 640px) {
          .swiper-button-next-custom,
          .swiper-button-prev-custom {
            transform: scale(0.7) translateY(-50%);
          }

          .swiper-pagination-bullet {
            width: 8px;
            height: 2px;
          }

          .swiper-pagination-bullet-active {
            width: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
