'use client';

import { Card } from 'antd';
import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card title={title}>
      <div style={{ height: 300 }}>
        {children}
      </div>
    </Card>
  );
}
