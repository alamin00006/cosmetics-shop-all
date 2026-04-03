import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { useFeaturedProducts } from "@/hooks/use-api";
import {
  ProductCardSkeleton,
  ErrorMessage,
} from "@/components/ui/loading-skeleton";
import { mapApiProductsToProducts } from "@/lib/api-client";

export const FeaturedProducts = () => {
  const { data: products, isLoading, error, refetch } = useFeaturedProducts();
  const featuredProducts = products
    ? mapApiProductsToProducts(products).slice(0, 4)
    : [];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium uppercase tracking-widest">
                Curated For You
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3">
              Bestsellers
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Our most-loved products, chosen by thousands of beauty enthusiasts
            </p>
          </div>
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="group border-primary/30 hover:bg-primary/5"
            >
              View All Products
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage
            title="Failed to load products"
            message="We couldn't fetch the featured products. Please try again."
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
