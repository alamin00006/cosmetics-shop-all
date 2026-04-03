"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface CartSidebarProps {
  children?: React.ReactNode;
}

export const CartSidebar = ({ children }: CartSidebarProps) => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  
  const shippingThreshold = 75;
  const isFreeShipping = totalPrice >= shippingThreshold;
  const remainingForFreeShipping = shippingThreshold - totalPrice;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      {/* Trigger button for navbar */}
      {children && (
        <div onClick={() => setIsCartOpen(true)}>
          {children}
        </div>
      )}
      
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="flex items-center gap-3 text-lg font-display font-semibold">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4"
            >
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </motion.div>
            <h3 className="font-display font-semibold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm text-center mb-6">
              Discover our amazing products and add them to your cart
            </p>
            <SheetClose asChild>
              <Link to="/products">
                <Button className="rounded-full">
                  Start Shopping
                </Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            {!isFreeShipping && (
              <div className="px-6 py-3 bg-secondary/30 border-b border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Add <span className="font-semibold text-primary">${remainingForFreeShipping.toFixed(2)}</span> more for free shipping!
                </p>
                <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((totalPrice / shippingThreshold) * 100, 100)}%` }}
                    className="h-full bg-primary rounded-full"
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedColor?.hex || 'default'}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="py-4 border-b border-border/50 last:border-0"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary/30 border border-border/50">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.product.id}`}>
                          <h4 className="font-medium text-foreground text-sm line-clamp-2 hover:text-primary transition-colors">
                            {item.product.name}
                          </h4>
                        </Link>
                        
                        {/* Selected Color Variant */}
                        {item.selectedColor && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <span
                              className="w-4 h-4 rounded-full border border-border shadow-sm"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {item.selectedColor.name}
                            </span>
                          </div>
                        )}
                        
                        <p className="text-primary font-semibold mt-1">
                          ${item.product.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded-full bg-secondary/30">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full hover:bg-primary/10"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor?.hex)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full hover:bg-primary/10"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor?.hex)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Delete Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeFromCart(item.product.id, item.selectedColor?.hex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            {/* Footer - Summary */}
            <div className="border-t border-border bg-card p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              
              {/* Shipping */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className={cn(
                  "font-medium",
                  isFreeShipping ? "text-green-600" : "text-foreground"
                )}>
                  {isFreeShipping ? "Free" : "$5.99"}
                </span>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-display font-bold text-lg text-foreground">
                  ${(totalPrice + (isFreeShipping ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-2">
                <SheetClose asChild>
                  <Link to="/checkout" className="block">
                    <Button className="w-full rounded-full font-semibold shadow-lg shadow-primary/20">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/products" className="block">
                    <Button variant="outline" className="w-full rounded-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
