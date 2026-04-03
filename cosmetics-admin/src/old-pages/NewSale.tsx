"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, User, Pencil, Send, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
interface CartItem extends Product {
  quantity: number;
}

const productsData: Product[] = [
  { id: 1, name: "Orbit Fresh Mint", price: 270.0, image: "/placeholder.svg" },
  {
    id: 2,
    name: "Pillsbury Best Whole Wheat Flour",
    price: 300.0,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Heinz Tomato Ketchup",
    price: 231.2,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Praise Daily Style Mayonnaise",
    price: 161.0,
    image: "/placeholder.svg",
  },
  { id: 5, name: "Brown Bread", price: 102.96, image: "/placeholder.svg" },
  {
    id: 6,
    name: "Lipton Yellow Label Tea Bag",
    price: 270.0,
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Nutella Hazelnut Cocoa Spread",
    price: 570.0,
    image: "/placeholder.svg",
  },
  { id: 8, name: "Blue Grapes", price: 80.0, image: "/placeholder.svg" },
  {
    id: 9,
    name: "Ferrero Rocher Chocolate Box",
    price: 214.5,
    image: "/placeholder.svg",
  },
];

const NewSale = () => {
  const [selectedStore, setSelectedStore] = useState("eorange");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Orbit Fresh Mint",
      price: 300.0,
      image: "/placeholder.svg",
      quantity: 2,
    },
  ]);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "wallet">("cod");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing)
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0)
      setCart((prev) => prev.filter((item) => item.id !== productId));
    else
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
  };

  const removeFromCart = (productId: number) =>
    setCart((prev) => prev.filter((item) => item.id !== productId));
  const getCartQuantity = (productId: number) =>
    cart.find((item) => item.id === productId)?.quantity || 0;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = subtotal * 0.1;
  const deliveryFee = 0;
  const tax = subtotal * 0.09;
  const total = subtotal - discount + deliveryFee + tax;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Product Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                Product Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Select value={selectedStore} onValueChange={setSelectedStore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eorange">Eorange</SelectItem>
                    <SelectItem value="smart-shopping">
                      Smart Shopping
                    </SelectItem>
                    <SelectItem value="organic-shop">Organic Shop</SelectItem>
                    <SelectItem value="family-supermarket">
                      Family supermarket
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {productsData.map((product) => {
                  const quantity = getCartQuantity(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className={`relative cursor-pointer rounded-lg border p-2 sm:p-3 transition-all hover:shadow-md ${quantity > 0 ? "border-primary bg-primary/5 ring-2 ring-primary" : "border-border"}`}
                    >
                      {quantity > 0 && (
                        <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                          <span className="text-3xl sm:text-4xl font-bold text-primary-foreground bg-primary/80 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                            {quantity}
                          </span>
                        </div>
                      )}
                      <div className="aspect-square mb-2 flex items-center justify-center bg-muted/50 rounded">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                        />
                      </div>
                      <h4 className="text-xs font-medium text-center line-clamp-2 mb-1">
                        {product.name}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-primary text-center">
                        $ {product.price.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                Billing Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                    <SelectItem value="guest">Guest Customer</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap text-sm">
                  Add New Customer
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Delivery Info</span>
                  <span className="text-muted-foreground text-xs hidden sm:inline">
                    (Home Delivery)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-2 bg-muted/50 p-2 sm:p-3 text-xs sm:text-sm font-medium text-muted-foreground">
                  <div className="col-span-5">Food</div>
                  <div className="col-span-2 text-center">QTY</div>
                  <div className="col-span-3 text-right">Price</div>
                  <div className="col-span-2 text-center">Del</div>
                </div>
                {cart.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    Cart is empty
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 p-2 sm:p-3 border-t items-center"
                    >
                      <div className="col-span-5 flex items-center gap-1 sm:gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded object-cover"
                        />
                        <span className="text-xs sm:text-sm truncate">
                          {item.name.substring(0, 10)}...
                        </span>
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="h-7 sm:h-8 text-center text-xs sm:text-sm"
                          min={0}
                        />
                      </div>
                      <div className="col-span-3 text-right font-medium text-xs sm:text-sm">
                        $ {(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal :</span>
                  <span className="font-medium">$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount :</span>
                  <span className="font-medium text-destructive">
                    - $ {discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery fee :</span>
                  <span className="font-medium">
                    $ {deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax :</span>
                  <span className="font-medium">$ {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total :</span>
                  <span className="font-bold text-lg">
                    $ {total.toFixed(2)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Paid By</p>
                <div className="flex gap-2">
                  <Button
                    variant={paymentMethod === "cod" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("cod")}
                    className={`text-sm ${paymentMethod === "cod" ? "bg-primary" : ""}`}
                    size="sm"
                  >
                    Cash On Delivery
                  </Button>
                  <Button
                    variant={paymentMethod === "wallet" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("wallet")}
                    size="sm"
                  >
                    Wallet
                  </Button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  size="sm"
                  onClick={() => setCart([])}
                >
                  Clear Cart
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <div>© Nigar. 2021-2026 Nigar.</div>
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          <a href="#" className="hover:text-primary">
            Business setup
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-primary">
            Profile
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-primary">
            Home
          </a>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
            v 3.6
          </span>
        </div>
      </footer>
    </>
  );
};

export default NewSale;
