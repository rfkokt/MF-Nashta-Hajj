import './index.css';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@nashta/ui-kit';
import { CodeBlock } from './components/CodeBlock';

export function App() {
  return (
    <div className="p-8 mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

      {/* ═══════════════════════════════════ HEADER ═══════════════════════════════════ */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          📖 Buku Panduan Platform MFE
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400">
          Dokumentasi dan Standar Arsitektur Micro-Frontend Nashta Hajj
        </p>
      </div>

      {/* ═══════════ TABLE OF CONTENTS ═══════════ */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">📑 Daftar Isi</h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
            <div className="space-y-1">
              <p className="font-semibold text-primary-600 dark:text-primary-400 mt-2">🚀 Getting Started</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">1. Struktur Proyek</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">2. Menjalankan Aplikasi</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">3. Membuat MFE Baru (Step-by-Step)</p>
              <p className="font-semibold text-blue-600 dark:text-blue-400 mt-2">🏗️ Arsitektur</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">4. Token & Auth Management</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">5. API Client & Interceptors</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">6. Dynamic Remotes & Menu</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-purple-600 dark:text-purple-400 mt-2">🎨 UI & Styling</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">7. Shared UI Kit & Shadcn CLI</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">8. Tailwind CSS v4 & Theming</p>
              <p className="font-semibold text-amber-600 dark:text-amber-400 mt-2">📚 Panduan Lanjutan</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">9. Custom Events & Error Boundary</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">10. Environment & Dark Mode</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">11. Git Workflow & API Errors</p>
              <p className="text-neutral-500 dark:text-neutral-400 pl-4">12. Security Best Practices</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════════
          SECTION A: GETTING STARTED
          ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-2 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-primary-600 dark:text-primary-400">
          🚀 Getting Started
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Mulai dari sini jika baru pertama kali berkontribusi
        </p>
      </div>

      {/* 1. Struktur Proyek */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-400 text-sm font-bold">1</span>
            Struktur Proyek
          </CardTitle>
          <CardDescription>Bagaimana monorepo ini diorganisir</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Aplikasi (Micro-Frontends)</h3>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 list-disc ml-4">
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shell</code> — Aplikasi Induk (Port 4000). Mengelola layout & routing utama.</li>
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">auth-mfe</code> — Domain Autentikasi (Port 4001). Pre-loaded remote module.</li>
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">business-mfe</code> — Modul contoh bisnis (Port 4002).</li>
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">docs-mfe</code> — Modul dokumentasi ini (Port 4003).</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Pustaka Utama (Shared Libs)</h3>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 list-disc ml-4">
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">ui-kit</code> — Komponen standar UI (Tailwind v4 / Radix UI / Shadcn).</li>
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shared-types</code> — Contract TypeScript dan state login (Zustand).</li>
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shared-api</code> — Setup Axios dan Endpoint (dilindungi interceptor).</li>
            </ul>
          </div>
          <CodeBlock
            language="bash"
            codeString={`nashta-hajj/
├── apps/
│   ├── shell/          ← Host (Port 4000)
│   ├── auth-mfe/       ← Login & Auth (Port 4001)
│   ├── business-mfe/   ← Contoh bisnis (Port 4002)
│   └── docs-mfe/       ← Halaman ini (Port 4003)
├── libs/
│   ├── ui-kit/         ← Design System (@nashta/ui-kit)
│   ├── shared-types/   ← TypeScript contracts (@nashta/shared-types)
│   └── shared-api/     ← Axios interceptors (@nashta/shared-api)
├── tools/              ← Generator & scripts
├── components.json     ← Shadcn CLI config
└── package.json`}
          />
        </CardContent>
      </Card>

      {/* 2. Menjalankan Aplikasi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 text-sm font-bold">2</span>
            Menjalankan Aplikasi
          </CardTitle>
          <CardDescription>Perintah CLI untuk pengembangan lokal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <CodeBlock
            language="bash"
            codeString={`# Install dependencies
pnpm install

# Jalankan SEMUA modul sekaligus (recommended)
pnpm dev

# Atau jalankan secara spesifik
pnpm nx run-many --target=serve --projects=shell,auth-mfe --parallel

# Buka di browser
# Shell:     http://localhost:4000
# Auth MFE:  http://localhost:4001
# Biz MFE:   http://localhost:4002
# Docs MFE:  http://localhost:4003`}
          />
        </CardContent>
      </Card>

      {/* 3. Membuat MFE Baru — STEP BY STEP */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 text-sm font-bold">3</span>
            Membuat MFE Baru (Step-by-Step)
          </CardTitle>
          <CardDescription>5 langkah membuat Micro-Frontend baru dari nol</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 3.1 */}
          <div className="border-l-4 border-emerald-400 dark:border-emerald-600 pl-4 space-y-2">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Step 1: Generate via Nx CLI</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Perintah ini membuat folder React+Vite+Module Federation+Tailwind v4 secara otomatis dan mendaftarkannya ke <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shell/public/remotes.json</code>.
            </p>
            <CodeBlock
              language="bash"
              codeString={`# Format: pnpm nx g @nashta/tools:mfe <nama-mfe> --port=<port>
pnpm nx g @nashta/tools:mfe reporting-mfe --port=4004`}
            />
          </div>

          {/* Step 3.2 */}
          <div className="border-l-4 border-emerald-400 dark:border-emerald-600 pl-4 space-y-2">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Step 2: Daftarkan Route di Shell</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Tambah lazy import dan route di <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">apps/shell/src/router.tsx</code>
            </p>
            <CodeBlock
              language="tsx"
              codeString={`// apps/shell/src/router.tsx
import { lazy } from 'react';
import { RemoteLoader } from './components/RemoteLoader';

// 1. Lazy import (nama tanpa dash)
const ReportingApp = lazy(() => import('reportingMfe/App'));

// 2. Tambah route di dalam <Layout />
<Route path="reporting/*" element={
  <RemoteLoader>
    <ReportingApp />
  </RemoteLoader>
} />`}
            />
          </div>

          {/* Step 3.3 */}
          <div className="border-l-4 border-emerald-400 dark:border-emerald-600 pl-4 space-y-2">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Step 3: Tambah Menu di Sidebar</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Tambah entry di <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">apps/shell/src/data/mock-menus.ts</code> untuk sidebar navigation.
            </p>
            <CodeBlock
              language="tsx"
              codeString={`// apps/shell/src/data/mock-menus.ts
{
  id: 'reporting',
  label: 'Reporting',
  icon: 'BarChart3',    // Nama icon Lucide
  path: '/reporting',
}`}
            />
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm">
              <p className="font-semibold text-amber-800 dark:text-amber-300">⚠️ Penting</p>
              <p className="text-amber-700 dark:text-amber-400">
                Gunakan <code className="text-xs bg-amber-100 dark:bg-amber-900/50 px-1 rounded">NavLink</code> dari react-router, BUKAN <code className="text-xs bg-amber-100 dark:bg-amber-900/50 px-1 rounded">&lt;a href&gt;</code>! Tag &lt;a&gt; akan trigger full page reload dan kehilangan state login.
              </p>
            </div>
          </div>

          {/* Step 3.4 */}
          <div className="border-l-4 border-emerald-400 dark:border-emerald-600 pl-4 space-y-2">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Step 4: Import Shared Libraries</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Gunakan library bersama. Jangan buat Axios sendiri!
            </p>
            <CodeBlock
              language="tsx"
              codeString={`// Di MFE baru Anda:
import { Button, Input, Card } from '@nashta/ui-kit';
import { useAuthStore } from '@nashta/shared-types';
import { apiClient } from '@nashta/shared-api';

// Contoh fetch data
const res = await apiClient.get('/api/reports');
// ↑ Token otomatis diinject via interceptor!`}
            />
          </div>

          {/* Step 3.5 */}
          <div className="border-l-4 border-emerald-400 dark:border-emerald-600 pl-4 space-y-2">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Step 5: Jalankan & Verifikasi</h3>
            <CodeBlock
              language="bash"
              codeString={`# Jalankan semua
pnpm dev

# Atau hanya shell + MFE baru
pnpm nx run-many --target=serve --projects=shell,reporting-mfe --parallel

# Buka http://localhost:4000/reporting`}
            />
          </div>

          {/* Checklist summary */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
            <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">✅ Checklist MFE Baru</h4>
            <ul className="space-y-1.5 text-sm text-emerald-700 dark:text-emerald-400">
              <li>☐ Generate folder: <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">pnpm nx g @nashta/tools:mfe nama-mfe --port=PORT</code></li>
              <li>☐ Route di <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">router.tsx</code> Shell</li>
              <li>☐ Menu entry di <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">mock-menus.ts</code></li>
              <li>☐ Icon terdaftar di <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">icon-map.ts</code></li>
              <li>☐ Pakai <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">@nashta/ui-kit</code>, <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">@nashta/shared-api</code>, <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">@nashta/shared-types</code></li>
              <li>☐ Test di browser: <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">http://localhost:4000/nama-url</code></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════════
          SECTION B: ARSITEKTUR
          ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-2 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          🏗️ Arsitektur
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Cara kerja internal platform
        </p>
      </div>

      {/* 4. Token & Auth Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-400 text-sm font-bold">4</span>
              Token & Auth Management
            </CardTitle>
            <CardDescription>Zustand singleton untuk status login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Status login dan access token dikelola tunggal via Zustand Store di <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">@nashta/shared-types</code>.</p>
            <CodeBlock
              language="typescript"
              codeString={`import { useAuthStore } from '@nashta/shared-types';

// Di dalam React Component
const { accessToken, isAuthenticated, logout } = useAuthStore();`}
            />
            <p><strong>Auth Flow Lengkap:</strong></p>
            <ol className="list-decimal ml-4 space-y-1 text-sm">
              <li>User isi form login di <strong>auth-mfe</strong></li>
              <li>POST <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">/api/login</code> → server set HttpOnly cookie (refresh_token)</li>
              <li>Server response: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">{`{ access_token, user }`}</code></li>
              <li>auth-mfe dispatch event <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">USER_LOGGED_IN</code></li>
              <li>Shell simpan access_token di Zustand (memory only)</li>
              <li>Token expired? Interceptor auto-refresh via cookie</li>
              <li>Logout: Shell clear Zustand + POST <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">/api/logout</code></li>
            </ol>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-xs font-semibold text-red-700 dark:text-red-400">⚠️ Access Token HANYA di memory (Zustand) — TIDAK di localStorage/cookie!</p>
            </div>
          </CardContent>
        </Card>

        {/* 5. API Client & Interceptors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-400 text-sm font-bold">5</span>
              API Client & Interceptors
            </CardTitle>
            <CardDescription>Auto-inject token & error handling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Wajib gunakan <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">apiClient</code> dari <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">@nashta/shared-api</code>. Jangan buat Axios sendiri!</p>
            <CodeBlock
              language="typescript"
              codeString={`import { apiClient } from '@nashta/shared-api';

// Token otomatis disisipkan!
const res = await apiClient.get('/api/users/me');`}
            />
            <p><strong>Jika Token expired?</strong> Interceptor otomatis: hit /refresh → simpan token baru → replay request gagal.</p>

            <p><strong>Error Format Standar:</strong></p>
            <CodeBlock
              language="typescript"
              codeString={`interface AppError {
  code: string;        // 'AUTH_INVALID_CREDENTIALS'
  message: string;     // Human-readable
  statusCode: number;  // HTTP status
  details?: unknown;   // Validation errors
}

try {
  await apiClient.post('/api/login', data);
} catch (error) {
  const appError = error as AppError;
  toast.error(appError.message);
}`}
            />
          </CardContent>
        </Card>
      </div>

      {/* 6. Dynamic Remotes & Dynamic Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-400 text-sm font-bold">6a</span>
              Dynamic Remotes
            </CardTitle>
            <CardDescription>Module Federation berbasis konfigurasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Shell membaca daftar MFE dari <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">remotes.json</code> saat runtime — bukan hardcoded.</p>
            <p>Tim infra bisa repoint URL (misal ke versi MFE lama saat error) tanpa build ulang Shell.</p>
            <CodeBlock
              language="json"
              codeString={`// shell/public/remotes.json
{
  "authMfe": "http://localhost:4001",
  "businessMfe": "http://localhost:4002",
  "docsMfe": "http://localhost:4003"
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-400 text-sm font-bold">6b</span>
              Dynamic Menu dari Backend
            </CardTitle>
            <CardDescription>Sidebar navigasi dari API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Menu sidebar di-fetch dari <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">GET /api/v1/menus</code>, dengan fallback ke mock data.</p>
            <CodeBlock
              language="tsx"
              codeString={`// TypeScript contract
interface MenuItem {
  id: string;
  label: string;
  icon: string;         // Lucide icon name
  path: string;
  children?: MenuItem[];
  badge?: string;       // "NEW" atau "3"
}

interface MenuGroup {
  title: string;        // "MENU", "LAINNYA"
  items: MenuItem[];
}`}
            />
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">💡 Selalu sediakan mock data sebagai fallback di <code className="text-xs bg-blue-100 dark:bg-blue-900/50 px-1 rounded">mock-menus.ts</code></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION C: UI & STYLING
          ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-2 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-purple-600 dark:text-purple-400">
          🎨 UI & Styling
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Design System dan Tailwind
        </p>
      </div>

      {/* 7. Shared UI Kit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-700 dark:text-fuchsia-400 text-sm font-bold">7</span>
            Shared UI Kit & Shadcn CLI
          </CardTitle>
          <CardDescription>Konsistensi desain antar MFE</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>Jangan buat komponen dari awal! Gunakan <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">@nashta/ui-kit</code> untuk konsistensi.</p>
          <CodeBlock
            language="tsx"
            codeString={`import { Button, Input, Card, Badge, Modal } from '@nashta/ui-kit';

<Card className="p-4">
  <Input placeholder="Ketik sesuatu..." />
  <Button variant="outline">Simpan</Button>
</Card>`}
          />
          <p><strong>Menambah komponen Shadcn baru:</strong></p>
          <CodeBlock
            language="bash"
            codeString={`# Otomatis install + fix imports + auto-export ke barrel
pnpm add:ui accordion

# Langsung bisa import:
# import { Accordion } from '@nashta/ui-kit';`}
          />
          <p>Lihat galeri lengkap di halaman <strong>/ui-kit</strong> di sidebar.</p>
        </CardContent>
      </Card>

      {/* 8. Tailwind & Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-400 text-sm font-bold">8a</span>
              Tailwind CSS v4
            </CardTitle>
            <CardDescription>Styling sudah terkonfigurasi otomatis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Semua MFE sudah support Tailwind v4. Warna brand diatur di <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">ui-kit</code>.</p>
            <CodeBlock
              language="tsx"
              codeString={`// Langsung pakai class Tailwind
<div className="text-primary-600 bg-primary-50">
  Teks Brand!
</div>`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-400 text-sm font-bold">8b</span>
              Theme Customization
            </CardTitle>
            <CardDescription>Mengganti warna brand global</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Ubah satu file → otomatis teraplikasi ke semua MFE:</p>
            <CodeBlock
              language="css"
              codeString={`/* libs/ui-kit/src/index.css */
@theme {
  --color-primary-50: #f0fdf4;
  --color-primary-100: #dcfce7;
  --color-primary-500: #22c55e;
  --color-primary-600: #16a34a;
  --color-primary-900: #14532d;
}`}
            />
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION D: PANDUAN LANJUTAN
          ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-2 pt-4">
        <h2 className="text-3xl font-bold tracking-tight text-amber-600 dark:text-amber-400">
          📚 Panduan Lanjutan
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Topik teknis mendalam
        </p>
      </div>

      {/* 9. Custom Events & Error Boundary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-400 text-sm font-bold">9a</span>
              Custom Event Contract
            </CardTitle>
            <CardDescription>Komunikasi antar MFE via Browser Events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Semua event wajib pakai prefix dari <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shared-types</code>. Jangan buat event string manual.</p>
            <CodeBlock
              language="typescript"
              codeString={`import { MFE_EVENTS, dispatchMfeEvent } from '@nashta/shared-types';

// Dispatch
dispatchMfeEvent(MFE_EVENTS.AUTH.USER_LOGGED_IN, {
  userId: user.id,
  accessToken: token,
});

// Listen
window.addEventListener(
  MFE_EVENTS.AUTH.USER_LOGGED_IN,
  (e: CustomEvent) => { ... }
);`}
            />
            <p><strong>Events tersedia:</strong></p>
            <ul className="list-disc ml-4 space-y-1">
              <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AUTH.USER_LOGGED_IN</code></li>
              <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AUTH.USER_LOGGED_OUT</code></li>
              <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AUTH.TOKEN_REFRESHED</code></li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400 text-sm font-bold">9b</span>
              Error Boundary & Resilience
            </CardTitle>
            <CardDescription>Jika MFE crash, Shell tetap jalan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Setiap remote import wajib dibungkus <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">RemoteLoader</code> (Suspense + ErrorBoundary wrapper).</p>
            <CodeBlock
              language="tsx"
              codeString={`<RemoteLoader>
  <AuthApp />
</RemoteLoader>`}
            />
            <p><strong>Fallback UI:</strong></p>
            <ul className="list-disc ml-4 space-y-1">
              <li><strong>Loading:</strong> Skeleton shimmer (Suspense)</li>
              <li><strong>Crash:</strong> Card error + tombol Retry</li>
              <li><strong>Timeout:</strong> Pesan offline + Refresh</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 10. Environment & Dark Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-100 dark:bg-lime-900 text-lime-700 dark:text-lime-400 text-sm font-bold">10a</span>
              Environment Variables
            </CardTitle>
            <CardDescription>Konfigurasi .env per environment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Semua variabel wajib prefix <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">VITE_</code>.</p>
            <CodeBlock
              language="bash"
              codeString={`# .env.development
VITE_AUTH_MFE_URL=http://localhost:4001
VITE_API_BASE_URL=http://localhost:4003

# .env.production
VITE_AUTH_MFE_URL=https://auth.nashta.com
VITE_API_BASE_URL=https://api.nashta.com`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 text-sm font-bold">10b</span>
              Dark Mode
            </CardTitle>
            <CardDescription>Toggle tema gelap/terang</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>Class-based dark mode. Toggle menambah/menghapus <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">.dark</code> pada &lt;html&gt;.</p>
            <p><strong>Prioritas:</strong> User preference → System preference → Default (light).</p>
            <p>User preference tersimpan di <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">localStorage</code>.</p>
          </CardContent>
        </Card>
      </div>

      {/* 11. Git & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 text-sm font-bold">11a</span>
              Git Workflow
            </CardTitle>
            <CardDescription>Commit convention & branch naming</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <CodeBlock
              language="bash"
              codeString={`# Commit Convention
feat(auth-mfe): add forgot password flow
fix(shell): resolve token refresh race condition
chore(ui-kit): update Button component variants

# Branch Naming
feat/AUTH-123-forgot-password
fix/SHELL-456-token-race-condition`}
            />
            <p>Format: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">{`{type}/{TICKET-ID}-{short-description}`}</code></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-400 text-sm font-bold">11b</span>
              Performance Budget
            </CardTitle>
            <CardDescription>Batas ukuran JS/CSS per MFE</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <ul className="list-disc ml-4 space-y-1">
              <li><strong>Max JS:</strong> 250 KB (Brotli)</li>
              <li><strong>Max CSS:</strong> 50 KB (Brotli)</li>
            </ul>
            <CodeBlock
              language="bash"
              codeString={`# Check bundle size
pnpm budget:check

# Lihat stats.html
open dist/apps/*/stats.html`}
            />
          </CardContent>
        </Card>
      </div>

      {/* 12. Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400 text-sm font-bold">12</span>
            Security Best Practices
          </CardTitle>
          <CardDescription>Standar keamanan wajib untuk semua MFE</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">✅ WAJIB</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Access token HANYA di memory (Zustand)</li>
                <li>Gunakan <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">apiClient</code> dari shared-api</li>
                <li>Form validasi pakai schema (Yup/Zod)</li>
                <li>Internal packages pakai scope <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">@nashta/</code></li>
                <li>Jalankan <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">pnpm audit</code> — 0 High/Critical</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ DILARANG</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Simpan token di localStorage / cookie</li>
                <li>Buat Axios instance sendiri</li>
                <li>Gunakan <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">dangerouslySetInnerHTML</code></li>
                <li>Hardcode URL remote di config</li>
                <li>Redirect tanpa validasi allowlist</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
