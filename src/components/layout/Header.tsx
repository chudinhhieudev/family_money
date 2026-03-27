'use client';

import { Button, Space, Typography, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Header({ collapsed, onToggle }: HeaderProps) {
  return (
    <div
      style={{
        padding: '0 16px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        position: 'sticky',
        top: 0,
        zIndex: 99,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        style={{
          fontSize: '16px',
          width: 48,
          height: 48,
        }}
      />
      
      <Space size="small">
        <Title 
          level={5} 
          style={{ 
            margin: 0, 
            color: '#666',
            fontSize: '14px',
          }} 
          className="hidden sm:block"
        >
          Chào mừng trở lại!
        </Title>
        <Avatar size="small" icon={<UserOutlined />} />
      </Space>
    </div>
  );
}
