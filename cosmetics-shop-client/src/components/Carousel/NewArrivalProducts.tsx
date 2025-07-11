"use client";

import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Product } from "@/types/product";
import ProductCard from "../productCard/ProductCard";

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

const NewArrivalProducts: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  return (
    <div className="py-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl md:text-4xl font-bold uppercase text-gray-800 mb-6 text-left">
          New Arrivals
        </h2>
        <Link
          href="/new-arrivals"
          className="text-black-600 text-xs font-semibold uppercase hover:underline"
        >
          View All
        </Link>
      </div>

      <Splide options={splideOptions}>
        {products?.map((item, index) => (
          <SplideSlide key={index}>
            <ProductCard item={item} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default NewArrivalProducts;
