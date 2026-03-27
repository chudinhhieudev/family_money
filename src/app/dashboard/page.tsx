'use client';

import { Row, Col } from 'antd';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ExpenseTrendChart } from '@/components/charts/ExpenseTrendChart';
import { Transaction } from '@/types/expense';

// Mock data for demo
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 150000,
    description: 'Ăn trưa',
    categoryId: 'food',
    accountId: '1',
    date: '2024-03-27',
    createdAt: '2024-03-27T10:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '2',
    type: 'income',
    amount: 5000000,
    description: 'Lương tháng 3',
    categoryId: 'salary',
    accountId: '1',
    date: '2024-03-25',
    createdAt: '2024-03-25T09:00:00Z',
    updatedAt: '2024-03-25T09:00:00Z',
  },
  {
    id: '3',
    type: 'expense',
    amount: 85000,
    description: 'GrabBike',
    categoryId: 'transport',
    accountId: '1',
    date: '2024-03-27',
    createdAt: '2024-03-27T08:30:00Z',
    updatedAt: '2024-03-27T08:30:00Z',
  },
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Tổng quan</h1>
        
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <StatsCard
              title="Tổng thu nhập"
              value={5000000}
              color="#52c41a"
              trend="up"
              trendValue={12}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard
              title="Tổng chi tiêu"
              value={2350000}
              color="#ff4d4f"
              trend="down"
              trendValue={8}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard
              title="Số dư"
              value={2650000}
              color="#1890ff"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard
              title="Giao dịch tháng này"
              value={47}
              color="#722ed1"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <ChartCard title="Xu hướng chi tiêu">
              <ExpenseTrendChart />
            </ChartCard>
          </Col>
          <Col xs={24} lg={8}>
            <RecentTransactions data={mockTransactions} />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
