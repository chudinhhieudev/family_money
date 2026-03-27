'use client';

import { QueryClient, QueryClientProvider, HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface TanstackProviderProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

// Create a client instance that will be shared across the app
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Time in milliseconds that data remains fresh
        staleTime: 5 * 60 * 1000, // 5 minutes
        
        // Time in milliseconds that inactive data remains in cache
        gcTime: 10 * 60 * 1000, // 10 minutes
        
        // Retry configuration
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors (except 408, 429)
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            const status = error.response.status;
            if (status === 408 || status === 429) return true;
            return false;
          }
          
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        
        // Retry delay with exponential backoff
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        
        // Refetch on window focus (disable for mobile performance)
        refetchOnWindowFocus: false,
        
        // Refetch on reconnect
        refetchOnReconnect: true,
        
        // Enable query error boundary
        throwOnError: false,
        
        // Network mode for SSR compatibility
        networkMode: 'online',
      },
      mutations: {
        // Retry configuration for mutations
        retry: 1,
        
        // Mutation error handling
        throwOnError: false,
        
        // Network mode for SSR compatibility
        networkMode: 'online',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

// Get singleton query client for browser
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  } else {
    // Browser: use singleton pattern to prevent multiple instances
    if (!browserQueryClient) browserQueryClient = createQueryClient();
    return browserQueryClient;
  }
}

export function TanstackProvider({ children, dehydratedState }: TanstackProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// Export query client instance for server-side usage
export { getQueryClient };
