import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Leaf, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush/30 via-background to-champagne/20" />
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-rose-gold/15 rounded-full blur-[80px]" />

      {/* Decorative Elements */}
      <div
        className="absolute top-32 left-10 w-20 h-20 border border-primary/20 rounded-full animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-40 right-20 w-12 h-12 bg-champagne/40 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 right-10 w-8 h-8 border border-rose-gold/30 rounded-full animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                New Spring Collection 2026
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] text-foreground">
              Reveal Your
              <span className="block gradient-text mt-2">Natural Beauty</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Discover our luxurious collection of clean, cruelty-free
              cosmetics. Formulated with natural ingredients to enhance your
              radiant glow.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button variant="hero" size="xl" className="group">
                  Shop Collection
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products?category=skincare">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-primary/30 hover:bg-primary/5"
                >
                  Explore Skincare
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 pt-6 justify-center lg:justify-start">
              {[
                { icon: Leaf, text: "100% Vegan" },
                { icon: Heart, text: "Cruelty Free" },
                { icon: Sparkles, text: "Clean Beauty" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 animate-float">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80"
                  alt="Luxury Cosmetics Collection"
                  className="w-full max-w-md mx-auto rounded-[2rem] shadow-2xl"
                  style={{
                    boxShadow: "0 25px 80px -20px hsl(350 60% 55% / 0.25)",
                  }}
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-16 top-1/4 glass-card p-5 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Bestseller
                    </p>
                    <p className="font-display text-lg font-semibold text-foreground">
                      Glow Serum
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-12 bottom-1/3 glass-card p-5 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium text-foreground">
                  4.9 Rating
                </p>
                <p className="text-xs text-muted-foreground">12k+ Reviews</p>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute -inset-8 border-2 border-dashed border-primary/10 rounded-[3rem] -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
