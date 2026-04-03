import { User, Address, Order, WishlistItem } from "@/types/user";
import { products } from "./products2";

export const demoUser: User = {
  id: "user_001",
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  createdAt: "2024-06-15",
};

export const demoAddresses: Address[] = [
  {
    id: "addr_001",
    type: "home",
    name: "Sarah Johnson",
    street: "123 Beauty Lane, Apt 4B",
    city: "Los Angeles",
    state: "California",
    zipCode: "90001",
    country: "United States",
    isDefault: true,
  },
  {
    id: "addr_002",
    type: "work",
    name: "Sarah Johnson",
    street: "456 Corporate Blvd, Suite 800",
    city: "Los Angeles",
    state: "California",
    zipCode: "90015",
    country: "United States",
    isDefault: false,
  },
];

export const demoOrders: Order[] = [
  {
    id: "order_001",
    orderNumber: "ORD-2024-001847",
    items: [
      {
        product: products[0],
        quantity: 2,
        selectedColor: products[0].colors?.[0],
        price: products[0].price,
      },
      {
        product: products[2],
        quantity: 1,
        selectedColor: products[2].colors?.[1],
        price: products[2].price,
      },
    ],
    status: "delivered",
    subtotal: 189.97,
    shipping: 0,
    tax: 15.2,
    total: 205.17,
    shippingAddress: demoAddresses[0],
    paymentMethod: "Visa •••• 4242",
    createdAt: "2024-12-28",
    estimatedDelivery: "2025-01-03",
    trackingNumber: "TRK847291038",
  },
  {
    id: "order_002",
    orderNumber: "ORD-2024-001923",
    items: [
      {
        product: products[4],
        quantity: 1,
        price: products[4].price,
      },
      {
        product: products[6],
        quantity: 3,
        selectedColor: products[6].colors?.[0],
        price: products[6].price,
      },
    ],
    status: "shipped",
    subtotal: 156.96,
    shipping: 5.99,
    tax: 12.56,
    total: 175.51,
    shippingAddress: demoAddresses[0],
    paymentMethod: "Mastercard •••• 8888",
    createdAt: "2025-01-10",
    estimatedDelivery: "2025-01-18",
    trackingNumber: "TRK982710384",
  },
  {
    id: "order_003",
    orderNumber: "ORD-2025-000124",
    items: [
      {
        product: products[8],
        quantity: 1,
        selectedColor: products[8].colors?.[2],
        price: products[8].price,
      },
    ],
    status: "processing",
    subtotal: 68.0,
    shipping: 5.99,
    tax: 5.44,
    total: 79.43,
    shippingAddress: demoAddresses[1],
    paymentMethod: "Apple Pay",
    createdAt: "2025-01-15",
    estimatedDelivery: "2025-01-22",
  },
  {
    id: "order_004",
    orderNumber: "ORD-2024-001456",
    items: [
      {
        product: products[1],
        quantity: 1,
        price: products[1].price,
      },
    ],
    status: "cancelled",
    subtotal: 45.0,
    shipping: 5.99,
    tax: 3.6,
    total: 54.59,
    shippingAddress: demoAddresses[0],
    paymentMethod: "Visa •••• 4242",
    createdAt: "2024-11-20",
  },
];

export const demoWishlist: WishlistItem[] = [
  {
    product: products[3],
    addedAt: "2025-01-10",
  },
  {
    product: products[5],
    addedAt: "2025-01-08",
  },
  {
    product: products[7],
    addedAt: "2025-01-05",
  },
  {
    product: products[9],
    addedAt: "2024-12-28",
  },
];
