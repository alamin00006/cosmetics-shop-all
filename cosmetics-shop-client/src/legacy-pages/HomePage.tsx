import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Award,
  Quote,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";

import { products, categories, brands } from "@/data/products";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import CategorySection from "@/components/home/CategorySection";
import ADBanner from "@/components/home/ADBanner";
import BrandSection from "@/components/home/Brandsection";

const heroSlides = [
  {
    brand: "PINKFLASH",
    title: "Make It Last",
    subtitle: "Long-wearing formulas for your perfect look",
    cta: "SHOP NOW",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop",
  },
  {
    brand: "LUXE BEAUTY",
    title: "Bold & Beautiful",
    subtitle: "Spring Makeup Edit — Up to 40% Off",
    cta: "SHOP NOW",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&h=600&fit=crop",
  },
  {
    brand: "PURE SKIN",
    title: "Glow From Within",
    subtitle: "Discover our new skincare range",
    cta: "SHOP NOW",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=600&fit=crop",
  },
];

const quickCategories = [
  { name: "Lipstick", icon: "💄", link: "/products?category=Makeup" },
  { name: "Foundation", icon: "🧴", link: "/products?category=Makeup" },
  { name: "Skincare", icon: "✨", link: "/products?category=Skincare" },
  { name: "Brushes", icon: "🖌️", link: "/products?category=Makeup" },
  { name: "Haircare", icon: "💇‍♀️", link: "/products?category=Haircare" },
  { name: "Palettes", icon: "🎨", link: "/products?category=Makeup" },
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "Amazing products! The quality is unmatched and shipping was super fast. Will definitely order again!",
    rating: 5,
  },
  {
    name: "Emily K.",
    text: "Love the brand selection. Found all my favorite products at great prices. Customer service is excellent too!",
    rating: 5,
  },
  {
    name: "Jessica L.",
    text: "The best beauty store online! Authentic products, great deals, and the packaging is always perfect.",
    rating: 5,
  },
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trending = products.filter((p) => p.isTrending);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newProducts = products.filter((p) => p.isNew);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[65vh] overflow-hidden gradient-pink-bg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 via-foreground/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg"
          >
            <p className="text-primary font-heading font-bold text-sm uppercase tracking-widest mb-2">
              {heroSlides[currentSlide].brand}
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-background leading-tight mb-3">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-background/70 text-sm mb-6 font-body">
              {heroSlides[currentSlide].subtitle}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              {heroSlides[currentSlide].cta} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-primary" : "w-2 bg-background/50"}`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentSlide(
              (s) => (s - 1 + heroSlides.length) % heroSlides.length,
            )
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-background hover:bg-card/50 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setCurrentSlide((s) => (s + 1) % heroSlides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-background hover:bg-card/50 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </section>

      {/* Quick Category Icons - Circular */}
      <section className="container mx-auto px-4 py-8">
        <CategorySection />
      </section>
      {/*  Add Banner */}
      <ADBanner />

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">⭐ Best Sellers</h2>
          <Link
            href="/products"
            className="text-xs font-heading font-semibold text-primary hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Brands  */}

      <BrandSection />
      {/* Back In Stock / Trending */}
      <section className="gradient-pink-soft py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">🔥 Trending Now</h2>
            <Link
              href="/products"
              className="text-xs font-heading font-semibold text-primary hover:underline uppercase tracking-wider flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {trending.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Big Promo Banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=400&fit=crop"
            alt="Promotion"
            className="w-full h-[280px] md:h-[350px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 flex items-center">
            <div className="px-8 md:px-16 max-w-lg">
              <p className="text-primary-foreground/80 text-xs uppercase tracking-[0.2em] font-heading font-semibold mb-2">
                Limited Time Offer
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3 leading-tight">
                BUY ANY 3<br />
                GET 20% OFF
              </h2>
              <p className="text-primary-foreground/70 text-sm mb-5 font-body">
                Mix & match across all categories. Your beauty, your rules.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-background text-foreground px-7 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider hover:shadow-xl transition-all"
              >
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand of the Week */}
      <section className="bg-pink-section py-12">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-8">
            ✨ Brand of the Week
          </h2>
          <div className="bg-card rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-lg">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-heading font-semibold mb-1">
                Featured Brand
              </p>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground italic">
                Luxe Beauty
              </h3>
              <p className="text-sm text-muted-foreground mt-3 max-w-md leading-relaxed">
                Discover the brand everyone's talking about. Premium formulas,
                stunning shades, and cruelty-free beauty that makes you feel
                confident.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider mt-5 hover:shadow-lg transition-all"
              >
                Shop Collection <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 flex-shrink-0">
              {products
                .filter((p) => p.brand === "Luxe Beauty")
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="gradient-pink-soft py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">🆕 New Arrivals</h2>
              <Link
                href="/products"
                className="text-xs font-heading font-semibold text-primary hover:underline uppercase tracking-wider flex items-center gap-1"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {newProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customer Testimonials */}
      <section className="bg-pink-section py-12">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-2">
            Hear It From Our Customers!
          </h2>
          <p className="text-center text-xs text-muted-foreground mb-8">
            Real reviews from real beauty lovers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-sm border border-border/50"
              >
                <Quote size={20} className="text-primary/30 mb-3" />
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  {review.text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {review.name[0]}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {review.name}
                    </span>
                  </div>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
