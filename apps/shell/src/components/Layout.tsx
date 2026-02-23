import { Outlet, useNavigate, NavLink } from 'react-router';
import { useAuthStore } from '@nashta/shared-types';
import { MFE_EVENTS, dispatchMfeEvent } from '@nashta/shared-types';
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
    <div className="flex min-h-screen bg-neutral-100 font-sans text-neutral-900">
      {/* Skip to main content — a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-tight">Uhud Tour</span>
              <span className="text-[10px] text-neutral-500 leading-tight">by PT Salam Gema Mandiri</span>
            </div>
          </div>
          <button
            className="lg:hidden text-neutral-400 hover:text-neutral-900"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-6 flex-1 overflow-y-auto" aria-label="Main navigation">
          {/* Section: Menu */}
          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-neutral-400 capitalize tracking-wide">Menu</div>
            <div className="space-y-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-neutral-900 text-white' 
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`
                }
              >
                <LayoutDashboard className="h-4 w-4" />
                Beranda
              </NavLink>
            </div>
          </div>

          {/* Section: Pendaftaran */}
          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-neutral-400 capitalize tracking-wide">Pendaftaran Jamaah</div>
            <div className="space-y-1">
              <NavLink
                to="/docs"
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-neutral-900 text-white' 
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`
                }
              >
                <Book className="h-4 w-4" />
                Documentation
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Bottom Sidebar - Settings / Logout */}
        <div className="p-4 border-t border-neutral-100 space-y-1">
          <div className="px-3 mb-2 text-xs font-semibold text-neutral-400 capitalize tracking-wide">Lainnya</div>
          <button 
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors text-left"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
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
        <header className="h-20 bg-neutral-100 lg:bg-transparent flex items-center px-6 gap-4 sticky top-0 z-20 justify-between lg:justify-end">
          <button
            className="lg:hidden text-neutral-600 hover:text-neutral-900"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 shadow-sm">
                <span className="text-lg">⚙️</span>
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 shadow-sm">
                <span className="text-lg">🔔</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 pl-4 border-l border-neutral-300">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shadow-sm">
                <img src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Ahmad" alt="User Avatar" className="h-10 w-10 rounded-full" />
              </div>
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-semibold text-neutral-900 leading-tight">{user?.name || 'Ahmad Fahim Hakim'}</span>
                <span className="text-xs text-neutral-500">{user?.email || 'ahmadfahim@gmail.com'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-1 p-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
