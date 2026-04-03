import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PromoSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-blush/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* First Promo Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-rose-gold/10 to-champagne/20 p-10 md:p-12 group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-rose-gold/20 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-sm">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Gift className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Limited Time Offer
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                The Glow Kit
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Get our bestselling skincare trio at 30% off. Includes Radiance
                Serum, Hydrating Cream & Vitamin C Boost.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="font-display text-4xl font-bold text-primary">
                  $89
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  $127
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Save 30%
                </span>
              </div>

              <Link href="/products">
                <Button variant="hero" size="lg" className="group/btn">
                  Shop Now
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Product Image */}
            <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 opacity-20 md:opacity-100">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80"
                alt="Glow Kit Products"
                className="w-32 md:w-48 rounded-2xl shadow-lg transform rotate-6 group-hover:rotate-3 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Second Promo Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-champagne/30 via-nude/20 to-blush/20 p-10 md:p-12 group"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-champagne/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-sm">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/30 border border-champagne/40 mb-6">
                <Sparkles className="h-4 w-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">
                  New Arrivals
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Rose Collection
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Discover our new rose-infused luxury line. Delicate fragrances
                meet powerful skincare benefits.
              </p>

              <Link href="/products?category=fragrance">
                <Button
                  variant="outline"
                  size="lg"
                  className="group/btn border-foreground/20 hover:bg-foreground/5"
                >
                  Explore Collection
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Product Image */}
            <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 opacity-20 md:opacity-100">
              <img
                src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=300&auto=format&fit=crop&q=80"
                alt="Rose Collection"
                className="w-32 md:w-48 rounded-2xl shadow-lg transform -rotate-6 group-hover:-rotate-3 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-card rounded-3xl p-12 border border-border"
        >
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Join the BellaLuxe Beauty Club
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Subscribe for exclusive offers, beauty tips, and early access to new
            collections
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <Button variant="hero" className="rounded-full px-8">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
