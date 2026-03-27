'use client';

import { TanstackProvider } from '@/providers/TanstackProvider';
import { ConfigProvider } from 'antd';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/core/store';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
          },
        }}
        componentSize="middle"
      >
        <TanstackProvider>
          {children}
        </TanstackProvider>
      </ConfigProvider>
    </ReduxProvider>
  );
}
