/**
 * API Client for NestJS Backend
 * Configure API_BASE_URL to point to your NestJS server
 */

const API_BASE_URL = "http://localhost:3001/api";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const token = localStorage.getItem("auth_token");

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || "API Error",
      errorData,
    );
  }

  // Handle empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    request<{ user: ApiUser; token: string }>("/auth/login", {
      method: "POST",
      body: { email, password },
    }),

  signup: (name: string, email: string, password: string) =>
    request<{ user: ApiUser; token: string }>("/auth/signup", {
      method: "POST",
      body: { name, email, password },
    }),

  logout: () => request<void>("/auth/logout", { method: "POST" }),

  me: () => request<ApiUser>("/auth/me"),

  refreshToken: () =>
    request<{ token: string }>("/auth/refresh", { method: "POST" }),
};

// Products API
export const productsApi = {
  getAll: (params?: ProductQueryParams) => {
    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>)}`
      : "";
    return request<PaginatedResponse<ApiProduct>>(`/products${query}`);
  },

  getById: (id: string) => request<ApiProduct>(`/products/${id}`),

  getByCategory: (category: string, params?: ProductQueryParams) => {
    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>)}`
      : "";
    return request<PaginatedResponse<ApiProduct>>(
      `/products/category/${category}${query}`,
    );
  },

  search: (query: string) =>
    request<ApiProduct[]>(`/products/search?q=${encodeURIComponent(query)}`),

  getFeatured: () => request<ApiProduct[]>("/products/featured"),

  getNewArrivals: () => request<ApiProduct[]>("/products/new-arrivals"),
};

// Categories API
export const categoriesApi = {
  getAll: () => request<ApiCategory[]>("/categories"),
  getById: (id: string) => request<ApiCategory>(`/categories/${id}`),
};

// Cart API
export const cartApi = {
  get: () => request<ApiCart>("/cart"),

  addItem: (productId: string, quantity: number, colorId?: string) =>
    request<ApiCart>("/cart/items", {
      method: "POST",
      body: { productId, quantity, colorId },
    }),

  updateItem: (itemId: string, quantity: number) =>
    request<ApiCart>(`/cart/items/${itemId}`, {
      method: "PATCH",
      body: { quantity },
    }),

  removeItem: (itemId: string) =>
    request<ApiCart>(`/cart/items/${itemId}`, { method: "DELETE" }),

  clear: () => request<void>("/cart", { method: "DELETE" }),
};

// Orders API
export const ordersApi = {
  getAll: () => request<ApiOrder[]>("/orders"),

  getById: (id: string) => request<ApiOrder>(`/orders/${id}`),

  create: (data: CreateOrderDto) =>
    request<ApiOrder>("/orders", { method: "POST", body: data }),

  cancel: (id: string) =>
    request<ApiOrder>(`/orders/${id}/cancel`, { method: "POST" }),
};

// Wishlist API
export const wishlistApi = {
  get: () => request<ApiWishlistItem[]>("/wishlist"),

  add: (productId: string) =>
    request<ApiWishlistItem>("/wishlist", {
      method: "POST",
      body: { productId },
    }),

  remove: (productId: string) =>
    request<void>(`/wishlist/${productId}`, { method: "DELETE" }),
};

// Addresses API
export const addressesApi = {
  getAll: () => request<ApiAddress[]>("/addresses"),

  create: (data: CreateAddressDto) =>
    request<ApiAddress>("/addresses", { method: "POST", body: data }),

  update: (id: string, data: Partial<CreateAddressDto>) =>
    request<ApiAddress>(`/addresses/${id}`, { method: "PATCH", body: data }),

  delete: (id: string) =>
    request<void>(`/addresses/${id}`, { method: "DELETE" }),

  setDefault: (id: string) =>
    request<ApiAddress>(`/addresses/${id}/default`, { method: "POST" }),
};

// User Profile API
export const userApi = {
  getProfile: () => request<ApiUser>("/users/profile"),

  updateProfile: (data: UpdateProfileDto) =>
    request<ApiUser>("/users/profile", { method: "PATCH", body: data }),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<void>("/users/change-password", {
      method: "POST",
      body: { currentPassword, newPassword },
    }),
};

// API Types (matching Prisma schema)
export interface ApiUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role?: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  categoryId: string;
  category: ApiCategory;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  colors: ApiProductColor[];
  specifications: Record<string, string>;
  features: string[];
  tags: string[];
  isNew: boolean;
  isBestseller: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mapper: ApiProduct -> Product (for component compatibility)
import type { Product, ProductColor } from "@/types/product";

export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.price,
    originalPrice: apiProduct.originalPrice,
    image: apiProduct.image,
    images: apiProduct.images,
    category: apiProduct.category.name,
    brand: apiProduct.brand,
    rating: apiProduct.rating,
    reviewCount: apiProduct.reviewCount,
    inStock: apiProduct.inStock,
    colors: apiProduct.colors as ProductColor[],
    specifications: apiProduct.specifications,
    features: apiProduct.features,
    tags: apiProduct.tags,
    isNew: apiProduct.isNew,
    isBestseller: apiProduct.isBestseller,
  };
}

export function mapApiProductsToProducts(apiProducts: ApiProduct[]): Product[] {
  return apiProducts.map(mapApiProductToProduct);
}

