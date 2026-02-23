import './index.css';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@nashta/ui-kit';
import { CodeBlock } from './components/CodeBlock';

export function App() {
  return (
    <div className="p-8 mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Buku Panduan Platform MFE
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400">
          Dokumentasi dan Standar Arsitektur Micro-Frontend Nashta Hajj
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400">🏗️</span>
              Struktur Proyek
            </CardTitle>
            <CardDescription>Bagaimana monorepo ini diorganisir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Aplikasi (Micro-Frontends)</h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 list-disc ml-4">
                <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shell</code> - Aplikasi Induk (Port 4000). Mengelola layout & routing utama.</li>
                <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">auth-mfe</code> - Domain Autentikasi (Port 4001). Pre-loaded remote module.</li>
                <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">business-mfe</code> - Modul contoh bisnis (Port 4002).</li>
                <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">docs-mfe</code> - Modul dokumentasi ini (Port 4003).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Pustaka Utama (Shared Libs)</h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 list-disc ml-4">
                <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">ui-kit</code> - Komponen standar UI (Tailwind v4 / Radix UI).</li>
                <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shared-types</code> - Contract TypeScript dan state login (Zustand).</li>
                <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shared-api</code> - Setup Axios dan Endpoint (dilindungi interceptor).</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">⚡</span>
              Development & Menjalankan Aplikasi
            </CardTitle>
            <CardDescription>Perintah CLI untuk pengembangan lokal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <CodeBlock 
              language="bash"
              codeString={`# Jalankan semua modul secara otomatis sekaligus
pnpm nx run-many --target=serve --all --parallel

# Atau jalankan aplikasi secara spesifik
pnpm nx run-many --target=serve --projects=shell,auth-mfe --parallel`}
            >
              <span className="text-neutral-500"># Jalankan semua modul secara otomatis sekaligus</span><br/>
              <span className="text-primary-400">pnpm</span> nx run-many --target=serve --all --parallel<br/><br/>
              <span className="text-neutral-500"># Atau jalankan aplikasi secara spesifik</span><br/>
              <span className="text-primary-400">pnpm</span> nx run-many --target=serve --projects=shell,auth-mfe --parallel
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg text-emerald-600 dark:text-emerald-400">🚀</span>
            Cara Membuat & Mendaftarkan MFE Baru
          </CardTitle>
          <CardDescription>Otomatisasi MFE Setup tanpa copy-paste manual.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">1. Jalankan Generator Nx CLI</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Perintah ini akan men-generate folder React+Vite, Module Federation, Tailwind v4, linting, dan mendaftarkannya otomatis ke <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shell/public/remotes.json</code>.</p>
            <CodeBlock 
              language="bash" 
              codeString="pnpm nx g @nashta/tools:mfe <nama-mfe> --port=<port>"
            >
              <span className="text-primary-400">pnpm</span> nx g @nashta/tools:mfe &lt;nama-mfe&gt; --port=&lt;port&gt;
            </CodeBlock>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">2. Mendaftarkan Route di `router.tsx` Shell</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Meski environment sudah teregister, Anda harus tetap memasang komponen Remote tersebut pada routing utama aplikasi Shell menggunakan <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">React.lazy</code>.</p>
            <CodeBlock 
              language="tsx" 
              codeString={`// Buka apps/shell/src/router.tsx
import { lazy } from 'react';
import { RemoteLoader } from './components/RemoteLoader';

// MFE Import ("<namaMfeTanpaDash>/App")
const RemoteBaru = lazy(() => import('namamfe/App'));

// ... Daftarkan di dalam daftar sub-routing <Layout />
<Route path="nama-url/*" element={<RemoteLoader><RemoteBaru /></RemoteLoader>} />`}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg text-amber-600 dark:text-amber-400">🔑</span>
              Manajemen Token Login (Zustand)
            </CardTitle>
            <CardDescription>Handling Token & Status Autentikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Status <strong>login</strong> dan <strong>access token</strong> dikelola tunggal (Singleton) menggunakan <i>Zustand Store</i> yang terletak di <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">@nashta/shared-types</code>.
            </p>
            <CodeBlock 
              language="typescript" 
              codeString={`import { useAuthStore } from '@nashta/shared-types';

// Untuk membaca token (di dalam React Component)
const { accessToken, isAuthenticated, logout } = useAuthStore();`}
            />
            <ul className="list-disc ml-4 space-y-1 mt-2">
              <li><strong>State Persistence:</strong> Token login saat ini dipertahankan menggunakan <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">sessionStorage</code> (via Zustand Persist) agar tidak hilang saat pengguna me-<i>refresh</i> halaman.</li>
              <li><strong>Best Practice Produksi:</strong> Pada arsitektur aslinya, sangat disarankan menggunakan skema <i>Refresh Token</i> (disimpan di <i>HttpOnly Cookie</i>) bersamaan dengan endpoint <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">/refresh</code> daripada <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">sessionStorage</code> murni demi pencegahan pencurian token.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg text-teal-600 dark:text-teal-400">🔗</span>
              Axios Interceptors (API Call)
            </CardTitle>
            <CardDescription>Handling Error 401 & Auto-inject Token</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Setiap panggilan API ke backend wajib menggunakan <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">apiClient</code> dari <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">@nashta/shared-api</code>. Jangan buat Axios murni tanpa interceptor.
            </p>
            <CodeBlock 
              language="typescript" 
              codeString={`import { apiClient } from '@nashta/shared-api';

const fetchProfile = async () => {
  // Authorization header: Bearer <token>
  // otomatis disisipkan oleh apiClient!
  const res = await apiClient.get('/api/users/me');
};`}
            />
            <p>
              <strong>Bagaimana jika Token kedaluwarsa?</strong> Jika request ditolak Backend (Error 401), Interceptor akan secara <i>background</i> memanggil Endpoint Refresh Token, menyimpannya di Zustand, lalu me-replay ulang Request API yang gagal tersebut tanpa sepengetahuan <i>User</i>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-400">🔄</span>
              Dynamic Remotes
            </CardTitle>
            <CardDescription>Module federation berbasis Konfigurasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Alih-alih menuliskan URL (contoh localhost:4002) secara permanen di kode konfigurasi (<i>hardcoded</i>), 
              Aplikasi Shell membaca daftar MFE dari file <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">remotes.json</code> pada saat <i>Runtime</i>.
            </p>
            <p>
              Cara kerja ini sangat menguntungkan di server Production karena tim infrastruktur bebas me-repoint URL (misal ke versi MFE lama saat ada error) tanpa pernah perlu melakukan Build / Deployment ulang terhadap Aplikasi Shell (Host).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-rose-100 dark:bg-rose-900 rounded-lg text-rose-600 dark:text-rose-400">⚖️</span>
              Performance Budget
            </CardTitle>
            <CardDescription>Ambang batas maksimum Ukuran Aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Setiap kali Anda membuat Pull Request, Pipeline Otomatis akan memblokir perubahan apabila ukuran JS/CSS dari MFE baru melebihi batas performa (dihitung menggunakan standar rasio algoritma Brotli).
            </p>
            <ul className="list-disc ml-4 space-y-1">
              <li><strong>Batas Maksimal JS:</strong> 250 KB</li>
              <li><strong>Batas Maksimal CSS:</strong> 50 KB</li>
            </ul>
            <p>
              Jalankan <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">pnpm budget:check</code> di lokal atau periksa ringkasan grafik bundel 
              melalui <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">stats.html</code> yang selalu dihasilkan setiap men-<em>build</em> project (di `dist/apps/*/stats.html`).
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg text-indigo-600 dark:text-indigo-400">🧭</span>
            Menambahkan Menu di Sidebar (Aplikasi Shell)
          </CardTitle>
          <CardDescription>Cara agar MFE baru Anda muncul di menu navigasi utama</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            Setelah MFE terdaftar di <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">router.tsx</code>, langkah selanjutnya adalah menambahkan tombol navigasi di Sidebar. 
            Semua layout utama dan Sidebar diatur secara eksklusif oleh <strong>Aplikasi Shell</strong>. 
          </p>
          <p>
            <strong>Aturan Penting:</strong> Gunakan komponen <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">&lt;NavLink&gt;</code> dari <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">react-router</code>! Jangan pernah menggunakan tag <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">&lt;a href="..."&gt;</code> biasa, karena akan memicu <i>full page reload</i> dan menghilangkan state login pengguna di Zustand.
          </p>
          <CodeBlock 
            language="tsx" 
            codeString={`// Buka apps/shell/src/components/Layout.tsx
import { NavLink } from 'react-router';

// ... di bagian render sidebar:
<NavLink 
  to="/nama-url" 
  className={({ isActive }) => 
    isActive ? "bg-primary-900 text-white" : "text-neutral-400 hover:text-white"
  }
>
  <IconComponent className="w-5 h-5" />
  <span>Nama Menu Baru</span>
</NavLink>`}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-fuchsia-100 dark:bg-fuchsia-900 rounded-lg text-fuchsia-600 dark:text-fuchsia-400">🎨</span>
              Menggunakan Shared UI Kit
            </CardTitle>
            <CardDescription>Konsistensi Desain antar MFE</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Jangan membuat tombol atau input sendiri dari awal! Gunakan komponen yang sudah distandarisasi dan disediakan oleh <i>Design System</i> kita untuk memastikan konsistensi tampilan antar MFE.
            </p>
            <CodeBlock 
              language="tsx" 
              codeString={`import { Button, Input, Card } from '@nashta/ui-kit';

export function FormContoh() {
  return (
    <Card className="p-4">
      <Input placeholder="Ketik sesuatu..." />
      <Button variant="outline">Simpan</Button>
    </Card>
  );
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-sky-100 dark:bg-sky-900 rounded-lg text-sky-600 dark:text-sky-400">💨</span>
              Tailwind CSS v4
            </CardTitle>
            <CardDescription>Sistem Styling Bawaan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Semua MFE telah diatur untuk menggunakan Tailwind v4. Sistem warna (seperti <i>primary</i>, <i>neutral</i>, dll) sudah diatur secara terpusat di dalam library <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">ui-kit</code>.
            </p>
            <p>
              Anda bisa langsung menggunakan *class-class* Tailwind di dalam file komponen Anda tanpa perlu repot mengkonfigurasi file konfigurasi Tailwind secara manual di tiap MFE.
            </p>
            <CodeBlock 
              language="tsx" 
              codeString={`// Gunakan warna brand langsung
<div className="text-primary-600 bg-primary-50">
  Teks Brand!
</div>`}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg text-pink-600 dark:text-pink-400">🖌️</span>
            Mengubah Tema dan Warna (Theme Customization)
          </CardTitle>
          <CardDescription>Cara mengganti palet warna utama di seluruh MFE</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            Platform ini menggunakan Tailwind CSS v4, di mana konfigurasi tema tidak lagi menggunakan file <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">tailwind.config.js</code> klasik, melainkan menggunakan variabel CSS <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">@theme</code> langsung di file utama CSS.
          </p>
          <p>
            Untuk mengubah warna utama (Primary), teks, atau pengaturan Global lainnya, Anda hanya perlu mengubah satu file terpusat yang terletak di dalam <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">libs/ui-kit/src/index.css</code>. Perubahan di file ini otomatis akan teraplikasikan ke semua aplikasi Shell dan MFE.
          </p>
          <CodeBlock 
            language="css" 
            codeString={`/* Buka libs/ui-kit/src/index.css */
@theme {
  /* Ganti kode HEX di bawah ini sesuai warna perusahaan / desain baru */
  --color-primary-50: #f0fdf4;
  --color-primary-100: #dcfce7;
  --color-primary-500: #22c55e;
  --color-primary-600: #16a34a;
  --color-primary-900: #14532d;
}`}
          />
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════
          SECTION: Panduan Lanjutan (Advanced Guides)
          ═══════════════════════════════════════════════════ */}
      <div className="mt-12 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          📚 Panduan Lanjutan
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-400">
          Topik teknis mendalam untuk developer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Custom Event Contract */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-violet-100 dark:bg-violet-900 rounded-lg text-violet-600 dark:text-violet-400">📡</span>
              Custom Event Contract
            </CardTitle>
            <CardDescription>Komunikasi antar MFE via Browser Events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Semua event yang di-dispatch antar-MFE <strong>wajib</strong> menggunakan prefix namespace dan
              didefinisikan di <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">shared-types</code>.
              Jangan pernah buat event string secara manual.
            </p>
            <CodeBlock
              language="typescript"
              codeString={`import { MFE_EVENTS, dispatchMfeEvent } from '@nashta/shared-types';

// Dispatch event dari auth-mfe setelah login berhasil
dispatchMfeEvent(MFE_EVENTS.AUTH.USER_LOGGED_IN, {
  userId: user.id,
  accessToken: token,
});

// Listen event di Shell
window.addEventListener(
  MFE_EVENTS.AUTH.USER_LOGGED_IN,
  (e: CustomEvent) => {
    const { userId, accessToken } = e.detail;
    useAuthStore.getState().setAuth(accessToken, user);
  }
);`}
            />
            <p>
              <strong>Event yang tersedia:</strong>
            </p>
            <ul className="list-disc ml-4 space-y-1">
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">AUTH.USER_LOGGED_IN</code> — Setelah login berhasil</li>
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">AUTH.USER_LOGGED_OUT</code> — Setelah logout</li>
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">AUTH.TOKEN_REFRESHED</code> — Setelah token di-refresh</li>
            </ul>
          </CardContent>
        </Card>

        {/* Error Boundary & Resilience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-red-100 dark:bg-red-900 rounded-lg text-red-600 dark:text-red-400">🛡️</span>
              Error Boundary & Resilience
            </CardTitle>
            <CardDescription>Handle remote crash tanpa merusak Shell</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Setiap remote import di Shell <strong>wajib</strong> dibungkus <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">React.Suspense</code> dan{' '}
              <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">ErrorBoundary</code>. Jika satu modul crash, aplikasi utama tidak boleh mati.
            </p>
            <CodeBlock
              language="tsx"
              codeString={`import { RemoteLoader } from './components/RemoteLoader';
import { lazy } from 'react';

const AuthApp = lazy(() => import('authMfe/App'));

// RemoteLoader = Suspense + ErrorBoundary wrapper
<Route path="/auth/*" element={
  <RemoteLoader>
    <AuthApp />
  </RemoteLoader>
} />`}
            />
            <p><strong>Fallback UI standar:</strong></p>
            <ul className="list-disc ml-4 space-y-1">
              <li><strong>Loading:</strong> Skeleton shimmer (otomatis via Suspense)</li>
              <li><strong>Error/Crash:</strong> Card error + tombol Retry</li>
              <li><strong>Network timeout:</strong> Pesan offline + tombol Refresh</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Auth Flow E2E */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg text-orange-600 dark:text-orange-400">🔐</span>
            Auth Flow End-to-End
          </CardTitle>
          <CardDescription>Alur lengkap login, token management, dan logout</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            Berikut urutan lengkap autentikasi dari form login hingga logout:
          </p>
          <ol className="list-decimal ml-4 space-y-1">
            <li>User isi form di <strong>auth-mfe</strong></li>
            <li>auth-mfe <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">POST /api/login</code> → server set HttpOnly cookie (refresh_token)</li>
            <li>Server response berisi <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">{`{ access_token, user }`}</code> di body</li>
            <li>auth-mfe dispatch event <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">USER_LOGGED_IN</code></li>
            <li>Shell mendengar event, simpan access_token di Zustand (memory only)</li>
            <li>Shell redirect ke <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">/dashboard</code></li>
            <li>Token expired? Shell hit <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">POST /api/refresh</code> → cookie dikirim otomatis</li>
            <li>Logout: Shell clear Zustand + hit <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">POST /api/logout</code></li>
          </ol>

          <p><strong>⚠️ Aturan Keamanan Token:</strong></p>
          <ul className="list-disc ml-4 space-y-1">
            <li><strong>Access Token:</strong> Hanya di memory (Zustand) — TIDAK di localStorage/cookie</li>
            <li><strong>Refresh Token:</strong> HttpOnly Cookie (server-set) — tidak bisa diakses JS</li>
            <li><strong>User profile:</strong> React Query cache — auto-invalidate</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-lime-100 dark:bg-lime-900 rounded-lg text-lime-600 dark:text-lime-400">⚙️</span>
              Environment Variables
            </CardTitle>
            <CardDescription>Konfigurasi .env per environment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Setiap app memiliki file <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">.env</code> per environment.
              Semua variabel <strong>wajib</strong> diawali <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">VITE_</code> agar bisa diakses di runtime.
            </p>
            <CodeBlock
              language="bash"
              codeString={`# apps/shell/.env.development
VITE_AUTH_MFE_URL=http://localhost:4001
VITE_BUSINESS_MFE_URL=http://localhost:4002
VITE_API_BASE_URL=http://localhost:4003

# apps/shell/.env.production
VITE_AUTH_MFE_URL=https://auth.antygraviti.com
VITE_BUSINESS_MFE_URL=https://business.antygraviti.com
VITE_API_BASE_URL=https://api.antygraviti.com`}
            />
          </CardContent>
        </Card>

        {/* Dark Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-400">🌙</span>
              Dark Mode
            </CardTitle>
            <CardDescription>Strategi toggle tema gelap/terang</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Platform menggunakan <strong>class-based dark mode</strong>. Toggle menambah/menghapus class <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">.dark</code> pada <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">&lt;html&gt;</code>.
            </p>
            <p><strong>Bagaimana CSS berubah:</strong></p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Setiap MFE punya <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">theme.css</code> dengan CSS overrides di selector <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">.dark</code></li>
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">.bg-white</code> → <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">#171717</code></li>
              <li><code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">.text-neutral-900</code> → <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">#f5f5f5</code></li>
            </ul>
            <p>
              User preference tersimpan di <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">localStorage</code>.
              Prioritas: User preference {'>'} System preference {'>'} Default (light).
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Git Workflow */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400">📋</span>
              Git Workflow
            </CardTitle>
            <CardDescription>Commit convention, branch naming, PR template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p><strong>Commit Convention (Conventional Commits):</strong></p>
            <CodeBlock
              language="bash"
              codeString={`feat(auth-mfe): add forgot password flow
fix(shell): resolve token refresh race condition
chore(ui-kit): update Button component variants
docs(shared-api): add endpoint registry documentation`}
            />
            <p><strong>Branch Naming:</strong></p>
            <CodeBlock
              language="bash"
              codeString={`feat/AUTH-123-forgot-password
fix/SHELL-456-token-race-condition
chore/UI-789-update-button-variants`}
            />
            <p>Format: <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">{`{type}/{TICKET-ID}-{short-description}`}</code></p>
          </CardContent>
        </Card>

        {/* API Error Handling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-red-100 dark:bg-red-900 rounded-lg text-red-600 dark:text-red-400">⚠️</span>
              API Error Handling
            </CardTitle>
            <CardDescription>Error normalization & format standar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Semua API error di-normalize ke format <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">AppError</code> standar:
            </p>
            <CodeBlock
              language="typescript"
              codeString={`// Sudah didefinisikan di @nashta/shared-types
interface AppError {
  code: string;        // e.g., 'AUTH_INVALID_CREDENTIALS'
  message: string;     // Human-readable message
  statusCode: number;  // HTTP status
  details?: unknown;   // Optional validation errors
}

// Cara handling di komponen:
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

      {/* Security Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg text-yellow-600 dark:text-yellow-400">🔒</span>
            Security Best Practices
          </CardTitle>
          <CardDescription>Standar keamanan wajib untuk semua MFE</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">✅ WAJIB</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Access token HANYA di memory (Zustand)</li>
                <li>Gunakan <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">apiClient</code> dari shared-api (bukan Axios langsung)</li>
                <li>Semua form validasi pakai <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">zod</code> schema</li>
                <li>Internal packages pakai scope <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">@nashta/</code></li>
                <li>Jalankan <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">pnpm audit</code> — 0 High/Critical</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">❌ DILARANG</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Simpan token di localStorage / cookie</li>
                <li>Buat Axios instance sendiri tanpa interceptor</li>
                <li>Gunakan <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">dangerouslySetInnerHTML</code></li>
                <li>Hardcode URL remote di konfigurasi</li>
                <li>Redirect ke URL tanpa validasi allowlist</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Dynamic Menu dari Backend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg text-cyan-600 dark:text-cyan-400">📋</span>
            Dynamic Menu dari Backend
          </CardTitle>
          <CardDescription>Cara fetch sidebar menu dari API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Endpoint</p>
            <CodeBlock language="bash" codeString={`GET /api/v1/menus
Authorization: Bearer <access_token>`} />
          </div>
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Response JSON</p>
            <CodeBlock language="json" codeString={`{
  "groups": [
    {
      "title": "Menu",
      "items": [
        {
          "id": "beranda",
          "label": "Beranda",
          "icon": "LayoutDashboard",
          "path": "/"
        },
        {
          "id": "cs",
          "label": "Customer Service",
          "icon": "Users",
          "path": "/cs",
          "defaultOpen": true,
          "children": [
            { "id": "cs-reg", "label": "Pendaftaran", "icon": "FileText", "path": "/pendaftaran" }
          ]
        },
        {
          "id": "paket",
          "label": "Manajemen Paket",
          "icon": "Package",
          "path": "/paket",
          "children": [
            { "id": "p1", "label": "Kelola Paket", "icon": "Package", "path": "/kelola-paket" },
            { "id": "p2", "label": "Aktifasi Paket", "icon": "Package", "path": "/aktifasi-paket" }
          ]
        }
      ]
    },
    {
      "title": "Lainnya",
      "items": [
        { "id": "settings", "label": "Pengaturan", "icon": "Settings", "path": "/pengaturan" }
      ]
    }
  ]
}`} />
          </div>
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">TypeScript Types</p>
            <CodeBlock language="tsx" codeString={`// libs/shared-types/src/menu-store.ts
interface MenuItem {
  id: string;
  label: string;
  icon: string;        // Nama icon Lucide: "LayoutDashboard", "Package", dll
  path: string;
  children?: MenuItem[];
  badge?: string;      // Optional: "NEW" atau "3"
  defaultOpen?: boolean;
}

interface MenuGroup {
  title: string;       // Section header: "MENU", "LAINNYA"
  items: MenuItem[];
}

// Zustand store
const useMenuStore = create<MenuState>((set) => ({
  groups: [],
  isLoading: true,
  error: null,
  setMenus: (groups) => set({ groups, isLoading: false }),
  setError: (error) => set({ error, isLoading: false }),
}));`} />
          </div>
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Icon Mapping</p>
            <p className="mb-2">Backend mengirim nama icon sebagai string. Shell meng-resolve ke komponen Lucide:</p>
            <CodeBlock language="tsx" codeString={`// apps/shell/src/utils/icon-map.ts
import { LayoutDashboard, Package, Users, Settings, ... } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, Package, Users, Settings, ...
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Package; // fallback
}`} />
          </div>
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Implementasi di Layout.tsx</p>
            <CodeBlock language="tsx" codeString={`// apps/shell/src/components/Layout.tsx
const menuGroups = useMenuStore((s) => s.groups) ?? [];

useEffect(() => {
  // Fetch dari BE, fallback ke mock data
  if (menuGroups.length === 0) {
    apiClient.get('/api/v1/menus')
      .then(res => useMenuStore.getState().setMenus(res.data.groups))
      .catch(() => useMenuStore.getState().setMenus(MOCK_MENUS));
  }
}, []);

// Render sidebar:
{menuGroups.map(group => (
  <div key={group.title}>
    <div className="section-title">{group.title}</div>
    {group.items.map(item =>
      item.children
        ? <CollapsibleSection label={item.label} icon={getIcon(item.icon)}>
            {item.children.map(child => <NavLink to={child.path}>{child.label}</NavLink>)}
          </CollapsibleSection>
        : <NavLink to={item.path}><DynamicIcon name={item.icon} />{item.label}</NavLink>
    )}
  </div>
))}`} />
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">💡 Strategi Fallback</p>
            <p className="text-blue-700 dark:text-blue-400">
              Selalu sediakan <code className="text-xs bg-blue-100 dark:bg-blue-900/50 px-1 rounded">MOCK_MENUS</code> sebagai fallback.
              Jika API gagal, user tetap bisa navigasi. Menu mock disimpan di <code className="text-xs bg-blue-100 dark:bg-blue-900/50 px-1 rounded">apps/shell/src/data/mock-menus.ts</code>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
