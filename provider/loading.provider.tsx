'use client';

import { ChatLoadingContext } from '@/context/loading.context';
import React, { useState } from 'react';

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ChatLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </ChatLoadingContext.Provider>
  );
}
