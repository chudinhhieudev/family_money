'use client';

import { Card, Row, Col, DatePicker, Select, Button } from 'antd';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { useState } from 'react';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().startOf('month'),
    dayjs().endOf('month'),
  ]);
  const [reportType, setReportType] = useState('monthly');

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Báo cáo & Thống kê</h1>
        
        {/* Filters */}
        <Card className="mb-6">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <label className="block text-sm font-medium mb-2">Khoảng thời gian</label>
              <RangePicker
                value={dateRange}
                onChange={(dates) => {
                  if (dates && dates[0] && dates[1]) {
                    setDateRange([dates[0], dates[1]]);
                  }
                }}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <label className="block text-sm font-medium mb-2">Loại báo cáo</label>
              <Select
                value={reportType}
                onChange={setReportType}
                style={{ width: '100%' }}
              >
                <Option value="monthly">Theo tháng</Option>
                <Option value="yearly">Theo năm</Option>
                <Option value="category">Theo danh mục</Option>
                <Option value="account">Theo tài khoản</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <label className="block text-sm font-medium mb-2">&nbsp;</label>
              <Button type="primary" style={{ width: '100%' }}>
                Xem báo cáo
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Summary Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15,000,000 đ</div>
                <div className="text-gray-600">Tổng thu nhập</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">8,500,000 đ</div>
                <div className="text-gray-600">Tổng chi tiêu</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">6,500,000 đ</div>
                <div className="text-gray-600">Số dư</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">43.3%</div>
                <div className="text-gray-600">Tỷ lệ tiết kiệm</div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <ChartCard title="Xu hướng chi tiêu">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p>Biểu đồ xu hướng chi tiêu theo thời gian</p>
                  <p className="text-sm mt-2">Sẽ tích hợp ECharts sau</p>
                </div>
              </div>
            </ChartCard>
          </Col>
          <Col xs={24} lg={12}>
            <ChartCard title="Chi tiêu theo danh mục">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">🥧</div>
                  <p>Biểu đồ tròn chi tiêu theo danh mục</p>
                  <p className="text-sm mt-2">Sẽ tích hợp ECharts sau</p>
                </div>
              </div>
            </ChartCard>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24} lg={12}>
            <ChartCard title="So sánh thu nhập - chi tiêu">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">📈</div>
                  <p>Biểu đồ cột so sánh thu nhập và chi tiêu</p>
                  <p className="text-sm mt-2">Sẽ tích hợp ECharts sau</p>
                </div>
              </div>
            </ChartCard>
          </Col>
          <Col xs={24} lg={12}>
            <ChartCard title="Dòng tiền theo tài khoản">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">💳</div>
                  <p>Biểu đồ dòng tiền theo từng tài khoản</p>
                  <p className="text-sm mt-2">Sẽ tích hợp ECharts sau</p>
                </div>
              </div>
            </ChartCard>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
