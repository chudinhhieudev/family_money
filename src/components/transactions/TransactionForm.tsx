'use client';

import { Form, Input, Select, InputNumber, DatePicker, Button, Space } from 'antd';
import { Transaction, TransactionType } from '@/types/expense';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface TransactionFormProps {
  transaction?: Transaction;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function TransactionForm({ transaction, onSubmit, onCancel, loading }: TransactionFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      amount: Number(values.amount),
    };
    onSubmit(formattedValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...transaction,
        date: transaction?.date ? dayjs(transaction.date) : dayjs(),
        amount: transaction?.amount,
      }}
    >
      <Form.Item
        label="Loại giao dịch"
        name="type"
        rules={[{ required: true, message: 'Vui lòng chọn loại giao dịch' }]}
      >
        <Select placeholder="Chọn loại giao dịch">
          <Option value="income">Thu nhập</Option>
          <Option value="expense">Chi tiêu</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Số tiền"
        name="amount"
        rules={[{ required: true, message: 'Vui lòng nhập số tiền' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Nhập số tiền"
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          min={0}
        />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
      >
        <TextArea placeholder="Nhập mô tả giao dịch" rows={2} />
      </Form.Item>

      <Form.Item
        label="Danh mục"
        name="categoryId"
        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
      >
        <Select placeholder="Chọn danh mục">
          <Option value="food">Ăn uống</Option>
          <Option value="transport">Di chuyển</Option>
          <Option value="shopping">Mua sắm</Option>
          <Option value="entertainment">Giải trí</Option>
          <Option value="salary">Lương</Option>
          <Option value="bonus">Thưởng</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Tài khoản"
        name="accountId"
        rules={[{ required: true, message: 'Vui lòng chọn tài khoản' }]}
      >
        <Select placeholder="Chọn tài khoản">
          <Option value="1">Tiền mặt</Option>
          <Option value="2">Vietcombank</Option>
          <Option value="3">MoMo</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Ngày giao dịch"
        name="date"
        rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
      >
        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {transaction ? 'Cập nhật' : 'Thêm mới'}
          </Button>
          <Button onClick={onCancel}>
            Hủy
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
