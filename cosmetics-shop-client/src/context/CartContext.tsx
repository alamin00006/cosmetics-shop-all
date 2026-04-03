"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product, CartItem, ProductColor } from "@/types/product";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedColor?: ProductColor) => void;
  removeFromCart: (productId: string, colorHex?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    colorHex?: string,
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart";

const isBrowser = () => typeof window !== "undefined";

const safeGetCart = (): CartItem[] => {
  if (!isBrowser()) return [];
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const safeSetCart = (items: CartItem[]) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors (private mode/quota/etc)
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydrate from localStorage on client only
  useEffect(() => {
    setItems(safeGetCart());
  }, []);

  // Persist whenever items change (client only)
  useEffect(() => {
    safeSetCart(items);
  }, [items]);

  const addToCart = (product: Product, selectedColor?: ProductColor) => {
    setItems((prev) => {
      const itemKey = selectedColor
        ? `${product.id}-${selectedColor.hex}`
        : product.id;

      const exists = prev.some((item) => {
        const existingKey = item.selectedColor
          ? `${item.product.id}-${item.selectedColor.hex}`
          : item.product.id;
        return existingKey === itemKey;
      });

      if (exists) {
        return prev.map((item) => {
          const existingKey = item.selectedColor
            ? `${item.product.id}-${item.selectedColor.hex}`
            : item.product.id;

          return existingKey === itemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }

      return [...prev, { product, quantity: 1, selectedColor }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, colorHex?: string) => {
    setItems((prev) =>
      prev.filter((item) => {
        if (colorHex) {
          return !(
            item.product.id === productId &&
            item.selectedColor?.hex === colorHex
          );
        }
        return item.product.id !== productId;
      }),
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    colorHex?: string,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorHex);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (colorHex) {
          if (
            item.product.id === productId &&
            item.selectedColor?.hex === colorHex
          ) {
            return { ...item, quantity };
          }
          return item;
        }
        return item.product.id === productId ? { ...item, quantity } : item;
      }),
    );
  };

  const clearCart = () => setItems([]);

  const { totalItems, totalPrice } = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    return { totalItems, totalPrice };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
