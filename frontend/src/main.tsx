import { StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from '@tanstack/react-router';

import { queryClient } from './integrations/tanstack-query/root-provider';
import { AuthContextProvider } from './utils/context/auth-context';
import { ThemeProvider } from './utils/context/theme-context';
import { useAuth } from './utils/hooks/use-auth';
import { router } from './router';

function AppRouter() {
  const { isAuthenticated, isInitialLoading, userData } = useAuth();
  const { email, id, name, role } = userData;

  useEffect(() => {
    void router.invalidate();
  }, [email, id, isAuthenticated, isInitialLoading, name, role]);

  return (
    <RouterProvider
      router={router}
      context={{
        queryClient,
        auth: {
          isAuthenticated,
          isInitialLoading,
          userData,
        },
      }}
    />
  );
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
