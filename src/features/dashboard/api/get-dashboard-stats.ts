import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { axiosClient } from '@/core/api/axios-client';

// Type definitions for dashboard statistics
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  topProducts: ProductStats[];
  userActivity: UserActivity[];
  recentTransactions: Transaction[];
}

export interface ProductStats {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

export interface UserActivity {
  date: string;
  activeUsers: number;
  newUsers: number;
  pageViews: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

// API function to fetch dashboard statistics
async function fetchDashboardStats(period?: string): Promise<DashboardStats> {
  const params = period ? { period } : {};
  const response = await axiosClient.get<DashboardStats>('/dashboard/stats', { params });
  return response.data;
}

// Hook for fetching dashboard statistics
export function useDashboardStats(
  period?: string,
  options?: Omit<UseQueryOptions<DashboardStats>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(period),
    queryFn: () => fetchDashboardStats(period),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto refresh every 5 minutes
    ...options,
  });
}

// API function to fetch dashboard overview data
async function fetchDashboardOverview(): Promise<{
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  conversionRate: number;
}> {
  const response = await axiosClient.get('/dashboard/overview');
  return response.data;
}

// Hook for fetching dashboard overview
export function useDashboardOverview(
  options?: Omit<UseQueryOptions<{
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    conversionRate: number;
  }>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.dashboard.overview(),
    queryFn: fetchDashboardOverview,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
}

// API function to fetch chart data
async function fetchChartData(chartType: string, period?: string): Promise<any> {
  const params = period ? { period } : {};
  const response = await axiosClient.get(`/dashboard/charts/${chartType}`, { params });
  return response.data;
}

// Hook for fetching chart data
export function useChartData(
  chartType: string,
  period?: string,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.dashboard.charts(chartType),
    queryFn: () => fetchChartData(chartType, period),
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 6 * 60 * 1000, // 6 minutes
    ...options,
  });
}

// Prefetch function for SSR/SSG
export async function prefetchDashboardStats(
  queryClient: any,
  period?: string
) {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.dashboard.stats(period),
    queryFn: () => fetchDashboardStats(period),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Prefetch function for dashboard overview
export async function prefetchDashboardOverview(queryClient: any) {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.dashboard.overview(),
    queryFn: fetchDashboardOverview,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
