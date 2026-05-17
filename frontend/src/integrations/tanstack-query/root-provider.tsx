/* eslint-disable react-refresh/only-export-components */
import type React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function getContext() {
  const queryClient = new QueryClient();

  return {
    queryClient,
  };
}
export default function TanstackQueryProvider({ children }: { children: React.ReactNode }) {
  const context = getContext();

  return <QueryClientProvider client={context.queryClient}>{children}</QueryClientProvider>;
}
