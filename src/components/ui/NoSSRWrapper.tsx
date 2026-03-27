'use client';

import { useState, useEffect } from 'react';

interface NoSSRWrapperProps {
  children: React.ReactNode;
}

export function NoSSRWrapper({ children }: NoSSRWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}
