/**
 * React Query hooks for NestJS API integration
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  productsApi,
  categoriesApi,
  cartApi,
  ordersApi,
  wishlistApi,
  addressesApi,
  userApi,
  authApi,
  type ProductQueryParams,
  type CreateOrderDto,
  type CreateAddressDto,
  type UpdateProfileDto,
} from '@/lib/api-client';

// Query Keys
export const queryKeys = {
  products: ['products'] as const,
  product: (id: string) => ['products', id] as const,
  productsByCategory: (category: string) => ['products', 'category', category] as const,
  featuredProducts: ['products', 'featured'] as const,
  newArrivals: ['products', 'new-arrivals'] as const,
  searchProducts: (query: string) => ['products', 'search', query] as const,
  categories: ['categories'] as const,
  category: (id: string) => ['categories', id] as const,
  cart: ['cart'] as const,
  orders: ['orders'] as const,
  order: (id: string) => ['orders', id] as const,
  wishlist: ['wishlist'] as const,
  addresses: ['addresses'] as const,
  profile: ['profile'] as const,
};

// Products Hooks
export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: [...queryKeys.products, params],
    queryFn: () => productsApi.getAll(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}

export function useProductsByCategory(category: string, params?: ProductQueryParams) {
  return useQuery({
    queryKey: [...queryKeys.productsByCategory(category), params],
    queryFn: () => productsApi.getByCategory(category, params),
    enabled: !!category,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: queryKeys.featuredProducts,
    queryFn: productsApi.getFeatured,
  });
}

export function useNewArrivals() {
  return useQuery({
    queryKey: queryKeys.newArrivals,
    queryFn: productsApi.getNewArrivals,
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: queryKeys.searchProducts(query),
    queryFn: () => productsApi.search(query),
    enabled: query.length >= 2,
  });
}

// Categories Hooks
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoriesApi.getAll,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: queryKeys.category(id),
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
}

// Cart Hooks
export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: cartApi.get,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, quantity, colorId }: { productId: string; quantity: number; colorId?: string }) =>
      cartApi.addItem(productId, quantity, colorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cartApi.clear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
}

// Orders Hooks
export function useOrders() {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: ordersApi.getAll,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateOrderDto) => ordersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => ordersApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
    },
  });
}

// Wishlist Hooks
export function useWishlist() {
  return useQuery({
    queryKey: queryKeys.wishlist,
    queryFn: wishlistApi.get,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.add(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist });
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.remove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist });
    },
  });
}

// Addresses Hooks
export function useAddresses() {
  return useQuery({
    queryKey: queryKeys.addresses,
    queryFn: addressesApi.getAll,
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateAddressDto) => addressesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAddressDto> }) =>
      addressesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => addressesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => addressesApi.setDefault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
    },
  });
}

// Profile Hooks
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: userApi.getProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateProfileDto) => userApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      userApi.changePassword(currentPassword, newPassword),
  });
}

// Auth Hooks
export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist });
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      authApi.signup(name, email, password),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      queryClient.clear();
    },
  });
}
