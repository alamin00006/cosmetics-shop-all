"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, X, Menu, Sparkles } from "lucide-react";
import { categoriesWithSubs, CategoryWithSubs } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  category: CategoryWithSubs;
  isExpanded: boolean;
  onToggle: () => void;
}

const CategoryItem = ({
  category,
  isExpanded,
  onToggle,
}: CategoryItemProps) => {
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between p-4 text-left transition-all duration-300 hover:bg-primary/5 group",
          isExpanded && "bg-primary/5",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{category.icon}</span>
          <div>
            <span
              className={cn(
                "font-medium text-foreground group-hover:text-primary transition-colors",
                isExpanded && "text-primary",
              )}
            >
              {category.name}
            </span>
            <p className="text-xs text-muted-foreground">
              {category.productCount} products
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-colors",
              isExpanded && "text-primary",
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-3 px-4 space-y-1">
              <Link
                href={`/products?category=${category.id}`}
                className="flex items-center gap-2 py-2 px-4 text-sm text-primary font-medium hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                View All {category.name}
              </Link>
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/products?category=${category.id}&sub=${sub.id}`}
                  className="flex items-center justify-between py-2 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{sub.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-full">
                    {sub.productCount}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CategorySidebar = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "skincare",
  );

  const handleToggle = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const SidebarContent = () => (
    <ScrollArea className="h-full">
      <div className="p-4 border-b border-border/50">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Shop by Category
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Explore our collection
        </p>
      </div>
      <div>
        {categoriesWithSubs.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isExpanded={expandedCategory === category.id}
            onToggle={() => handleToggle(category.id)}
          />
        ))}
      </div>

      {/* Promo Banner */}
      <div className="m-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-rose-gold/10 to-champagne/10 border border-primary/20">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
          Special Offer
        </p>
        <p className="font-display text-sm font-semibold text-foreground mt-1">
          20% OFF on First Order
        </p>
        <p className="text-xs text-muted-foreground mt-1">Use code: BELLA20</p>
      </div>
    </ScrollArea>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28 h-[calc(100vh-8rem)]">
        <div className="h-full bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar Trigger & Sheet */}
      <div className="lg:hidden fixed bottom-6 left-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="rounded-full shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Menu className="w-5 h-5 mr-2" />
              Categories
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Categories</SheetTitle>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
