import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
} from "lucide-react";
import { useAppSelector } from "@/store/store";
import Link from "next/link";

const navCategories = [
  "Makeup",
  "Skincare",
  "Haircare",
  "Brands",
  "New Arrivals",
  "Best Sellers",
  "Offers",
];

const megaMenuItems: Record<string, string[]> = {
  Makeup: ["Face", "Eyes", "Lips", "Cheeks", "Brushes & Tools", "Palettes"],
  Skincare: [
    "Moisturizers",
    "Serums",
    "Cleansers",
    "Treatments",
    "SPF",
    "Masks",
  ],
  Haircare: [
    "Shampoo",
    "Conditioner",
    "Treatments",
    "Styling",
    "Oils",
    "Tools",
  ],
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = useAppSelector((s) =>
    s.cart.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const wishlistCount = useAppSelector((s) => s.wishlist.items.length);

  return (
    <>
      <header className="sticky top-0 z-50 bg-card shadow-sm">
        {/* Top promo bar */}
        <div className="bg-primary text-primary-foreground text-center text-xs py-2 font-body tracking-wide font-medium">
          🎉 FREE SHIPPING on orders over $50 | Use code{" "}
          <span className="font-bold">GLOW20</span> for 20% off!
        </div>

        {/* Main nav */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-2xl font-extrabold tracking-tight"
            >
              <span className="text-gradient">HOK</span>
              <span className="text-foreground">makeup</span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  placeholder="Search for products, brands..."
                  className="w-full bg-muted rounded-full px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground pr-10"
                />
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-foreground/70 hover:text-primary transition-colors"
              >
                <Search size={20} />
              </button>
              <Link
                href="#"
                className="hidden sm:flex p-2 text-foreground/70 hover:text-primary transition-colors"
              >
                <User size={20} />
              </Link>
              <Link
                href="/wishlist"
                className="p-2 text-foreground/70 hover:text-primary transition-colors relative"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className="p-2 text-foreground/70 hover:text-primary transition-colors relative"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Category nav bar */}
        <div className="border-t border-border hidden lg:block">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center gap-1">
              {navCategories.map((cat) => (
                <div
                  key={cat}
                  className="relative"
                  onMouseEnter={() => megaMenuItems[cat] && setMegaOpen(cat)}
                  onMouseLeave={() => setMegaOpen(null)}
                >
                  <Link
                    href={
                      cat === "Offers" ||
                      cat === "New Arrivals" ||
                      cat === "Best Sellers" ||
                      cat === "Brands"
                        ? "/products"
                        : `/products?category=${cat}`
                    }
                    className={`flex items-center gap-1 text-xs font-heading font-semibold uppercase tracking-wider px-4 py-3 transition-colors hover:text-primary ${
                      megaOpen === cat ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {cat}
                    {megaMenuItems[cat] && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${megaOpen === cat ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {megaOpen === cat && megaMenuItems[cat] && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl shadow-2xl p-5 min-w-[220px] z-50"
                      >
                        {megaMenuItems[cat].map((item) => (
                          <Link
                            key={item}
                            href={`/products?category=${cat}&sub=${item}`}
                            className="block text-sm text-foreground/70 hover:text-primary hover:bg-secondary/50 rounded-md px-3 py-2 transition-colors"
                          >
                            {item}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden md:hidden"
            >
              <div className="px-4 py-3">
                <input
                  autoFocus
                  placeholder="Search products, brands..."
                  className="w-full bg-muted rounded-full px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-50 bg-card overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-heading text-lg font-extrabold">
                    <span className="text-gradient">HOK</span>makeup
                  </span>
                  <button onClick={() => setMobileOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
                {navCategories.map((cat) => (
                  <div key={cat} className="border-b border-border py-3">
                    <Link
                      href={`/products?category=${cat}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-heading font-semibold text-foreground uppercase tracking-wider"
                    >
                      {cat}
                    </Link>
                    {megaMenuItems[cat] && (
                      <div className="flex flex-col gap-1 mt-2 pl-3">
                        {megaMenuItems[cat].map((item) => (
                          <Link
                            key={item}
                            href={`/products?category=${cat}&sub=${item}`}
                            onClick={() => setMobileOpen(false)}
                            className="text-xs text-muted-foreground py-1"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
