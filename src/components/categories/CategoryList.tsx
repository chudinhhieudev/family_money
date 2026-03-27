'use client';

import { Table, Button, Tag, Space, Modal, message, Card, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Category } from '@/types/expense';
import { useState } from 'react';
import { CategoryForm } from './CategoryForm';

interface CategoryListProps {
  data: Category[];
  onAdd: (values: any) => void;
  onUpdate: (id: string, values: any) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export function CategoryList({ data, onAdd, onUpdate, onDelete, loading }: CategoryListProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [formLoading, setFormLoading] = useState(false);

  const handleAdd = () => {
    setEditingCategory(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa danh mục này?',
      onOk: () => {
        onDelete(id);
        message.success('Xóa danh mục thành công');
      },
    });
  };

  const handleSubmit = async (values: any) => {
    setFormLoading(true);
    try {
      if (editingCategory) {
        await onUpdate(editingCategory.id, values);
        message.success('Cập nhật danh mục thành công');
      } else {
        await onAdd(values);
        message.success('Thêm danh mục thành công');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    } finally {
      setFormLoading(false);
    }
  };

  const columns: ColumnsType<Category> = [
    {
      title: 'Biểu tượng',
      dataIndex: 'icon',
      key: 'icon',
      render: (icon: string) => (
        <span style={{ fontSize: '24px' }}>{icon || '📁'}</span>
      ),
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Category) => (
        <Space>
          <span>{name}</span>
          {record.color && (
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: record.color,
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
          )}
        </Space>
      ),
    },
    {
      title: 'Loại danh mục',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'income' ? 'green' : 'red'}>
          {type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
        </Tag>
      ),
      filters: [
        { text: 'Thu nhập', value: 'income' },
        { text: 'Chi tiêu', value: 'expense' },
      ],
      onFilter: (value, record) => record.type === value,
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
      render: (_, record: Category) => (
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

  const incomeCategories = data.filter(c => c.type === 'income');
  const expenseCategories = data.filter(c => c.type === 'expense');

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12}>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{incomeCategories.length}</div>
              <div className="text-gray-600">Danh mục thu nhập</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{expenseCategories.length}</div>
              <div className="text-gray-600">Danh mục chi tiêu</div>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách danh mục</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm danh mục
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
          showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} của ${total} danh mục`,
        }}
      />

      <Modal
        title={editingCategory ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalVisible(false)}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
}
