import React from 'react';

import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools';
import TanstackQueryProvider from '@/integrations/tanstack-query/root-provider';

import '../styles.css';

export const Route = createRootRoute({
  component: RootDocument,
  notFoundComponent: () => <p>NotFound</p>,
});

function RootDocument() {
  return (
    <React.Suspense fallback={null}>
      <TanstackQueryProvider>
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      </TanstackQueryProvider>
      <Toaster position='top-right' />
    </React.Suspense>
  );
}
