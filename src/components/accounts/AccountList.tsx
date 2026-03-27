'use client';

import { Table, Button, Tag, Space, Modal, message, Card, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined, BankOutlined, CreditCardOutlined, WalletOutlined } from '@ant-design/icons';
import { Account } from '@/types/expense';
import { useState } from 'react';
import { AccountForm } from './AccountForm';

interface AccountListProps {
  data: Account[];
  onAdd: (values: any) => void;
  onUpdate: (id: string, values: any) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export function AccountList({ data, onAdd, onUpdate, onDelete, loading }: AccountListProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | undefined>();
  const [formLoading, setFormLoading] = useState(false);

  const handleAdd = () => {
    setEditingAccount(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa tài khoản này?',
      onOk: () => {
        onDelete(id);
        message.success('Xóa tài khoản thành công');
      },
    });
  };

  const handleSubmit = async (values: any) => {
    setFormLoading(true);
    try {
      if (editingAccount) {
        await onUpdate(editingAccount.id, values);
        message.success('Cập nhật tài khoản thành công');
      } else {
        await onAdd(values);
        message.success('Thêm tài khoản thành công');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    } finally {
      setFormLoading(false);
    }
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'cash':
        return <WalletOutlined />;
      case 'bank':
        return <BankOutlined />;
      case 'credit_card':
        return <CreditCardOutlined />;
      default:
        return <BankOutlined />;
    }
  };

  const getAccountTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      cash: 'Tiền mặt',
      bank: 'Tài khoản ngân hàng',
      credit_card: 'Thẻ tín dụng',
      e_wallet: 'Ví điện tử',
      other: 'Khác',
    };
    return typeMap[type] || 'Khác';
  };

  const getTotalBalance = () => {
    return data.reduce((sum, account) => sum + account.balance, 0);
  };

  const columns: ColumnsType<Account> = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Account) => (
        <Space>
          {getAccountIcon(record.type)}
          <span>{name}</span>
        </Space>
      ),
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color="blue">{getAccountTypeName(type)}</Tag>
      ),
    },
    {
      title: 'Số dư',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance: number) => (
        <span className="font-semibold">
          {new Intl.NumberFormat('vi-VN').format(balance)} đ
        </span>
      ),
      sorter: (a, b) => a.balance - b.balance,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (description?: string) => description || '-',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record: Account) => (
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
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat('vi-VN').format(getTotalBalance())} đ
              </div>
              <div className="text-gray-600">Tổng số dư</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{data.length}</div>
              <div className="text-gray-600">Số tài khoản</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {data.filter(a => a.balance > 0).length}
              </div>
              <div className="text-gray-600">Tài khoản có dư</div>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách tài khoản</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm tài khoản
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
          showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} của ${total} tài khoản`,
        }}
      />

      <Modal
        title={editingAccount ? 'Cập nhật tài khoản' : 'Thêm tài khoản mới'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <AccountForm
          account={editingAccount}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalVisible(false)}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
}
