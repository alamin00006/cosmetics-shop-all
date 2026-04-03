"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Share2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { products } from "@/data/products2";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductColor } from "@/types/product";
import { cn } from "@/lib/utils";

// Helper function to determine if a color is light
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product?.colors?.[0],
  );

  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <Link to="/products">
            <Button variant="hero">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100,
      )
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedColor);
    }
    toast.success(`${quantity}x ${product.name} added to bag!`, {
      description: selectedColor ? `Color: ${selectedColor.name}` : undefined,
    });
  };

  const productImages = product.images || [
    product.image,
    product.image,
    product.image,
  ];

  return (
    <AppLayout mobileTitle={product.name} showMobileHeader={true}>
      <div className="pt-4 md:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mb-10">
            <Link
              to="/"
              className="hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              to="/products"
              className="hover:text-primary transition-colors font-medium"
            >
              Shop
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              to={`/products?category=${product.category}`}
              className="hover:text-primary transition-colors font-medium capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium truncate max-w-[180px]">
              {product.name}
            </span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-secondary/30 to-secondary/50 border border-border/50 shadow-2xl shadow-primary/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-gradient-to-r from-primary to-pink-400 text-primary-foreground text-xs font-semibold px-3 py-1.5 shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1.5" />
                      NEW ARRIVAL
                    </Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="bg-amber-500 text-white text-xs font-semibold px-3 py-1.5">
                      BESTSELLER
                    </Badge>
                  )}
                  {hasDiscount && (
                    <Badge className="bg-rose-500 text-white text-xs font-semibold px-3 py-1.5">
                      -{discountPercent}% OFF
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-5 right-5 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-primary transition-colors shadow-lg"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={cn(
                      "w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-lg",
                      isWishlisted
                        ? "bg-rose-500 text-white"
                        : "bg-white/90 text-muted-foreground hover:text-rose-500",
                    )}
                  >
                    <Heart
                      className={cn("w-5 h-5", isWishlisted && "fill-current")}
                    />
                  </motion.button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {productImages.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300",
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/30 shadow-lg"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Brand */}
              <p className="text-primary font-semibold uppercase tracking-[0.2em] text-sm">
                {product.brand}
              </p>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
                <span className="text-foreground font-semibold">
                  {product.rating}
                </span>
                <span className="text-muted-foreground">
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl font-bold text-foreground">
                  ${product.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice!.toLocaleString()}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-rose-500 border-rose-500/50 font-semibold"
                    >
                      Save $
                      {(product.originalPrice! - product.price).toFixed(0)}
                    </Badge>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-base">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Color:{" "}
                      <span className="text-primary font-semibold">
                        {selectedColor?.name}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {product.colors.length} colors available
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "relative w-12 h-12 rounded-full transition-all duration-300 shadow-md",
                          selectedColor?.hex === color.hex
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                            : "hover:ring-2 hover:ring-primary/30 hover:ring-offset-2",
                        )}
                        title={color.name}
                      >
                        <span
                          className="absolute inset-0 rounded-full border border-border/50"
                          style={{ backgroundColor: color.hex }}
                        />
                        {selectedColor?.hex === color.hex && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <Check
                              className={cn(
                                "w-5 h-5",
                                isLightColor(color.hex)
                                  ? "text-gray-800"
                                  : "text-white",
                              )}
                            />
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 py-2">
                {product.inStock ? (
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-600 font-medium">
                      In Stock — Ready to Ship
                    </span>
                  </>
                ) : (
                  <span className="text-rose-500 font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center border border-border rounded-full px-2 bg-secondary/30">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full hover:bg-primary/10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-14 text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full hover:bg-primary/10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  size="lg"
                  className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-xl shadow-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Bag — ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                {[
                  {
                    icon: Truck,
                    title: "Free Shipping",
                    desc: "Orders over $50",
                  },
                  { icon: Shield, title: "Authentic", desc: "100% genuine" },
                  {
                    icon: RotateCcw,
                    title: "Easy Returns",
                    desc: "30-day policy",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-2xl bg-secondary/30 border border-border/30"
                    whileHover={{
                      y: -2,
                      backgroundColor: "hsl(var(--primary) / 0.05)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20"
          >
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="w-full justify-start h-auto p-1.5 bg-secondary/50 rounded-full border border-border/50">
                <TabsTrigger
                  value="specifications"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2.5 font-medium transition-all"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2.5 font-medium transition-all"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2.5 font-medium transition-all"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-8">
                <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
                  {product.specifications ? (
                    <div className="divide-y divide-border/50">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-8 py-5">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          Technical Specifications
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Detailed product information
                        </p>
                      </div>

                      {/* Specifications Grid */}
                      <div className="grid md:grid-cols-2">
                        {Object.entries(product.specifications).map(
                          ([key, value], index, arr) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={cn(
                                "flex items-center justify-between px-8 py-5 gap-4 transition-colors hover:bg-secondary/30",
                                // Add right border for left column items on md+
                                index % 2 === 0 &&
                                  index < arr.length - 1 &&
                                  "md:border-r md:border-border/50",
                                // Add bottom border for all except last row
                                index < arr.length - 2 &&
                                  "border-b border-border/50",
                                index === arr.length - 2 &&
                                  "border-b border-border/50 md:border-b-0",
                                index === arr.length - 1 && "border-b-0",
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary/60" />
                                <span className="text-muted-foreground text-sm font-medium">
                                  {key}
                                </span>
                              </div>
                              <span className="text-foreground font-semibold text-right">
                                {value}
                              </span>
                            </motion.div>
                          ),
                        )}
                      </div>

                      {/* Footer Note */}
                      <div className="bg-secondary/20 px-8 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          All specifications are subject to slight variations.
                          Contact us for precise requirements.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">
                        Specifications coming soon.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-8">
                <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
                  {product.features ? (
                    <ul className="grid md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-foreground font-medium">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      Features coming soon.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="review-1" className="border-b-0">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                          <span className="text-foreground font-semibold">
                            Absolutely in love!
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">
                          "This is exactly what I was looking for. The quality
                          is exceptional and the colors are gorgeous. I've
                          received so many compliments! Will definitely be
                          purchasing more."
                        </p>
                        <p className="text-sm text-muted-foreground mt-3 font-medium">
                          — Emma S. • Verified Buyer
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="review-2" className="border-b-0">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < 4
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30",
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-foreground font-semibold">
                            Great value for money
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">
                          "Very happy with my purchase. The shipping was
                          incredibly fast and the product exceeded my
                          expectations. The packaging was beautiful too!"
                        </p>
                        <p className="text-sm text-muted-foreground mt-3 font-medium">
                          — Sarah M. • Verified Buyer
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-24"
            >
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    You May Also Love
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Handpicked for you
                  </p>
                </div>
                <Link
                  to={`/products?category=${product.category}`}
                  className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 transition-colors"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ProductDetail;
