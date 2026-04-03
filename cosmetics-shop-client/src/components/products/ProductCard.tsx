"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Heart, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, ProductColor } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors?.[0],
  );

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100,
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedColor);
    toast.success(`${product.name} added to bag!`, {
      description: selectedColor ? `Color: ${selectedColor.name}` : undefined,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleColorSelect = (e: React.MouseEvent, color: ProductColor) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-secondary/20 to-secondary/40">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badges - Top Left */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Badge className="bg-gradient-to-r from-primary to-pink-400 text-primary-foreground text-[10px] font-semibold px-3 py-1 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    NEW
                  </Badge>
                </motion.div>
              )}
              {product.isBestseller && (
                <Badge className="bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1">
                  BESTSELLER
                </Badge>
              )}
              {hasDiscount && (
                <Badge className="bg-rose-500/90 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1">
                  -{discountPercent}%
                </Badge>
              )}
              {!product.inStock && (
                <Badge
                  variant="secondary"
                  className="text-[10px] font-semibold"
                >
                  SOLD OUT
                </Badge>
              )}
            </div>

            {/* Action Buttons - Top Right */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-lg",
                  isWishlisted
                    ? "bg-rose-500 text-white"
                    : "bg-white/90 text-muted-foreground hover:bg-white hover:text-rose-500",
                )}
              >
                <Heart
                  className={cn("w-4 h-4", isWishlisted && "fill-current")}
                />
              </motion.button>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:bg-white hover:text-primary transition-all duration-300 shadow-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Add Button */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full rounded-full bg-white text-foreground hover:bg-primary hover:text-primary-foreground font-medium shadow-xl transition-all duration-300"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Bag
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            {/* Brand */}
            <p className="text-[11px] text-primary font-semibold uppercase tracking-[0.2em] font-body">
              {product.brand}
            </p>

            {/* Name */}
            <h3 className="font-display font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3.5 h-3.5",
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30",
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-foreground">
                {product.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount.toLocaleString()})
              </span>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1.5 pt-1">
                {product.colors.slice(0, 6).map((color, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleColorSelect(e, color)}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition-all duration-200 shadow-sm",
                      selectedColor?.hex === color.hex
                        ? "border-primary ring-2 ring-primary/30 scale-110"
                        : "border-white/80 hover:border-primary/50",
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 6 && (
                  <span className="text-xs text-muted-foreground font-medium ml-1">
                    +{product.colors.length - 6}
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2.5 pt-2">
              <span className="font-display text-xl font-bold text-foreground">
                ${product.price}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through font-body">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
