'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

interface ExpenseTrendChartProps {
  data?: Array<{
    date: string;
    income: number;
    expense: number;
  }>;
}

export function ExpenseTrendChart({ data }: ExpenseTrendChartProps) {
  // Mock data for demo
  const mockData = data || [
    { date: '2024-01', income: 5000000, expense: 3200000 },
    { date: '2024-02', income: 5200000, expense: 2800000 },
    { date: '2024-03', income: 5000000, expense: 3500000 },
    { date: '2024-04', income: 5500000, expense: 3100000 },
    { date: '2024-05', income: 5300000, expense: 2900000 },
    { date: '2024-06', income: 5800000, expense: 3400000 },
  ];

  const formatNumber = (num: number) => {
    return (num / 1000000).toFixed(1) + 'tr';
  };

  const option = {
    title: {
      text: 'Xu hướng thu nhập - chi tiêu',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: (params: any) => {
        let result = params[0].name + '<br/>';
        params.forEach((param: any) => {
          result += `${param.marker} ${param.seriesName}: ${new Intl.NumberFormat('vi-VN').format(param.value)} đ<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Thu nhập', 'Chi tiêu'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: mockData.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: formatNumber
      }
    },
    series: [
      {
        name: 'Thu nhập',
        type: 'line',
        smooth: true,
        data: mockData.map(item => item.income),
        itemStyle: {
          color: '#52c41a'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
              { offset: 1, color: 'rgba(82, 196, 26, 0.1)' }
            ]
          }
        }
      },
      {
        name: 'Chi tiêu',
        type: 'line',
        smooth: true,
        data: mockData.map(item => item.expense),
        itemStyle: {
          color: '#ff4d4f'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 77, 79, 0.3)' },
              { offset: 1, color: 'rgba(255, 77, 79, 0.1)' }
            ]
          }
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '100%' }} />;
}
