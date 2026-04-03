"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
}

export const AppHeader = ({
  title = "BellaLuxe",
  showSearch = true,
}: AppHeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border md:hidden"
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo / Title */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center shadow-md">
            <span className="text-primary-foreground font-display font-bold text-base">
              B
            </span>
          </div>
          <span className="font-display text-lg font-semibold text-foreground">
            {title}
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {showSearch && !isSearchOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-9 rounded-xl"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </Button>
        </div>
      </div>

      {/* Expandable Search */}
      {isSearchOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-3"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 h-10 bg-secondary/50 border-0 rounded-xl"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
