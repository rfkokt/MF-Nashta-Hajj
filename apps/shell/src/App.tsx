import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { queryClient } from '@my-saas/shared-api';
import { AppRouter } from './router';
import { useAuthEvents } from './hooks/useAuthEvents';

function AuthEventListener() {
  useAuthEvents();
  return null;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthEventListener />
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
