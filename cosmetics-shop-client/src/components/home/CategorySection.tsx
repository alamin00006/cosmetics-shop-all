"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const categories = [
  {
    name: "Foundation",
    link: "/products?category=Foundation",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Lip Tint",
    link: "/products?category=LipTint",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Eyeshadow",
    link: "/products?category=Eyeshadow",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Blush",
    link: "/products?category=Blush",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Setting Spray",
    link: "/products?category=SettingSpray",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Mascara",
    link: "/products?category=Mascara",
    image:
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a22?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Concealer",
    link: "/products?category=Concealer",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop&auto=format",
  },
];

const CategorySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Heading */}
      <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 uppercase tracking-tight mb-6">
        Shop By Category
      </h2>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition-colors"
        >
          <ChevronLeft size={16} className="text-gray-600" />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition-colors"
        >
          <ChevronRight size={16} className="text-gray-600" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex-shrink-0"
            >
              <Link
                href={cat.link}
                className="flex flex-col items-center gap-2.5 group"
              >
                {/* Rounded rectangle card */}
                <div className="w-44 md:w-52 h-56 md:h-64 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Label */}
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-pink-500 transition-colors duration-200">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
