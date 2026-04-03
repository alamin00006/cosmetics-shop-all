"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);

  const handleApplyDiscount = () => {
    if (discountCode.toLowerCase() === "save10") {
      setAppliedDiscount(10);
      toast.success("Discount code applied! 10% off");
    } else if (discountCode.toLowerCase() === "save20") {
      setAppliedDiscount(20);
      toast.success("Discount code applied! 20% off");
    } else {
      toast.error("Invalid discount code");
    }
  };

  const subtotal = totalPrice;
  const discount = appliedDiscount ? (subtotal * appliedDiscount) / 100 : 0;
  const shipping = subtotal > 99 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <AppLayout mobileTitle="Cart">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 pt-8 md:pt-24 pb-8"
        >
          <div className="max-w-2xl mx-auto text-center py-12 md:py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full glass-card flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/products">
              <Button variant="hero" size="lg">
                Start Shopping
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </AppLayout>
    );
  }

  return (
    <AppLayout mobileTitle="Cart">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-4 md:pt-24 pb-8"
      >
        {/* Header - hidden on mobile */}
        <div className="hidden md:block mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {items.length} item{items.length > 1 ? "s" : ""} in your cart
          </p>
        </div>

        {/* Mobile header */}
        <div className="md:hidden mb-4">
          <p className="text-muted-foreground text-sm">
            {items.length} item{items.length > 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-4 flex gap-4"
              >
                <Link
                  href={`/product/${item.product.id}`}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-primary font-medium uppercase tracking-wider">
                        {item.product.brand}
                      </p>
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-display font-semibold text-foreground hover:text-primary transition-colors line-clamp-1 text-sm md:text-base">
                          {item.product.name}
                        </h3>
                      </Link>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        removeFromCart(item.product.id);
                        toast.success("Item removed from cart");
                      }}
                      className="text-muted-foreground hover:text-destructive h-8 w-8 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center glass-card rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 md:h-8 md:w-8"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 md:w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 md:h-8 md:w-8"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <span className="font-display text-base md:text-lg font-bold text-foreground">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-2xl p-5 md:p-6 sticky top-24">
              <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-5">
                Order Summary
              </h2>

              {/* Discount Code */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="pl-10 bg-secondary/50 border-0"
                  />
                </div>
                <Button variant="secondary" onClick={handleApplyDiscount}>
                  Apply
                </Button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button variant="hero" size="lg" className="w-full mt-5">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Free shipping on orders over $99
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Cart;
