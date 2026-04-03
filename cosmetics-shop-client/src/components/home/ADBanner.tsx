"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const slides = [
  {
    id: 1,
    title: "HOK",
    subtitle: "BUILD YOUR OWN DEAL",

    bgColor: "from-violet-600 via-purple-600 to-fuchsia-500",
    image: {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a9c?w=800&fit=crop",
      alt: "Luxury Lipstick and Makeup",
      className: "w-80 md:w-[380px] rotate-6",
      position: "right-12",
    },
  },
  {
    id: 2,
    title: "GLOW UP",
    subtitle: "MIX & MATCH MAGIC",

    bgColor: "from-pink-600 via-rose-600 to-orange-500",
    image: {
      src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&fit=crop",
      alt: "Premium Makeup Products",
      className: "w-80 md:w-[380px] -rotate-6",
      position: "right-16",
    },
  },
  {
    id: 3,
    title: "LUXE LOOK",
    subtitle: "PREMIUM PICKS",

    bgColor: "from-cyan-600 via-blue-600 to-purple-600",
    image: {
      src: "https://images.unsplash.com/photo-1616401784845-6d5d0c5d5f0f?w=800&fit=crop",
      alt: "Eyeshadow Palette",
      className: "w-80 md:w-[380px] rotate-12",
      position: "right-10",
    },
  },
];

export default function ADBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <section className="container mx-auto px-4 ">
      <div className="relative rounded-full overflow-hidden h-[200px] md:h-[250px] shadow-2xl">
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} transition-all duration-700`}
        />

        <div className="relative h-full flex items-center px-8 md:px-16 z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center">
            {/* Left - Text Content */}
            <div className="md:col-span-7 space-y-5">
              <div className="text-6xl md:text-7xl font-black text-white tracking-[-2px]">
                {slide.title}
              </div>

              <h2 className="text-[54px] leading-none md:text-7xl font-bold text-white tracking-tighter drop-shadow-md">
                {slide.subtitle}
              </h2>

              <Button
                size="lg"
                className="mt-6 bg-white text-purple-700 hover:bg-white/90 font-semibold text-lg px-12 py-7 rounded-full shadow-xl hover:scale-105 transition-transform"
              >
                Shop The Deal Now
              </Button>
            </div>

            {/* Right - Single Product Image */}
            <div className="md:col-span-5 relative hidden md:flex items-center justify-center h-[320px]">
              <div
                className={`absolute ${slide.image.position} transition-all duration-700`}
              >
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  sizes="(max-width: 768px) 300px, 420px"
                  fill
                  priority={currentSlide === 0}
                  quality={90}
                />
              </div>

              {/* Combo Sticker */}
              <div className="absolute bottom-8 right-8 bg-yellow-400 text-purple-900 font-bold px-6 py-2 rounded-3xl shadow-xl rotate-[-8deg] text-sm tracking-wide">
                ✨ YOUR COMBO
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-purple-800 rounded-full z-20 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-purple-800 rounded-full z-20 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white scale-125 shadow-md"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Flash Sale Badge */}
        <div className="absolute top-8 right-8 z-20">
          <Badge className="bg-white/95 text-purple-700 px-6 py-2.5 text-base font-semibold shadow-xl">
            72 HOUR FLASH SALE
          </Badge>
        </div>
      </div>
    </section>
  );
}
