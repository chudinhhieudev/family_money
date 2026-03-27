# Next.js 16 Enterprise Architecture

A comprehensive enterprise-grade Next.js 16 application with TypeScript, featuring feature-based architecture, TanStack Query v5, Redux Toolkit, and heavy library optimization.

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── core/                        # Core application logic
│   ├── api/                     # API configuration
│   │   └── axios-client.ts      # Axios instance with interceptors
│   └── store/                   # Redux store configuration
│       └── index.ts             # Store setup and typed hooks
├── features/                    # Feature-based modules
│   ├── dashboard/               # Dashboard feature
│   │   ├── api/                # API calls and hooks
│   │   │   └── get-dashboard-stats.ts
│   │   ├── components/         # UI components
│   │   │   ├── DashboardOverview.tsx
│   │   │   └── DashboardCharts.tsx
│   │   ├── store/              # Redux slices
│   │   └── types/              # TypeScript definitions
│   ├── user-management/        # User management feature
│   └── analytics/              # Analytics feature
├── providers/                   # React providers
│   └── TanstackProvider.tsx     # TanStack Query provider
├── shared/                      # Shared utilities
│   ├── hooks/                   # Custom React hooks
│   ├── components/              # Reusable UI components
│   ├── utils/                   # Utility functions
│   └── libs/                    # Third-party library configs
├── lib/                         # Library configurations
│   └── query-keys.ts            # Centralized query keys
└── types/                       # Global TypeScript types
```

## 🚀 Key Features

### Architecture Patterns
- **Feature-Based Architecture**: Each feature is a self-contained module
- **Separation of Concerns**: Logic separated from UI components
- **TypeScript**: Full type safety across the application
- **Scalable Structure**: Easy to add new features and scale the application

### State Management
- **TanStack Query v5**: Server state management with caching and synchronization
- **Redux Toolkit**: Client state management for complex UI states
- **Centralized Query Keys**: Prevents typos and enables easy cache invalidation

### API Layer
- **Axios Instance**: Configured with interceptors for authentication and error handling
- **Type-Safe API**: Full TypeScript support for API responses
- **Error Handling**: Centralized error handling with user-friendly messages

### Performance Optimization
- **Dynamic Imports**: Heavy libraries loaded on-demand
- **Bundle Splitting**: Optimized webpack configuration for large libraries
- **Code Splitting**: Separate chunks for charts, editor, and other heavy dependencies

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: TanStack Query v5 + Redux Toolkit
- **UI Library**: Ant Design
- **HTTP Client**: Axios
- **Charts**: ECharts + echarts-for-react
- **Graph Visualization**: Sigma.js
- **Rich Text Editor**: Tiptap
- **Styling**: Tailwind CSS

## 📦 Installation

```bash
npm install
```

## 🏃‍♂️ Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### TanStack Query Configuration
The QueryClient is configured with:
- `staleTime`: 5 minutes
- `gcTime`: 10 minutes
- Retry logic with exponential backoff
- SSR support with HydrationBoundary

### Bundle Optimization
Heavy libraries are split into separate chunks:
- Charts: ECharts and related libraries
- Editor: Tiptap and ProseMirror
- Graph: Sigma.js

## 📊 Feature Structure

Each feature follows this structure:

```
features/[feature-name]/
├── api/           # API calls and TanStack Query hooks
├── components/    # Feature-specific UI components
├── store/         # Redux slices (if needed)
└── types/         # TypeScript definitions
```

## 🔄 API Integration

### Example API Hook
```typescript
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { axiosClient } from '@/core/api/axios-client';

export function useDashboardStats(period?: string) {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(period),
    queryFn: () => fetchDashboardStats(period),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
```

## 🎨 UI Components

### Ant Design Integration
- Configured with custom theme
- Consistent design system
- Responsive components

### Dynamic Imports
Heavy components are loaded dynamically:

```typescript
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <Spin size="large" />,
});
```

## 🔍 Error Handling

### Global Error Handling
- Axios interceptors handle HTTP errors
- User-friendly error messages
- Automatic token refresh and logout

### Query Error Handling
- Built-in retry logic
- Error boundaries for UI errors
- Graceful degradation

## 📈 Performance

### Optimization Techniques
- Bundle splitting for heavy libraries
- Dynamic imports for code splitting
- Image optimization
- Font optimization

### Monitoring
- Request timing in development
- Bundle analysis tools
- Performance metrics

## 🧪 Testing

```bash
npm run test
```

## 📝 Contributing

1. Create a new feature in `src/features/`
2. Follow the established folder structure
3. Use TypeScript for all new code
4. Add proper error handling
5. Update query keys when adding new API calls

## 📄 License

MIT License
