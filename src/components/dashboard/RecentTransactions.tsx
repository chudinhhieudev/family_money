'use client';

import { Table, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Transaction } from '@/types/expense';

interface RecentTransactionsProps {
  data: Transaction[];
}

export function RecentTransactions({ data }: RecentTransactionsProps) {
  const columns: ColumnsType<Transaction> = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (categoryId: string) => (
        <Tag color="blue">Danh mục {categoryId}</Tag>
      ),
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: Transaction) => (
        <span className={record.type === 'income' ? 'text-green-600' : 'text-red-600'}>
          {record.type === 'income' ? '+' : '-'}
          {new Intl.NumberFormat('vi-VN').format(amount)} đ
        </span>
      ),
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Giao dịch gần đây</h3>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        size="small"
      />
    </div>
  );
}
