import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@my-saas/ui-kit';
import { CodeBlock } from './components/CodeBlock';

export function App() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          Buku Panduan Platform MFE
        </h1>
        <p className="text-lg text-neutral-500">
          Dokumentasi dan Standar Arsitektur Micro-Frontend Nashta Hajj
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary-100 bg-primary-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-primary-100 rounded-lg text-primary-600">🏗️</span>
              Struktur Proyek
            </CardTitle>
            <CardDescription>Bagaimana monorepo ini diorganisir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Aplikasi (Micro-Frontends)</h3>
              <ul className="space-y-2 text-sm text-neutral-600 list-disc ml-4">
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">shell</code> - Aplikasi Induk (Port 4000). Mengelola layout & routing utama.</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">auth-mfe</code> - Domain Autentikasi (Port 4001). Pre-loaded remote module.</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">business-mfe</code> - Modul contoh bisnis (Port 4002).</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">docs-mfe</code> - Modul dokumentasi ini (Port 4003).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Pustaka Utama (Shared Libs)</h3>
              <ul className="space-y-2 text-sm text-neutral-600 list-disc ml-4">
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">ui-kit</code> - Komponen standar UI (Tailwind v4 / Radix UI).</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">shared-types</code> - Contract TypeScript dan state login (Zustand).</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">shared-api</code> - Setup Axios dan Endpoint (dilindungi interceptor).</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-blue-100 rounded-lg text-blue-600">⚡</span>
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
            <span className="p-2 bg-emerald-100 rounded-lg text-emerald-600">🚀</span>
            Cara Membuat & Mendaftarkan MFE Baru
          </CardTitle>
          <CardDescription>Otomatisasi MFE Setup tanpa copy-paste manual.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-900">1. Jalankan Generator Nx CLI</h3>
            <p className="text-sm text-neutral-600">Perintah ini akan men-generate folder React+Vite, Module Federation, Tailwind v4, linting, dan mendaftarkannya otomatis ke <code className="text-primary-700 bg-primary-50 px-1 rounded">shell/public/remotes.json</code>.</p>
            <CodeBlock 
              language="bash" 
              codeString="pnpm nx g @my-saas/tools:mfe <nama-mfe> --port=<port>"
            >
              <span className="text-primary-400">pnpm</span> nx g @my-saas/tools:mfe &lt;nama-mfe&gt; --port=&lt;port&gt;
            </CodeBlock>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-900">2. Mendaftarkan Route di `router.tsx` Shell</h3>
            <p className="text-sm text-neutral-600">Meski environment sudah teregister, Anda harus tetap memasang komponen Remote tersebut pada routing utama aplikasi Shell menggunakan <code className="text-primary-700 bg-primary-50 px-1 rounded">React.lazy</code>.</p>
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
              <span className="p-2 bg-amber-100 rounded-lg text-amber-600">🔑</span>
              Manajemen Token Login (Zustand)
            </CardTitle>
            <CardDescription>Handling Token & Status Autentikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600">
            <p>
              Status <strong>login</strong> dan <strong>access token</strong> dikelola tunggal (Singleton) menggunakan <i>Zustand Store</i> yang terletak di <code className="text-primary-700 bg-primary-50 px-1 rounded">@my-saas/shared-types</code>.
            </p>
            <CodeBlock 
              language="typescript" 
              codeString={`import { useAuthStore } from '@my-saas/shared-types';

// Untuk membaca token (di dalam React Component)
const { accessToken, isAuthenticated, logout } = useAuthStore();`}
            />
            <ul className="list-disc ml-4 space-y-1 mt-2">
              <li><strong>Access Token:</strong> Hanya disimpan di dalam Memori / Variable (BUKAN di Local Storage) agar tercegah dari pencurian via serangan XSS.</li>
              <li><strong>Refresh Token:</strong> Disimpan dengan aman oleh Server via <i>HttpOnly Cookie</i>. Otomatis dipakai saat request token baru.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-teal-100 rounded-lg text-teal-600">🔗</span>
              Axios Interceptors (API Call)
            </CardTitle>
            <CardDescription>Handling Error 401 & Auto-inject Token</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600">
            <p>
              Setiap panggilan API ke backend wajib menggunakan <code className="text-primary-700 bg-primary-50 px-1 rounded">apiClient</code> dari <code className="text-primary-700 bg-primary-50 px-1 rounded">@my-saas/shared-api</code>. Jangan buat Axios murni tanpa interceptor.
            </p>
            <CodeBlock 
              language="typescript" 
              codeString={`import { apiClient } from '@my-saas/shared-api';

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
              <span className="p-2 bg-purple-100 rounded-lg text-purple-600">🔄</span>
              Dynamic Remotes
            </CardTitle>
            <CardDescription>Module federation berbasis Konfigurasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600">
            <p>
              Alih-alih menuliskan URL (contoh localhost:4002) secara permanen di kode konfigurasi (<i>hardcoded</i>), 
              Aplikasi Shell membaca daftar MFE dari file <code className="text-primary-700 bg-primary-50 px-1 rounded">remotes.json</code> pada saat <i>Runtime</i>.
            </p>
            <p>
              Cara kerja ini sangat menguntungkan di server Production karena tim infrastruktur bebas me-repoint URL (misal ke versi MFE lama saat ada error) tanpa pernah perlu melakukan Build / Deployment ulang terhadap Aplikasi Shell (Host).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-rose-100 rounded-lg text-rose-600">⚖️</span>
              Performance Budget
            </CardTitle>
            <CardDescription>Ambang batas maksimum Ukuran Aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600">
            <p>
              Setiap kali Anda membuat Pull Request, Pipeline Otomatis akan memblokir perubahan apabila ukuran JS/CSS dari MFE baru melebihi batas performa (dihitung menggunakan standar rasio algoritma Brotli).
            </p>
            <ul className="list-disc ml-4 space-y-1">
              <li><strong>Batas Maksimal JS:</strong> 250 KB</li>
              <li><strong>Batas Maksimal CSS:</strong> 50 KB</li>
            </ul>
            <p>
              Jalankan <code className="text-primary-700 bg-primary-50 px-1 rounded">pnpm budget:check</code> di lokal atau periksa ringkasan grafik bundel 
              melalui <code className="text-primary-700 bg-primary-50 px-1 rounded">stats.html</code> yang selalu dihasilkan setiap men-<em>build</em> project (di `dist/apps/*/stats.html`).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
