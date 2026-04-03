"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Shop", path: "/products" },
  { icon: ShoppingBag, label: "Cart", path: "/cart" },
  { icon: Heart, label: "Wishlist", path: "/dashboard/wishlist" },
  { icon: User, label: "Account", path: "/dashboard" },
];

export const MobileNavbar = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  const getPath = (item: (typeof navItems)[0]) => {
    if (
      !isAuthenticated &&
      (item.path === "/dashboard/wishlist" || item.path === "/dashboard")
    ) {
      return "/auth";
    }
    return item.path;
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border md:hidden safe-area-bottom"
    >
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const targetPath = getPath(item);

          return (
            <Link
              key={item.label}
              href={targetPath}
              className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[64px]"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center gap-1 ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <div className="relative">
                  <item.icon
                    className="h-6 w-6"
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {item.label === "Cart" && totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground rounded-full">
                      {totalItems > 9 ? "9+" : totalItems}
                    </Badge>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};
