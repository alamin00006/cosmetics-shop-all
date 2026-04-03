/**
 * React Query hooks for Admin API
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  adminApi,
  type ProductQueryParams,
  type CreateProductDto,
} from '@/lib/api-client';

// Query Keys
export const adminQueryKeys = {
  stats: ['admin', 'stats'] as const,
  products: ['admin', 'products'] as const,
  orders: ['admin', 'orders'] as const,
  users: ['admin', 'users'] as const,
  categories: ['admin', 'categories'] as const,
};

// Dashboard Stats
export function useAdminStats() {
  return useQuery({
    queryKey: adminQueryKeys.stats,
    queryFn: adminApi.getDashboardStats,
    staleTime: 30000, // Cache for 30 seconds
  });
}

// Products Management
export function useAdminProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: [...adminQueryKeys.products, params],
    queryFn: () => adminApi.getProducts(params),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => adminApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.products });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProductDto> }) =>
      adminApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.products });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.products });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats });
    },
  });
}

// Orders Management
export function useAdminOrders(params?: { status?: string; page?: string; limit?: string }) {
  return useQuery({
    queryKey: [...adminQueryKeys.orders, params],
    queryFn: () => adminApi.getOrders(params),
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.orders });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats });
    },
  });
}

// Users Management
export function useAdminUsers(params?: { page?: string; limit?: string; search?: string }) {
  return useQuery({
    queryKey: [...adminQueryKeys.users, params],
    queryFn: () => adminApi.getUsers(params),
  });
}

// Categories Management
export function useAdminCategories() {
  return useQuery({
    queryKey: adminQueryKeys.categories,
    queryFn: adminApi.getCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; icon: string; image?: string }) =>
      adminApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.categories });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<{ name: string; icon: string; image?: string }> }) =>
      adminApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.categories });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.categories });
    },
  });
}
