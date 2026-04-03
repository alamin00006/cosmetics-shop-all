import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/products/ProductCard";
import { useNewArrivals } from "@/hooks/use-api";
import {
  ProductCardSkeleton,
  ErrorMessage,
} from "@/components/ui/loading-skeleton";
import { mapApiProductsToProducts } from "@/lib/api-client";

export const NewArrivals = () => {
  const { data: products, isLoading, error, refetch } = useNewArrivals();
  const newArrivals = products
    ? mapApiProductsToProducts(products).slice(0, 4)
    : [];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                  Just Dropped
                </span>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                This Week
              </Badge>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-3">
              New Arrivals
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Be the first to discover our latest tech innovations and gadgets
            </p>
          </div>
          <Link href="/products?sort=newest">
            <Button
              variant="default"
              size="lg"
              className="group shadow-lg hover:shadow-xl transition-all"
            >
              Shop New Arrivals
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage
            title="Failed to load new arrivals"
            message="We couldn't fetch the latest products. Please try again."
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -top-2 -left-2 z-10">
                  <Badge className="bg-accent text-accent-foreground font-semibold shadow-md">
                    NEW
                  </Badge>
                </div>
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Promotional Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">
                Get 15% off your first order
              </h3>
              <p className="text-muted-foreground text-sm">
                Subscribe to our newsletter for exclusive deals
              </p>
            </div>
          </div>
          <Button variant="outline" className="whitespace-nowrap">
            Subscribe Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
