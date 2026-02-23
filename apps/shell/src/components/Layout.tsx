import { Outlet, useNavigate, NavLink } from 'react-router';
import { useAuthStore } from '@nashta/shared-types';
import { MFE_EVENTS, dispatchMfeEvent } from '@nashta/shared-types';
import { LogOut, LayoutDashboard, Menu, X, Sun, Moon, ChevronDown, Settings, HelpCircle, Package, ClipboardList, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

function CollapsibleSection({ label, icon: Icon, children, defaultOpen = false }: { label: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <span className="flex items-center gap-3">
          <Icon className="h-4 w-4" />
          {label}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="ml-7 mt-1 space-y-0.5 border-l border-neutral-200 dark:border-neutral-700 pl-3">
          {children}
        </div>
      )}
    </div>
  );
}

export function Layout() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    dispatchMfeEvent(MFE_EVENTS.AUTH.USER_LOGGED_OUT, {});
    useAuthStore.getState().clearAuth();
    navigate('/auth/login');
  };

  const subNavClass = ({ isActive }: { isActive: boolean }) =>
    `block py-1.5 px-2 rounded-lg text-sm transition-colors ${
      isActive
        ? 'font-semibold text-neutral-900 dark:text-white'
        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
    }`;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* ── Top Header Bar (full width, dark) ── */}
      <header className="h-16 bg-neutral-900 dark:bg-black flex items-center px-6 gap-4 sticky top-0 z-50 shrink-0">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-neutral-300 hover:text-white mr-2"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-sm">U</div>
          <span className="text-white font-bold text-lg tracking-tight hidden sm:inline">Uhud Tour</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Header actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="h-9 w-9 flex items-center justify-center rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors">
            🔔
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-neutral-700">
            <img src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Ahmad" alt="Avatar" className="h-9 w-9 rounded-full bg-neutral-700" />
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-semibold text-white leading-tight">{user?.name || 'Ahmad Fahim Hakim'}</span>
              <span className="text-[11px] text-neutral-400">{user?.email || 'ahmadfahim@gmail.com'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body: Sidebar + Content ── */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-16 left-0 z-40 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto flex flex-col overflow-y-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close button (mobile) */}
          <button
            className="lg:hidden absolute top-3 right-3 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Greeting */}
          <div className="px-6 pt-6 pb-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Selamat Datang,</p>
            <p className="text-lg font-bold leading-tight">{user?.name || 'Ahmad Fahim Hakim'} 👋</p>
          </div>

          {/* Navigation */}
          <nav className="px-4 pb-4 space-y-5 flex-1" aria-label="Main navigation">
            {/* Menu */}
            <div>
              <div className="px-3 mb-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Menu</div>
              <div className="space-y-1">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                    }`
                  }
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Beranda
                </NavLink>

                <CollapsibleSection label="Customer Service" icon={Users} defaultOpen>
                  <NavLink to="/docs" className={subNavClass}>Pendaftaran Jamaah</NavLink>
                </CollapsibleSection>

                <CollapsibleSection label="Manajemen Paket" icon={Package}>
                  <NavLink to="/kelola-paket" className={subNavClass}>Kelola Paket</NavLink>
                  <NavLink to="/aktifasi-paket" className={subNavClass}>Aktifasi Paket</NavLink>
                </CollapsibleSection>

                <CollapsibleSection label="Inventaris" icon={ClipboardList}>
                  <NavLink to="/purchase-request" className={subNavClass}>Purchase Request</NavLink>
                  <NavLink to="/purchase-order" className={subNavClass}>Purchase Order</NavLink>
                  <NavLink to="/receipt-order" className={subNavClass}>Receipt Order</NavLink>
                </CollapsibleSection>
              </div>
            </div>
          </nav>

          {/* Bottom — Lainnya */}
          <div className="px-4 pb-4 border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-1">
            <div className="px-3 mb-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Lainnya</div>
            <NavLink
              to="/pengaturan"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                }`
              }
            >
              <Settings className="h-4 w-4" />
              Pengaturan
            </NavLink>
            <NavLink
              to="/bantuan"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                }`
              }
            >
              <HelpCircle className="h-4 w-4" />
              Bantuan
            </NavLink>
            <button
              className="flex items-center gap-3 px-3 py-2 w-full rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors text-left"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>
        </aside>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <main id="main-content" className="flex-1 p-6 lg:px-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
