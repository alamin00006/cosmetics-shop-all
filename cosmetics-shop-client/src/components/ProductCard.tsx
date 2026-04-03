import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toggleWishlistItem } from "@/store/wishlistSlice";
import { toast } from "sonner";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const wishlisted = useAppSelector((s) =>
    s.wishlist.items.some((p) => p.id === product.id),
  );

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group w-[220px]"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        {/* Image area */}
        <Link
          href={`/product/${product.id}`}
          className="block aspect-square overflow-hidden bg-pink-50"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Circular spinning exclusive badge (top-left) */}
        {/* {product.isExclusive && (
          <div className="absolute top-2 left-2 w-12 h-12 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
              <defs>
                <path
                  id="circle-path"
                  d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text
                fontFamily="sans-serif"
                fontSize="13"
                fontWeight="700"
                fill="#1a1a1a"
                letterSpacing="1.5"
              >
                <textPath href="#circle-path">
                  HOK EXCLUSIVE • HOK EXCLUSIVE •
                </textPath>
              </text>
            </svg>
          </div>
        )} */}

        {/* Wishlist button */}
        <button
          onClick={() => {
            dispatch(toggleWishlistItem(product));
            toast(
              wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️",
            );
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-transform hover:scale-110"
        >
          <Heart
            size={15}
            className={
              wishlisted ? "fill-rose-500 text-rose-500" : "text-gray-400"
            }
          />
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        {/* Stars + review count */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
        </div>

        {/* Product name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-2 hover:text-rose-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-0.5">
          {product.brand}
        </p>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[14px] font-bold text-gray-900">
            ৳{product.price.toFixed(0)}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] text-gray-400 line-through">
              ৳{product.originalPrice.toFixed(0)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[11px] font-bold text-rose-500">
              {discount}% Off
            </span>
          )}
        </div>

        {/* Shade swatches */}
        {product.shades && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.shades.slice(0, 3).map((shade) => (
              <button
                key={shade.name}
                title={shade.name}
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200 hover:ring-gray-500 transition-all"
                style={{ backgroundColor: shade.color }}
              />
            ))}
            {product.shades.length > 3 && (
              <span className="w-5 h-5 rounded-full border border-gray-300 text-[9px] font-bold text-gray-500 flex items-center justify-center">
                +{product.shades.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Select Shade CTA */}
        <button className="mt-3 w-full border border-gray-900 rounded-full py-2.5 text-[11px] font-bold tracking-widest uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200">
          Select Shade
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
