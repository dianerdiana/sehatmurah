import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { TooltipProvider } from '@/components/ui/tooltip';
import { TanStackDevtools } from '@tanstack/react-devtools';

import { Outlet } from '@tanstack/react-router';

import '../styles.css';
import React from 'react';
import TanstackQueryProvider from '@/integrations/tanstack-query/root-provider';
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools';

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
    </React.Suspense>
  );
}
