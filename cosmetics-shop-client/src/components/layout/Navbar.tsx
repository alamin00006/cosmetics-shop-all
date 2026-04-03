"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  Search,
  User,
  X,
  Heart,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { CartSidebar } from "@/components/cart/CartSidebar";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "Skincare", path: "/products?category=skincare" },
  { name: "Makeup", path: "/products?category=makeup" },
  { name: "Fragrance", path: "/products?category=fragrance" },
];

export const Navbar = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        <span className="font-medium">
          ✨ Free shipping on orders over $75 • Use code BEAUTY20 for 20% off
        </span>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">
                  B
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-2xl font-semibold text-foreground">
                  BellaLuxe
                </span>
                <p className="text-xs text-muted-foreground -mt-1">
                  Beauty & Cosmetics
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm tracking-wide uppercase"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <div className="hidden sm:flex items-center">
                {isSearchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Input
                      placeholder="Search beauty products..."
                      className="h-10 bg-secondary/50 border-border focus:border-primary"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    className="hover:text-primary"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Wishlist */}
              <Link href={isAuthenticated ? "/dashboard/wishlist" : "/auth"}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex hover:text-primary"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              {/* Cart Sidebar */}
              <CartSidebar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:text-primary"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground rounded-full">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </CartSidebar>

              {/* User / Auth */}
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden sm:flex hover:text-primary"
                    >
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/orders"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/wishlist"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Heart className="h-4 w-4" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex hover:text-primary"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-background border-border w-80"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center">
                      <span className="text-primary-foreground font-display font-bold text-lg">
                        B
                      </span>
                    </div>
                    <span className="font-display text-xl font-semibold text-foreground">
                      BellaLuxe
                    </span>
                  </div>

                  {/* Mobile User Info */}
                  {isAuthenticated && user && (
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl mb-6">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <hr className="border-border my-2" />
                    <Link
                      href="/cart"
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-3 py-2"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      Shopping Bag ({totalItems})
                    </Link>
                    <Link
                      href={isAuthenticated ? "/dashboard/wishlist" : "/auth"}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-3 py-2"
                    >
                      <Heart className="h-5 w-5" />
                      Wishlist
                    </Link>
                    {isAuthenticated ? (
                      <>
                        <Link
                          href="/dashboard"
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-3 py-2"
                        >
                          <LayoutDashboard className="h-5 w-5" />
                          Dashboard
                        </Link>
                        <button
                          onClick={logout}
                          className="text-lg font-medium text-destructive hover:text-destructive/80 transition-colors flex items-center gap-3 py-2"
                        >
                          <LogOut className="h-5 w-5" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/auth"
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-3 py-2"
                      >
                        <User className="h-5 w-5" />
                        Sign In
                      </Link>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};
