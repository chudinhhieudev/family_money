'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CategoryList } from '@/components/categories/CategoryList';
import { Category } from '@/types/expense';

// Mock data for demo
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Lương',
    type: 'income',
    icon: '💰',
    color: '#52c41a',
    description: 'Lương hàng tháng',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '2',
    name: 'Thưởng',
    type: 'income',
    icon: '🎁',
    color: '#722ed1',
    description: 'Thưởng hiệu suất',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '3',
    name: 'Ăn uống',
    type: 'expense',
    icon: '🍔',
    color: '#ff4d4f',
    description: 'Chi tiêu cho ăn uống',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '4',
    name: 'Di chuyển',
    type: 'expense',
    icon: '🚗',
    color: '#1890ff',
    description: 'Chi tiêu đi lại, xăng xe',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '5',
    name: 'Mua sắm',
    type: 'expense',
    icon: '🛒',
    color: '#fa8c16',
    description: 'Mua sắm quần áo, đồ dùng',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
  {
    id: '6',
    name: 'Giải trí',
    type: 'expense',
    icon: '🎮',
    color: '#eb2f96',
    description: 'Đi chơi, xem phim, game',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-27T10:00:00Z',
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (values: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newCategory: Category = {
      id: Date.now().toString(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setCategories([newCategory, ...categories]);
    setLoading(false);
  };

  const handleUpdate = async (id: string, values: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCategories(categories.map(c => 
      c.id === id 
        ? { ...c, ...values, updatedAt: new Date().toISOString() }
        : c
    ));
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCategories(categories.filter(c => c.id !== id));
    setLoading(false);
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Quản lý danh mục</h1>
        
        <CategoryList
          data={categories}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </MainLayout>
  );
}
