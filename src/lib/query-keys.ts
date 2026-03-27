// Centralized query keys management for TanStack Query
// This prevents typos and makes it easier to invalidate related queries

export const queryKeys = {
  // Authentication keys
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
  },

  // Dashboard keys
  dashboard: {
    all: ['dashboard'] as const,
    overview: () => [...queryKeys.dashboard.all, 'overview'] as const,
    stats: (period?: string) => [...queryKeys.dashboard.all, 'stats', period] as const,
    charts: (type: string) => [...queryKeys.dashboard.all, 'charts', type] as const,
  },

  // User management keys
  users: {
    all: ['users'] as const,
    lists: (filters?: Record<string, any>) => [...queryKeys.users.all, 'list', filters] as const,
    details: (id: string | number) => [...queryKeys.users.all, 'detail', id] as const,
    roles: () => [...queryKeys.users.all, 'roles'] as const,
    permissions: () => [...queryKeys.users.all, 'permissions'] as const,
  },

  // Analytics keys
  analytics: {
    all: ['analytics'] as const,
    reports: (type?: string) => [...queryKeys.analytics.all, 'reports', type] as const,
    metrics: (period?: string) => [...queryKeys.analytics.all, 'metrics', period] as const,
    events: (filters?: Record<string, any>) => [...queryKeys.analytics.all, 'events', filters] as const,
    funnels: (id?: string) => [...queryKeys.analytics.all, 'funnels', id] as const,
  },

  // Settings keys
  settings: {
    all: ['settings'] as const,
    general: () => [...queryKeys.settings.all, 'general'] as const,
    notifications: () => [...queryKeys.settings.all, 'notifications'] as const,
    security: () => [...queryKeys.settings.all, 'security'] as const,
    preferences: () => [...queryKeys.settings.all, 'preferences'] as const,
  },

  // File management keys
  files: {
    all: ['files'] as const,
    lists: (filters?: Record<string, any>) => [...queryKeys.files.all, 'list', filters] as const,
    upload: () => [...queryKeys.files.all, 'upload'] as const,
    download: (id: string) => [...queryKeys.files.all, 'download', id] as const,
  },

  // Notification keys
  notifications: {
    all: ['notifications'] as const,
    lists: (filters?: Record<string, any>) => [...queryKeys.notifications.all, 'list', filters] as const,
    unread: () => [...queryKeys.notifications.all, 'unread'] as const,
    count: () => [...queryKeys.notifications.all, 'count'] as const,
  },
} as const;

// Type helpers for better TypeScript support
export type QueryKey = typeof queryKeys[keyof typeof queryKeys][string];
export type QueryKeyFactory = ReturnType<typeof queryKeys[keyof typeof queryKeys]>;

// Utility function to create dynamic query keys
export function createQueryKey<T extends Record<string, any>>(
  base: readonly string[],
  params?: T
): readonly string[] {
  if (!params) return base;
  
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {} as T);
  
  return [...base, JSON.stringify(sortedParams)];
}

// Utility function to invalidate multiple related queries
export function getInvalidationKeys(baseKey: readonly string[]): readonly string[][] {
  return [
    baseKey,
    [...baseKey, 'list'],
    [...baseKey, 'detail'],
  ];
}
