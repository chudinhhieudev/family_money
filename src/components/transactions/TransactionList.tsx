'use client';

import { Table, Button, Tag, Space, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Transaction } from '@/types/expense';
import { useState } from 'react';
import { TransactionForm } from './TransactionForm';

interface TransactionListProps {
  data: Transaction[];
  onAdd: (values: any) => void;
  onUpdate: (id: string, values: any) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export function TransactionList({ data, onAdd, onUpdate, onDelete, loading }: TransactionListProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [formLoading, setFormLoading] = useState(false);

  const handleAdd = () => {
    setEditingTransaction(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa giao dịch này?',
      onOk: () => {
        onDelete(id);
        message.success('Xóa giao dịch thành công');
      },
    });
  };

  const handleSubmit = async (values: any) => {
    setFormLoading(true);
    try {
      if (editingTransaction) {
        await onUpdate(editingTransaction.id, values);
        message.success('Cập nhật giao dịch thành công');
      } else {
        await onAdd(values);
        message.success('Thêm giao dịch thành công');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    } finally {
      setFormLoading(false);
    }
  };

  const columns: ColumnsType<Transaction> = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
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
      render: (categoryId: string) => {
        const categoryMap: Record<string, { name: string; color: string }> = {
          food: { name: 'Ăn uống', color: 'green' },
          transport: { name: 'Di chuyển', color: 'blue' },
          shopping: { name: 'Mua sắm', color: 'purple' },
          entertainment: { name: 'Giải trí', color: 'orange' },
          salary: { name: 'Lương', color: 'cyan' },
          bonus: { name: 'Thưởng', color: 'gold' },
          other: { name: 'Khác', color: 'default' },
        };
        const category = categoryMap[categoryId] || categoryMap.other;
        return <Tag color={category.color}>{category.name}</Tag>;
      },
    },
    {
      title: 'Tài khoản',
      dataIndex: 'accountId',
      key: 'accountId',
      render: (accountId: string) => {
        const accountMap: Record<string, string> = {
          '1': 'Tiền mặt',
          '2': 'Vietcombank',
          '3': 'MoMo',
        };
        return accountMap[accountId] || 'Unknown';
      },
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
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record: Transaction) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách giao dịch</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm giao dịch
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} của ${total} giao dịch`,
        }}
      />

      <Modal
        title={editingTransaction ? 'Cập nhật giao dịch' : 'Thêm giao dịch mới'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalVisible(false)}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
}
