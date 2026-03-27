'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { List, Avatar, Typography, Input, Button, Space, Badge } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chat-messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    }
    return [{
      id: '1',
      content: 'Xin chào! Tôi là trợ lý AI quản lý chi tiêu. Bạn có thể hỏi tôi về các giao dịch, tạo báo cáo, hoặc yêu cầu tôi thực hiện các tác vụ như thêm/chỉnh sửa/xóa giao dịch. Bạn muốn làm gì hôm nay?',
      sender: 'ai' as const,
      timestamp: new Date(),
    }];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Save messages to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Tôi đã nhận được yêu cầu của bạn. Hiện tại tôi đang trong chế độ demo, nhưng trong tương lai tôi sẽ có thể giúp bạn quản lý chi tiêu, tạo báo cáo và thực hiện các tác vụ quản lý chi tiêu tự động.',
        sender: 'ai',
        timestamp: new Date(),
      };
      const aiMessageMoney: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Của bé hết 500k tiền AI',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, aiMessage, aiMessageMoney]);
      setIsLoading(false);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <MainLayout>
      <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '16px 0',
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          marginBottom: 16
        }}>
          <List
            dataSource={messages}
            renderItem={(message) => (
              <List.Item
                style={{ 
                  border: 'none', 
                  padding: '8px 16px',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: 18,
                    backgroundColor: message.sender === 'user' ? '#1890ff' : '#f8f9fa',
                    color: message.sender === 'user' ? '#fff' : '#000',
                    boxShadow: message.sender === 'user' 
                      ? '0 2px 8px rgba(24, 144, 255, 0.3)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: message.sender === 'ai' ? '1px solid #e9ecef' : 'none',
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 8, 
                    marginBottom: 8,
                    flexDirection:  'row'
                  }}>
                    {message.sender === 'ai' ? (
                      <Avatar 
                        size="small" 
                        icon={<RobotOutlined />}
                        style={{ 
                          backgroundColor: '#666',
                          flexShrink: 0
                        }}
                      />
                    ): (
                      <Avatar 
                        size="small" 
                        icon={<UserOutlined />}
                        style={{ 
                          backgroundColor: '#1890ff',
                          flexShrink: 0
                        }}
                      />
                    )}
                    <Text style={{ 
                      fontSize: 11, 
                      opacity: 0.7, 
                      color: message.sender === 'user' ? '#fff' : '#666',
                      textAlign: message.sender === 'user' ? 'right' : 'left'
                    }}>
                      {message.sender === 'user' ? 'Bạn' : 'AI Assistant'}
                    </Text>
                    <Text style={{ 
                      fontSize: 10, 
                      opacity: 0.5, 
                      color: message.sender === 'user' ? '#fff' : '#999'
                    }}>
                      {formatTime(message.timestamp)}
                    </Text>
                  </div>
                  <div style={{ 
                    fontSize: 14, 
                    lineHeight: 1.5,
                    wordBreak: 'break-word'
                  }}>
                    {message.content}
                  </div>
                </div>
              </List.Item>
            )}
          />
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '8px 16px' }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: 18,
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar 
                    size="small" 
                    icon={<RobotOutlined />} 
                    style={{ 
                      backgroundColor: '#666',
                      flexShrink: 0
                    }} 
                  />
                  <Text style={{ color: '#666', fontSize: 14 }}>AI đang nhập...</Text>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ 
          borderTop: '1px solid #e9ecef', 
          padding: 16, 
          backgroundColor: '#fff',
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <Space.Compact style={{ width: '100%' }}>
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập tin nhắn của bạn..."
              autoSize={{ minRows: 1, maxRows: 3 }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{
                borderRadius: 20,
                fontSize: 14,
                padding: '12px 16px'
              }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              loading={isLoading}
              disabled={!inputValue.trim()}
              style={{
                borderRadius: 20,
                height: 'auto',
                padding: '8px 16px'
              }}
            >
              Gửi
            </Button>
          </Space.Compact>
          <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block', textAlign: 'center' }}>
            Shift+Enter để xuống dòng
          </Text>
        </div>
      </div>
    </MainLayout>
  );
}
