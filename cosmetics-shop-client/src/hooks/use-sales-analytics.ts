/**
 * React Query hooks for Sales Analytics API
 */

import { useQuery } from '@tanstack/react-query';
import { adminApi, type SalesAnalyticsData, type SalesAnalyticsParams } from '@/lib/api-client';

export const analyticsQueryKeys = {
  salesAnalytics: (params: SalesAnalyticsParams) => ['admin', 'analytics', 'sales', params] as const,
};

export function useSalesAnalytics(params: SalesAnalyticsParams) {
  return useQuery({
    queryKey: analyticsQueryKeys.salesAnalytics(params),
    queryFn: () => adminApi.getSalesAnalytics(params),
    staleTime: 60000, // Cache for 1 minute
  });
}
