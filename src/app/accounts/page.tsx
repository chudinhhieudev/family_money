'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AccountList } from '@/components/accounts/AccountList';
import { Account } from '@/types/expense';
import { NoSSRWrapper } from '@/components/ui/NoSSRWrapper';

export const dynamic = 'force-dynamic';

// Mock data for demo
const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Tiền mặt ví',
    type: 'cash',
    balance: 2500000,
    description: 'Tiền mặt mang theo hàng ngày',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '2',
    name: 'Vietcombank',
    type: 'bank',
    balance: 15000000,
    description: 'Tài khoản ngân hàng Vietcombank',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '3',
    name: 'MoMo',
    type: 'e_wallet',
    balance: 850000,
    description: 'Ví điện tử MoMo',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '4',
    name: 'Visa Credit Card',
    type: 'credit_card',
    balance: -2000000,
    description: 'Thẻ tín dụng Visa',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (values: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAccount: Account = {
      id: Date.now().toString(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setAccounts([newAccount, ...accounts]);
    setLoading(false);
  };

  const handleUpdate = async (id: string, values: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setAccounts(accounts.map(a => 
      a.id === id 
        ? { ...a, ...values, updatedAt: new Date().toISOString() }
        : a
    ));
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setAccounts(accounts.filter(a => a.id !== id));
    setLoading(false);
  };

  return (
    <MainLayout>
      <NoSSRWrapper>
        <div>
          <h1 className="text-2xl font-bold mb-6">Quản lý tài khoản</h1>
          
          <AccountList
            data={accounts}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </NoSSRWrapper>
    </MainLayout>
  );
}