// Admin API
export const adminApi = {
  // Dashboard stats
  getDashboardStats: () => request<AdminDashboardStats>("/admin/stats"),

  // Products CRUD
  getProducts: (params?: ProductQueryParams) => {
    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>)}`
      : "";
    return request<PaginatedResponse<ApiProduct>>(`/admin/products${query}`);
  },
  createProduct: (data: CreateProductDto) =>
    request<ApiProduct>("/admin/products", { method: "POST", body: data }),
  updateProduct: (id: string, data: Partial<CreateProductDto>) =>
    request<ApiProduct>(`/admin/products/${id}`, {
      method: "PATCH",
      body: data,
    }),
  deleteProduct: (id: string) =>
    request<void>(`/admin/products/${id}`, { method: "DELETE" }),

  // Orders management
  getOrders: (params?: { status?: string; page?: string; limit?: string }) => {
    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>)}`
      : "";
    return request<PaginatedResponse<ApiOrder>>(`/admin/orders${query}`);
  },
  updateOrderStatus: (id: string, status: string) =>
    request<ApiOrder>(`/admin/orders/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),

  // Users management
  getUsers: (params?: { page?: string; limit?: string; search?: string }) => {
    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>)}`
      : "";
    return request<PaginatedResponse<ApiUser>>(`/admin/users${query}`);
  },
  updateUserRole: (id: string, role: "user" | "admin") =>
    request<ApiUser>(`/admin/users/${id}/role`, {
      method: "PATCH",
      body: { role },
    }),

  // Categories CRUD
  getCategories: () => request<ApiCategory[]>("/admin/categories"),
  createCategory: (data: { name: string; icon: string; image?: string }) =>
    request<ApiCategory>("/admin/categories", { method: "POST", body: data }),
  updateCategory: (
    id: string,
    data: Partial<{ name: string; icon: string; image?: string }>,
  ) =>
    request<ApiCategory>(`/admin/categories/${id}`, {
      method: "PATCH",
      body: data,
    }),
  deleteCategory: (id: string) =>
    request<void>(`/admin/categories/${id}`, { method: "DELETE" }),

  // Sales Analytics
  getSalesAnalytics: (params: SalesAnalyticsParams) => {
    const query = new URLSearchParams({
      startDate: params.startDate,
      endDate: params.endDate,
      ...(params.compareStartDate && {
        compareStartDate: params.compareStartDate,
      }),
      ...(params.compareEndDate && { compareEndDate: params.compareEndDate }),
      ...(params.groupBy && { groupBy: params.groupBy }),
    });
    return request<SalesAnalyticsData>(`/admin/analytics/sales?${query}`);
  },
};

// Admin types
export interface AdminDashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueGrowth: number;
  ordersGrowth: number;
  recentOrders: ApiOrder[];
  topProducts: { product: ApiProduct; soldCount: number }[];
  salesByMonth: { month: string; revenue: number; orders: number }[];
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  categoryId: string;
  brand: string;
  inStock?: boolean;
  features?: string[];
  tags?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  specifications?: Record<string, string>;
  colors?: { name: string; hex: string; image?: string }[];
}

export interface ApiProductColor {
  id: string;
  name: string;
  hex: string;
  image?: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  icon: string;
  image?: string;
  productCount: number;
  subcategories?: ApiSubCategory[];
}

export interface ApiSubCategory {
  id: string;
  name: string;
  productCount: number;
}

export interface ApiCart {
  id: string;
  items: ApiCartItem[];
  subtotal: number;
  itemCount: number;
}

export interface ApiCartItem {
  id: string;
  product: ApiProduct;
  quantity: number;
  color?: ApiProductColor;
}

export interface ApiOrder {
  id: string;
  orderNumber: string;
  items: ApiOrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ApiAddress;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiOrderItem {
  id: string;
  product: ApiProduct;
  quantity: number;
  price: number;
  color?: ApiProductColor;
}

export interface ApiAddress {
  id: string;
  type: "home" | "work" | "other";
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface ApiWishlistItem {
  id: string;
  product: ApiProduct;
  addedAt: string;
}

// Query/DTO Types
export interface ProductQueryParams {
  page?: string;
  limit?: string;
  sort?: string;
  order?: "asc" | "desc";
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  inStock?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateOrderDto {
  items: { productId: string; quantity: number; colorId?: string }[];
  shippingAddressId: string;
  paymentMethod: string;
}

export interface CreateAddressDto {
  type: "home" | "work" | "other";
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface UpdateProfileDto {
  name?: string;
  phone?: string;
  avatar?: string;
}

// Sales Analytics Types
export interface SalesAnalyticsParams {
  startDate: string;
  endDate: string;
  compareStartDate?: string;
  compareEndDate?: string;
  groupBy?: "day" | "week" | "month";
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

export interface CategorySalesData {
  categoryId: string;
  categoryName: string;
  revenue: number;
  orders: number;
  percentage: number;
}

export interface TopProductSale {
  productId: string;
  productName: string;
  productImage: string;
  brand: string;
  unitsSold: number;
  revenue: number;
}

export interface SalesAnalyticsData {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalCustomers: number;
  };
  comparison?: {
    revenueChange: number;
    ordersChange: number;
    aovChange: number;
    customersChange: number;
    previousRevenue: number;
    previousOrders: number;
    previousAov: number;
    previousCustomers: number;
  };
  salesOverTime: SalesDataPoint[];
  comparisonSalesOverTime?: SalesDataPoint[];
  salesByCategory: CategorySalesData[];
  topProducts: TopProductSale[];
  orderStatusBreakdown: { status: string; count: number; percentage: number }[];
}

export { ApiError };
