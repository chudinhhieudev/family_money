'use client';

import { Form, Input, Select, Button, Space } from 'antd';
import { Account } from '@/types/expense';
import { ClientOnlyInputNumber } from '@/components/ui/ClientOnlyInputNumber';

const { TextArea } = Input;
const { Option } = Select;

interface AccountFormProps {
  account?: Account;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function AccountForm({ account, onSubmit, onCancel, loading }: AccountFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      balance: Number(values.balance),
    };
    onSubmit(formattedValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...account,
        balance: account?.balance,
      }}
    >
      <Form.Item
        label="Tên tài khoản"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
      >
        <Input placeholder="Nhập tên tài khoản" />
      </Form.Item>

      <Form.Item
        label="Loại tài khoản"
        name="type"
        rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản' }]}
      >
        <Select placeholder="Chọn loại tài khoản">
          <Option value="cash">Tiền mặt</Option>
          <Option value="bank">Tài khoản ngân hàng</Option>
          <Option value="credit_card">Thẻ tín dụng</Option>
          <Option value="e_wallet">Ví điện tử</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Số dư ban đầu"
        name="balance"
        rules={[{ required: true, message: 'Vui lòng nhập số dư' }]}
      >
        <ClientOnlyInputNumber
          style={{ width: '100%' }}
          placeholder="Nhập số dư"
          formatter={(value: string | number | undefined) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          min={0}
        />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
      >
        <TextArea placeholder="Nhập mô tả tài khoản" rows={3} />
      </Form.Item>

      <Form.Item>
        <Space size="small" className="flex flex-wrap gap-2">
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="flex-1 sm:flex-none min-w-[100px]"
          >
            {account ? 'Cập nhật' : 'Thêm mới'}
          </Button>
          <Button 
            onClick={onCancel}
            className="flex-1 sm:flex-none min-w-[80px]"
          >
            Hủy
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
