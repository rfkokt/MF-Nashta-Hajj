import { Outlet, useNavigate, NavLink } from 'react-router';
import { useAuthStore, useMenuStore, useThemeStore, useNotificationStore, MFE_EVENTS, dispatchMfeEvent } from '@nashta/shared-types';
import type { MenuItem } from '@nashta/shared-types';
import { LogOut, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getIcon } from '../utils/icon-map';
import { MOCK_MENUS } from '../data/mock-menus';
import { ToastContainer } from '@nashta/ui-kit';

/* ─────────────────────────────────────────────
   Collapsible sidebar section (unchanged)
   ───────────────────────────────────────────── */
function CollapsibleSection({
  label,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
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

/* ─────────────────────────────────────────────
   NavLink class helpers
   ───────────────────────────────────────────── */
const topNavClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
    isActive
      ? 'nav-item-active bg-neutral-900 text-white'
      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
  }`;

const subNavClass = ({ isActive }: { isActive: boolean }) =>
  `block py-1.5 px-2 rounded-lg text-sm transition-colors ${
    isActive
      ? 'font-semibold text-neutral-900 dark:text-white'
      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
  }`;

/* ─────────────────────────────────────────────
   Render a single MenuItem (top-level or nested)
   ───────────────────────────────────────────── */
function SidebarItem({ item }: { item: MenuItem }) {
  const IconComp = getIcon(item.icon);

  // If item has children → render as collapsible group
  if (item.children && item.children.length > 0) {
    return (
      <CollapsibleSection label={item.label} icon={IconComp} defaultOpen={item.defaultOpen}>
        {item.children.map((child) => (
          <NavLink key={child.id} to={child.path} className={subNavClass}>
            {child.label}
          </NavLink>
        ))}
      </CollapsibleSection>
    );
  }

  // Otherwise → simple NavLink
  return (
    <NavLink to={item.path} end={item.path === '/'} className={topNavClass}>
      <IconComp className="h-4 w-4" />
      {item.label}
      {item.badge && (
        <span className="ml-auto text-[10px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded-full leading-none">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}

/* ─────────────────────────────────────────────
   Skeleton loader for sidebar
   ───────────────────────────────────────────── */
function SidebarSkeleton() {
  return (
    <div className="px-4 pt-4 space-y-3 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2">
          <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded flex-1" />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main Layout Component
   ═══════════════════════════════════════════════ */
export function Layout() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Theme store (persisted to localStorage, auto-applies .dark class)
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggle);

  // Menu store — initialize with mock data immediately, then try BE
  const menuGroups = useMenuStore((s) => s.groups) ?? [];
  const menuLoading = useMenuStore((s) => s.isLoading);

  useEffect(() => {
    // Always start with mock data so sidebar is never empty
    if (menuGroups.length === 0) {
      useMenuStore.getState().setMenus(MOCK_MENUS);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => {
    dispatchMfeEvent(MFE_EVENTS.AUTH.USER_LOGGED_OUT, {});
    useAuthStore.getState().clearAuth();
    navigate('/auth/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <ToastContainer toasts={useNotificationStore((s) => s.toasts)} onDismiss={useNotificationStore.getState().removeToast} />
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
            onClick={toggleTheme}
            className="h-9 w-9 flex items-center justify-center rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
          className={`max-lg:fixed max-lg:inset-y-16 max-lg:left-0 max-lg:z-40 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transform transition-transform duration-300 lg:translate-x-0 flex flex-col overflow-y-auto shrink-0 ${
            sidebarOpen ? 'translate-x-0' : 'max-lg:-translate-x-full'
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

          {/* ── Dynamic Navigation ── */}
          <nav className="px-4 pb-4 flex-1" aria-label="Main navigation">
            {menuLoading ? (
              <SidebarSkeleton />
            ) : (
              menuGroups.map((group, idx) => (
                <div key={group.title} className={idx > 0 ? 'border-t border-neutral-100 dark:border-neutral-800 pt-3 mt-3' : ''}>
                  <div className="px-3 mb-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {group.title}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <SidebarItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </nav>

          {/* Logout — always visible at bottom */}
          <div className="px-4 pb-4 border-t border-neutral-100 dark:border-neutral-800 pt-3">
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
