'use client';

import { Card, Row, Col, Spin, Select } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useChartData } from '../api/get-dashboard-stats';

const { Option } = Select;

// Dynamically import ECharts to reduce initial bundle size
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <Spin size="large" />,
});

const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  AREA: 'area',
} as const;

type ChartType = typeof CHART_TYPES[keyof typeof CHART_TYPES];

export function DashboardCharts() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [chartType, setChartType] = useState<ChartType>(CHART_TYPES.LINE);

  const { 
    data: chartData, 
    isLoading, 
    error 
  } = useChartData('user-activity', selectedPeriod);

  const getChartOption = () => {
    if (!chartData) return {};

    const baseOption = {
      title: {
        text: 'User Activity Trends',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['Active Users', 'New Users', 'Page Views'],
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: chartData?.dates || [],
      },
      yAxis: {
        type: 'value',
      },
    };

    switch (chartType) {
      case CHART_TYPES.LINE:
        return {
          ...baseOption,
          series: [
            {
              name: 'Active Users',
              type: 'line',
              data: chartData?.activeUsers || [],
              smooth: true,
              itemStyle: { color: '#1890ff' },
            },
            {
              name: 'New Users',
              type: 'line',
              data: chartData?.newUsers || [],
              smooth: true,
              itemStyle: { color: '#52c41a' },
            },
            {
              name: 'Page Views',
              type: 'line',
              data: chartData?.pageViews || [],
              smooth: true,
              itemStyle: { color: '#722ed1' },
            },
          ],
        };

      case CHART_TYPES.BAR:
        return {
          ...baseOption,
          series: [
            {
              name: 'Active Users',
              type: 'bar',
              data: chartData?.activeUsers || [],
              itemStyle: { color: '#1890ff' },
            },
            {
              name: 'New Users',
              type: 'bar',
              data: chartData?.newUsers || [],
              itemStyle: { color: '#52c41a' },
            },
            {
              name: 'Page Views',
              type: 'bar',
              data: chartData?.pageViews || [],
              itemStyle: { color: '#722ed1' },
            },
          ],
        };

      case CHART_TYPES.AREA:
        return {
          ...baseOption,
          series: [
            {
              name: 'Active Users',
              type: 'line',
              data: chartData?.activeUsers || [],
              areaStyle: { opacity: 0.3 },
              itemStyle: { color: '#1890ff' },
            },
            {
              name: 'New Users',
              type: 'line',
              data: chartData?.newUsers || [],
              areaStyle: { opacity: 0.3 },
              itemStyle: { color: '#52c41a' },
            },
            {
              name: 'Page Views',
              type: 'line',
              data: chartData?.pageViews || [],
              areaStyle: { opacity: 0.3 },
              itemStyle: { color: '#722ed1' },
            },
          ],
        };

      default:
        return baseOption;
    }
  };

  if (error) {
    return (
      <Card title="Charts" className="h-96">
        <div className="flex justify-center items-center h-full text-red-500">
          Error loading chart data
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={12}>
          <Select
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            style={{ width: '100%' }}
            placeholder="Select period"
          >
            <Option value="7d">Last 7 days</Option>
            <Option value="30d">Last 30 days</Option>
            <Option value="90d">Last 90 days</Option>
            <Option value="1y">Last year</Option>
          </Select>
        </Col>
        
        <Col xs={24} sm={12}>
          <Select
            value={chartType}
            onChange={setChartType}
            style={{ width: '100%' }}
            placeholder="Select chart type"
          >
            <Option value={CHART_TYPES.LINE}>Line Chart</Option>
            <Option value={CHART_TYPES.BAR}>Bar Chart</Option>
            <Option value={CHART_TYPES.AREA}>Area Chart</Option>
          </Select>
        </Col>
      </Row>

      <Card title="User Activity Trends" className="h-96">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <ReactECharts
            option={getChartOption()}
            style={{ height: '350px' }}
            opts={{ renderer: 'canvas' }}
          />
        )}
      </Card>
    </div>
  );
}
