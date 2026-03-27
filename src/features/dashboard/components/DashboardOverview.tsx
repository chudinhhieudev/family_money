'use client';

import { Card, Row, Col, Statistic, Typography, Spin } from 'antd';
import { 
  UserOutlined, 
  DollarOutlined, 
  ShoppingCartOutlined, 
  RiseOutlined 
} from '@ant-design/icons';
import { useDashboardStats, useDashboardOverview } from '../api/get-dashboard-stats';

const { Title } = Typography;

export function DashboardOverview() {
  const { 
    data: stats, 
    isLoading: statsLoading, 
    error: statsError 
  } = useDashboardStats('7d');

  const { 
    data: overview, 
    isLoading: overviewLoading, 
    error: overviewError 
  } = useDashboardOverview();

  if (statsLoading || overviewLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (statsError || overviewError) {
    return (
      <div className="text-center text-red-500 p-4">
        <Title level={4}>Error loading dashboard data</Title>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Title level={2}>Dashboard Overview</Title>
      
      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats?.totalUsers || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={stats?.activeUsers || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix={
                stats?.monthlyGrowth && (
                  <span className="text-green-500 text-sm">
                    +{stats.monthlyGrowth}%
                  </span>
                )
              }
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats?.totalRevenue || 0}
              prefix="$"
              valueStyle={{ color: '#722ed1' }}
              precision={2}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={overview?.conversionRate || 0}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#fa8c16' }}
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Additional Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Total Orders" bordered={false}>
            <Statistic
              value={overview?.totalOrders || 0}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="Total Customers" bordered={false}>
            <Statistic
              value={overview?.totalCustomers || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
