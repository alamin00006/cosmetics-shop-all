"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const brands = [
  {
    name: "Makeup",
    link: "/products?brand=Makeup",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Combos & Kits",
    link: "/products?brand=Combos",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Skin",
    link: "/products?brand=Skincare",
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Bath & Body",
    link: "/products?brand=Bath",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Hair",
    link: "/products?brand=Hair",
    image:
      "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Fragrance",
    link: "/products?brand=Fragrance",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Nails",
    link: "/products?brand=Nails",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Tools",
    link: "/products?brand=Tools",
    image:
      "https://images.unsplash.com/photo-1631730486572-226d1f595058?w=300&h=300&fit=crop&auto=format",
  },
];

const BrandSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -260 : 260,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative container mx-auto px-4 py-10">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-6 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-pink-50 transition-colors"
      >
        <ChevronLeft size={16} className="text-gray-600" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-6 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-pink-50 transition-colors"
      >
        <ChevronRight size={16} className="text-gray-600" />
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-10 overflow-x-auto scrollbar-hide pb-2 px-6"
      >
        {brands.map((brand, i) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex-shrink-0"
          >
            <Link
              href={brand.link}
              className="flex flex-col items-center gap-3 group"
            >
              {/* Circle with pink gradient bg + brand image */}
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-gradient-to-br from-pink-300 to-pink-500 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-radial-pink opacity-60 rounded-full z-10 pointer-events-none" />
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                />
              </div>

              {/* Label */}
              <span className="text-xs md:text-sm font-medium text-gray-700 text-center group-hover:text-pink-500 transition-colors duration-200 whitespace-nowrap">
                {brand.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
