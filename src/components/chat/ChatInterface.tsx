'use client';

import { useState } from 'react';
import { Card, Input, Button, List, Avatar, Typography, Space } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Xin chào! Tôi là trợ lý AI quản lý chi tiêu. Bạn có thể hỏi tôi về các giao dịch, tạo báo cáo, hoặc yêu cầu tôi thực hiện các tác vụ như thêm/chỉnh sửa/xóa giao dịch. Bạn muốn làm gì hôm nay?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Tôi đã nhận được yêu cầu của bạn. Hiện tại tôi đang trong chế độ demo, nhưng trong tương lai tôi sẽ có thể giúp bạn quản lý chi tiêu, tạo báo cáo và thực hiện các tác vụ CRUD tự động.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
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
    <Card 
      title="Trợ lý AI Quản lý Chi tiêu" 
      className="h-[600px] flex flex-col"
      bodyStyle={{ 
        padding: 0, 
        display: 'flex', 
        flexDirection: 'column', 
        height: 'calc(100% - 57px)' 
      }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        <List
          dataSource={messages}
          renderItem={(message) => (
            <List.Item
              style={{ 
                border: 'none', 
                padding: '8px 0',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start gap-2 mb-1">
                  <Avatar 
                    size="small" 
                    icon={message.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                    className={message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-500'}
                  />
                  <div className="flex-1">
                    <Text 
                      className={message.sender === 'user' ? 'text-white' : 'text-gray-700'}
                      style={{ fontSize: '12px', opacity: 0.8 }}
                    >
                      {message.sender === 'user' ? 'Bạn' : 'AI Assistant'}
                    </Text>
                  </div>
                  <Text 
                    className={message.sender === 'user' ? 'text-white' : 'text-gray-500'}
                    style={{ fontSize: '11px', opacity: 0.7 }}
                  >
                    {formatTime(message.timestamp)}
                  </Text>
                </div>
                <div style={{ marginTop: '4px' }}>
                  {message.content}
                </div>
              </div>
            </List.Item>
          )}
        />
        {isLoading && (
          <div className="flex justify-start p-2">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
              <div className="flex items-center gap-2">
                <Avatar size="small" icon={<RobotOutlined />} className="bg-gray-500" />
                <Text className="text-gray-500">AI đang nhập...</Text>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4">
        <Space.Compact style={{ width: '100%' }}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nhập tin nhắn của bạn..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={isLoading}
            disabled={!inputValue.trim()}
          >
            Gửi
          </Button>
        </Space.Compact>
        <Text type="secondary" style={{ fontSize: '12px', marginTop: '8px', display: 'block' }}>
          Nhập Shift+Enter để xuống dòng, Enter để gửi tin nhắn
        </Text>
      </div>
    </Card>
  );
}
