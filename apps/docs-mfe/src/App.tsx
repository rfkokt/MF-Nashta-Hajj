import React from 'react';
import './index.css';
import { useLocation, Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

// Section imports
import { DocsOverviewSection } from './pages/DocsOverviewSection';
import { DocsStrukturSection } from './pages/DocsStrukturSection';
import { DocsMenjalankanSection } from './pages/DocsMenjalankanSection';
import { DocsMembuatMfeSection } from './pages/DocsMembuatMfeSection';
import { DocsTokenAuthSection } from './pages/DocsTokenAuthSection';
import { DocsApiInterceptorsSection } from './pages/DocsApiInterceptorsSection';
import { DocsDynamicRemotesSection } from './pages/DocsDynamicRemotesSection';
import { DocsSharedUiKitSection } from './pages/DocsSharedUiKitSection';
import { DocsTailwindThemeSection } from './pages/DocsTailwindThemeSection';
import { DocsEventsErrorSection } from './pages/DocsEventsErrorSection';
import { DocsEnvDarkModeSection } from './pages/DocsEnvDarkModeSection';
import { DocsGitPerfSection } from './pages/DocsGitPerfSection';
import { DocsSecuritySection } from './pages/DocsSecuritySection';

type SectionData = {
  component: React.FC;
  title: string;
  category: string;
};

/* ─── Section Map ─── */
export const SECTION_MAP: Record<string, SectionData> = {
  'struktur-proyek': { component: DocsStrukturSection, title: '1. Struktur Proyek', category: '🚀 Getting Started' },
  'menjalankan-aplikasi': { component: DocsMenjalankanSection, title: '2. Menjalankan Aplikasi', category: '🚀 Getting Started' },
  'membuat-mfe-baru': { component: DocsMembuatMfeSection, title: '3. Membuat MFE Baru', category: '🚀 Getting Started' },
  'token-auth': { component: DocsTokenAuthSection, title: '4. Token & Auth Management', category: '🏗️ Arsitektur' },
  'api-interceptors': { component: DocsApiInterceptorsSection, title: '5. API & Interceptors', category: '🏗️ Arsitektur' },
  'dynamic-remotes': { component: DocsDynamicRemotesSection, title: '6. Dynamic Remotes & Menu', category: '🏗️ Arsitektur' },
  'shared-ui-kit': { component: DocsSharedUiKitSection, title: '7. Shared UI Kit & Shadcn', category: '🎨 UI & Styling' },
  'tailwind-theme': { component: DocsTailwindThemeSection, title: '8. Tailwind v4 & Theming', category: '🎨 UI & Styling' },
  'events-error': { component: DocsEventsErrorSection, title: '9. Custom Events & Error', category: '📚 Panduan Lanjutan' },
  'env-dark-mode': { component: DocsEnvDarkModeSection, title: '10. Environment & Dark Mode', category: '📚 Panduan Lanjutan' },
  'git-perf': { component: DocsGitPerfSection, title: '11. Git Workflow & Perf', category: '📚 Panduan Lanjutan' },
  'security': { component: DocsSecuritySection, title: '12. Security Best Practices', category: '📚 Panduan Lanjutan' },
};

/* ═══════════════════════════════════════════════
   Main Page — Router for Docs
   ═══════════════════════════════════════════════ */
export function App() {
  const location = useLocation();
  // Extract segment after /docs (e.g., /docs/struktur-proyek -> "struktur-proyek")
  const segments = location.pathname.split('/');
  const docsIndex = segments.indexOf('docs');
  const sectionSlug = docsIndex !== -1 ? segments[docsIndex + 1] : '';

  // 1. Overview Page
  if (!sectionSlug) {
    return (
      <div className="p-8 mx-auto w-full max-w-5xl">
        <DocsOverviewSection sectionMap={SECTION_MAP} />
      </div>
    );
  }

  // 2. Section Page
  if (sectionSlug in SECTION_MAP) {
    const data = SECTION_MAP[sectionSlug];
    const SectionComponent = data.component;
    
    return (
      <div className="p-8 mx-auto w-full max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        
        {/* Breadcrumb nav */}
        <div className="flex items-center text-sm text-neutral-500 mb-8 mt-2 space-x-1">
          <Link to="/docs" className="hover:text-primary-600 transition-colors">Dokumentasi</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-neutral-400">{data.category}</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{data.title}</span>
        </div>

        <SectionComponent />
        
        {/* Simple back navigation footer */}
        <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 flex justify-start">
          <Link 
            to="/docs" 
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Kembali ke Daftar Isi
          </Link>
        </div>
      </div>
    );
  }

  // 3. Not Found Fallback
  return (
    <div className="p-8 mx-auto w-full max-w-4xl text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-neutral-500 mb-6">Bagian dokumentasi yang Anda cari tidak ada.</p>
      <Link to="/docs" className="text-primary-600 hover:underline">Kembali ke Panduan Utama</Link>
    </div>
  );
}

export default App;
