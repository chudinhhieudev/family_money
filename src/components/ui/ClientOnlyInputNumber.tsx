'use client';

import { useState, useEffect } from 'react';
import { InputNumber } from 'antd';

interface ClientOnlyInputNumberProps {
  value?: number;
  onChange?: (value: number | null) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  formatter?: (value: string | number | undefined) => string;
  min?: number;
  max?: number;
}

export function ClientOnlyInputNumber({ 
  value, 
  onChange, 
  placeholder, 
  style, 
  formatter, 
  min, 
  max 
}: ClientOnlyInputNumberProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px 11px',
          border: '1px solid #d9d9d9',
          borderRadius: 6,
          fontSize: '16px',
          ...style,
        }}
        min={min}
        max={max}
      />
    );
  }

  return (
    <InputNumber
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      formatter={formatter}
      min={min}
      max={max}
    />
  );
}
