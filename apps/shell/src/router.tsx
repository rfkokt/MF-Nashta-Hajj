import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAuthStore } from '@nashta/shared-types';
import { Layout } from './components/Layout';
import { RemoteLoader } from './components/RemoteLoader';
import { Dashboard } from './pages/Dashboard';
import { UIKitPage } from './pages/UIKit';
import { NotFound } from './pages/NotFound';

// Lazy load remote MFE pages via Module Federation
// The MF Vite plugin intercepts these imports at build time
const RemoteLogin = lazy(() => import('authMfe/LoginPage'));
const RemoteRegister = lazy(() => import('authMfe/RegisterPage'));

const RemoteDocs = lazy(() => import('docsmfe/App'));

/**
 * Auth guard: redirects to /auth/login if not authenticated.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrating = useAuthStore((s) => s.isHydrating);

  if (isHydrating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

/**
 * Guest route: redirects to / if already authenticated.
 */
function GuestRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Routes>
      {/* Auth routes — loaded from auth-mfe remote */}
      <Route
        path="/auth/login"
        element={
          <GuestRoute>
            <RemoteLoader>
              <RemoteLogin />
            </RemoteLoader>
          </GuestRoute>
        }
      />
      <Route
        path="/auth/register"
        element={
          <GuestRoute>
            <RemoteLoader>
              <RemoteRegister />
            </RemoteLoader>
          </GuestRoute>
        }
      />

      {/* Protected routes — wrapped in layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        
        {/* UI Kit showcase */}
        <Route path="ui-kit/*" element={<UIKitPage />} />
        
        {/* Remote Documentation MFE */}
        <Route 
          path="docs/*" 
          element={
            <RemoteLoader>
              <RemoteDocs />
            </RemoteLoader>
          } 
        />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
