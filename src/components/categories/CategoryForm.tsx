'use client';

import { Form, Input, Select, Button, Space, ColorPicker } from 'antd';
import { Category, TransactionType } from '@/types/expense';

const { TextArea } = Input;
const { Option } = Select;

interface CategoryFormProps {
  category?: Category;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

const icons = [
  '🍔', '🚗', '🛒', '🎮', '💰', '🎁', '🏠', '📚', '🏥', '🎓', 
  '✈️', '👔', '💼', '🍷', '☕', '🎬', '🎵', '⚽', '🏋️', '💊'
];

export function CategoryForm({ category, onSubmit, onCancel, loading }: CategoryFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      color: values.color?.toHexString?.() || values.color,
    };
    onSubmit(formattedValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...category,
        color: category?.color || '#1890ff',
      }}
    >
      <Form.Item
        label="Tên danh mục"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
      >
        <Input placeholder="Nhập tên danh mục" />
      </Form.Item>

      <Form.Item
        label="Loại danh mục"
        name="type"
        rules={[{ required: true, message: 'Vui lòng chọn loại danh mục' }]}
      >
        <Select placeholder="Chọn loại danh mục">
          <Option value="income">Thu nhập</Option>
          <Option value="expense">Chi tiêu</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Biểu tượng"
        name="icon"
      >
        <Select placeholder="Chọn biểu tượng">
          {icons.map(icon => (
            <Option key={icon} value={icon}>
              <Space>
                <span style={{ fontSize: '20px' }}>{icon}</span>
                <span>{icon}</span>
              </Space>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Màu sắc"
        name="color"
      >
        <ColorPicker showText />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
      >
        <TextArea placeholder="Nhập mô tả danh mục" rows={3} />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {category ? 'Cập nhật' : 'Thêm mới'}
          </Button>
          <Button onClick={onCancel}>
            Hủy
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
