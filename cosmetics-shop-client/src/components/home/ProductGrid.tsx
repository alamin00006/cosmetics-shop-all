import { motion } from "framer-motion";
import { useFeaturedProducts } from "@/hooks/use-api";
import { ProductCard } from "@/components/products/ProductCard";
import {
  ProductGridSkeleton,
  ErrorMessage,
} from "@/components/ui/loading-skeleton";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mapApiProductsToProducts } from "@/lib/api-client";

export const ProductGrid = () => {
  const {
    data: apiProducts,
    isLoading,
    error,
    refetch,
  } = useFeaturedProducts();
  const products = apiProducts ? mapApiProductsToProducts(apiProducts) : [];

  return (
    <div className="flex-1">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Curated Selection
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Bestsellers
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            Discover our most-loved products handpicked for you
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" className="rounded-full group">
            View All Products
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>

      {/* Product Grid */}
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : error ? (
        <ErrorMessage
          title="Failed to load products"
          message="We couldn't fetch the featured products. Please try again."
          onRetry={() => refetch()}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products?.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}

      {/* View More Button - Mobile */}
      <div className="mt-8 text-center lg:hidden">
        <Link href="/products">
          <Button variant="hero" size="lg" className="rounded-full">
            Explore All Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
