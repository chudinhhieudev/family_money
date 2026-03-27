'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TransactionList } from '@/components/transactions/TransactionList';
import { Transaction } from '@/types/expense';

export const dynamic = 'force-dynamic';

// Mock data for demo
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 150000,
    description: 'Ăn trưa tại nhà hàng',
    categoryId: 'food',
    accountId: '1',
    date: '2024-03-27',
    createdAt: '2024-03-27T10:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '2',
    type: 'income',
    amount: 5000000,
    description: 'Lương tháng 3',
    categoryId: 'salary',
    accountId: '2',
    date: '2024-03-25',
    createdAt: '2024-03-25T09:00:00Z',
    updatedAt: '2024-03-25T09:00:00Z',
  },
  {
    id: '3',
    type: 'expense',
    amount: 85000,
    description: 'GrabBike đi làm',
    categoryId: 'transport',
    accountId: '3',
    date: '2024-03-27',
    createdAt: '2024-03-27T08:30:00Z',
    updatedAt: '2024-03-27T08:30:00Z',
  },
  {
    id: '4',
    type: 'expense',
    amount: 250000,
    description: 'Mua sách',
    categoryId: 'shopping',
    accountId: '1',
    date: '2024-03-26',
    createdAt: '2024-03-26T15:00:00Z',
    updatedAt: '2024-03-26T15:00:00Z',
  },
  {
    id: '5',
    type: 'expense',
    amount: 120000,
    description: 'Xem phim',
    categoryId: 'entertainment',
    accountId: '3',
    date: '2024-03-25',
    createdAt: '2024-03-25T20:00:00Z',
    updatedAt: '2024-03-25T20:00:00Z',
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (values: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTransactions([newTransaction, ...transactions]);
    setLoading(false);
  };

  const handleUpdate = async (id: string, values: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setTransactions(transactions.map(t => 
      t.id === id 
        ? { ...t, ...values, updatedAt: new Date().toISOString() }
        : t
    ));
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTransactions(transactions.filter(t => t.id !== id));
    setLoading(false);
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Quản lý giao dịch</h1>
        
        <TransactionList
          data={transactions}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </MainLayout>
  );
}
