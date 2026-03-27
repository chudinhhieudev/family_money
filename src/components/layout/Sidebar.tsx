'use client';

import { useState } from 'react';
import { Layout, Menu, Button, theme, Image } from 'antd';
import {
  DashboardOutlined,
  BankOutlined,
  CreditCardOutlined,
  TagsOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
    },
    {
      key: '/transactions',
      icon: <FileTextOutlined />,
      label: 'Giao dịch',
    },
    {
      key: '/accounts',
      icon: <BankOutlined />,
      label: 'Tài khoản',
    },
    {
      key: '/categories',
      icon: <TagsOutlined />,
      label: 'Danh mục',
    },
    {
      key: '/reports',
      icon: <CreditCardOutlined />,
      label: 'Báo cáo',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        background: colorBgContainer,
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        {collapsed ? (
          <Image
            src="/logo.png"
            alt="Logo"
            preview={false}
            style={{
              height: 32,
              width: 32,
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        ) : (
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              preview={false}
              style={{
                height: 32,
                width: 32,
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <h1 className="font-bold text-gray-800 text-xl">
              Than Nu Si
            </h1>
          </div>
        )}
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
}
