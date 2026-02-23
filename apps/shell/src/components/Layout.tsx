import { Outlet, useNavigate, NavLink } from 'react-router';
import { useAuthStore } from '@nashta/shared-types';
import { MFE_EVENTS, dispatchMfeEvent } from '@nashta/shared-types';
import { Button } from '@nashta/ui-kit';
import { LogOut, LayoutDashboard, Menu, X, Book } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatchMfeEvent(MFE_EVENTS.AUTH.USER_LOGGED_OUT, {});
    useAuthStore.getState().clearAuth();
    navigate('/auth/login');
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Skip to main content — a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-neutral-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-800">
          <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Antygraviti
          </h1>
          <button
            className="lg:hidden text-neutral-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary-600/10 text-primary-400' 
                  : 'hover:bg-neutral-800 text-neutral-300 hover:text-white'
              }`
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/docs"
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary-600/10 text-primary-400' 
                  : 'hover:bg-neutral-800 text-neutral-300 hover:text-white'
              }`
            }
          >
            <Book className="h-4 w-4" />
            Documentation
          </NavLink>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-neutral-400 truncate">{user?.email || ''}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full text-neutral-400 hover:text-white" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center px-6 gap-4 sticky top-0 z-20">
          <button
            className="lg:hidden text-neutral-600 hover:text-neutral-900"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="text-sm text-neutral-500">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
