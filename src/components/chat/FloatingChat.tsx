'use client';

import { useState, useRef, useEffect } from 'react';
import { Button, Card, Input, List, Avatar, Typography, Space, Badge } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined, MessageOutlined, CloseOutlined, DragOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function FloatingChat() {
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chat-minimized');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
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
  const [unreadCount, setUnreadCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chat-unread-count');
      return saved ? JSON.parse(saved) : 0;
    }
    return 0;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [mobileChatHeight, setMobileChatHeight] = useState(400);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && !isMinimized) {
        setIsMinimized(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMinimized]);

  // Save states to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-minimized', JSON.stringify(isMinimized));
    }
  }, [isMinimized]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-unread-count', JSON.stringify(unreadCount));
    }
  }, [unreadCount]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        // Mobile: tính toán chiều cao hợp lý
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        
        // Tính chiều cao tối đa: 60% screen height, max 500px, min 300px
        const maxHeight = Math.min(Math.max(screenHeight * 0.6, 300), 500);
        setMobileChatHeight(maxHeight);
        
        setPosition({
          x: window.innerWidth - (isMinimized ? 60 : window.innerWidth - 20),
          y: window.innerHeight - (isMinimized ? 60 : window.innerHeight - 20),
        });
      } else {
        // Desktop: vị trí mặc định
        setPosition({
          x: window.innerWidth - 400,
          y: window.innerHeight - 550,
        });
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMinimized]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMobile) return; // Disable drag on mobile
      
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Giới hạn trong màn hình
      const chatWidth = isMinimized ? 60 : 380;
      const chatHeight = isMinimized ? 60 : 500;
      const maxX = window.innerWidth - chatWidth;
      const maxY = window.innerHeight - chatHeight;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, isMinimized, isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return; // Disable drag on mobile
    const rect = chatRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

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
        content: 'Tôi đã nhận được yêu cầu của bạn. Hiện tại tôi đang trong chế độ demo, nhưng trong tương lai tôi sẽ có thể giúp bạn quản lý chi tiêu, tạo báo cáo và thực hiện các tác vụ CRUD tự động.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, aiMessage]);
      setIsLoading(false);
      
      // Tăng số thông báo chưa đọc nếu chat đang thu nhỏ
      if (isMinimized) {
        setUnreadCount((prev: number) => prev + 1);
      }
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setUnreadCount(0);
    }
  };

  return (
    <div
      ref={chatRef}
      style={{
        position: 'fixed',
        left: isMobile ? 10 : position.x,
        right: isMobile ? 10 : 'auto',
        top: isMobile ? 'auto' : position.y,
        bottom: isMobile ? 10 : 'auto',
        zIndex: 1000,
        transition: isDragging ? 'none' : 'all 0.3s ease',
        maxWidth: isMobile ? 320 : 'none', // Max width for mobile container
      }}
    >
      {isMinimized ? (
        <Badge count={unreadCount} size="small">
          <Button
            type="primary"
            shape="circle"
            size={isMobile ? "middle" : "large"}
            icon={<MessageOutlined style={{ fontSize: isMobile ? 12 : 18 }} />}
            onClick={toggleMinimize}
            onMouseDown={handleMouseDown}
            style={{
              width: isMobile ? 48 : 56,
              height: isMobile ? 48 : 56,
              borderRadius: '50%',
              boxShadow: '0 4px 12px rgba(24,144,255,0.4)',
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
              cursor: isMobile ? 'pointer' : (isDragging ? 'grabbing' : 'grab'),
              transform: isDragging ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </Badge>
      ) : (
        <Card
          title={
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: isMobile ? 'default' : 'grab',
                userSelect: 'none',
              }}
              onMouseDown={handleMouseDown}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {!isMobile && <DragOutlined style={{ color: '#666', fontSize: 14 }} />}
                <span style={{ fontSize: isMobile ? 14 : 16 }}>
                  Trợ lý AI Quản lý Chi tiêu
                </span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={toggleMinimize}
                  style={{ color: '#666' }}
                />
              </div>
            </div>
          }
          style={{
            width: isMobile ? '100%' : 380,
            maxWidth: isMobile ? 300 : 380, // Max width 300px on mobile
            height: isMobile ? mobileChatHeight : 500,
            maxHeight: isMobile ? mobileChatHeight : 500,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            borderRadius: isMobile ? 8 : 12,
            cursor: isMobile ? 'default' : (isDragging ? 'grabbing' : 'default'),
          }}
          bodyStyle={{ 
            padding: 0, 
            display: 'flex', 
            flexDirection: 'column', 
            height: 'calc(100% - 57px)' 
          }}
        >
          <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? 12 : 16 }}>
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
                    style={{ 
                      maxWidth: isMobile ? '85%' : '80%',
                      padding: isMobile ? '8px 10px' : '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                      <Avatar 
                        size={isMobile ? "small" : "small"} 
                        icon={message.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                        style={{ 
                          backgroundColor: message.sender === 'user' ? '#1890ff' : '#666' 
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <Text 
                          style={{ 
                            fontSize: isMobile ? 11 : 12, 
                            opacity: 0.8,
                            color: message.sender === 'user' ? '#fff' : '#666'
                          }}
                        >
                          {message.sender === 'user' ? 'Bạn' : 'AI Assistant'}
                        </Text>
                      </div>
                      <Text 
                        style={{ 
                          fontSize: isMobile ? 10 : 11, 
                          opacity: 0.7,
                          color: message.sender === 'user' ? '#fff' : '#999'
                        }}
                      >
                        {formatTime(message.timestamp)}
                      </Text>
                    </div>
                    <div style={{ marginTop: 4, fontSize: isMobile ? 13 : 14 }}>
                      {message.content}
                    </div>
                  </div>
                </List.Item>
              )}
            />
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', padding: 8 }}>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg" style={{ 
                  maxWidth: isMobile ? '85%' : '80%',
                  padding: isMobile ? '8px 10px' : '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar size="small" icon={<RobotOutlined />} style={{ backgroundColor: '#666' }} />
                    <Text style={{ color: '#666', fontSize: isMobile ? 12 : 14 }}>AI đang nhập...</Text>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div style={{ borderTop: '1px solid #f0f0f0', padding: isMobile ? 12 : 16 }}>
            <Space.Compact style={{ width: '100%' }}>
              <TextArea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập tin nhắn của bạn..."
                autoSize={{ minRows: 1, maxRows: isMobile ? 2 : 3 }}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                style={{ fontSize: isMobile ? 14 : 16 }}
              />
              <Button
                className='ml-2'
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                loading={isLoading}
                disabled={!inputValue.trim()}
                style={{ fontSize: isMobile ? 12 : 14 }}
              >
                {isMobile ? '' : 'Gửi'}
              </Button>
            </Space.Compact>
            <Text type="secondary" style={{ fontSize: isMobile ? 10 : 12, marginTop: 8, display: 'block' }}>
              {isMobile ? 'Shift+Enter xuống dòng' : 'Shift+Enter để xuống dòng • Kéo tiêu đề để di chuyển'}
            </Text>
          </div>
        </Card>
      )}
    </div>
  );
}
