'use client';

import { Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface StatsCardProps {
  title: string;
  value: number;
  prefix?: React.ReactNode;
  suffix?: string;
  trend?: 'up' | 'down';
  trendValue?: number;
  color?: string;
}

export function StatsCard({
  title,
  value,
  prefix,
  suffix = 'đ',
  trend,
  trendValue,
  color,
}: StatsCardProps) {
  const formatValue = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <Card className='min-h-[142px]'>
      <Statistic
        title={title}
        value={value}
        precision={0}
        formatter={(value) => formatValue(Number(value))}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{ color }}
      />
      {trend && trendValue && (
        <div className={`mt-2 flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          <span className="ml-1">{trendValue}% so với tháng trước</span>
        </div>
      )}
    </Card>
  );
}
