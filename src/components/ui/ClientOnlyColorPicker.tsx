'use client';

import { useState, useEffect } from 'react';
import { ColorPicker } from 'antd';

interface ClientOnlyColorPickerProps {
  value?: string;
  onChange?: (color: any) => void;
  showText?: boolean;
}

export function ClientOnlyColorPicker({ value, onChange, showText }: ClientOnlyColorPickerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div 
        style={{
          width: '100%',
          height: 40,
          border: '1px solid #d9d9d9',
          borderRadius: 6,
          backgroundColor: value || '#ffffff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 11px',
          cursor: 'pointer',
        }}
      >
        {showText && (
          <span style={{ fontSize: 14, color: '#000000' }}>
            {value || '#ffffff'}
          </span>
        )}
      </div>
    );
  }

  return (
    <ColorPicker 
      value={value} 
      onChange={onChange} 
      showText={showText}
    />
  );
}
