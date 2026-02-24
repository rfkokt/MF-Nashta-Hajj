import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@nashta/ui-kit';
import { CodeBlock } from '../components/CodeBlock';
import { DocsStep } from '../components/DocsStep';

export function DocsMembuatMfeSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
            3
          </span>
          Membuat MFE Baru (Step-by-Step)
        </CardTitle>
        <CardDescription>5 langkah membuat Micro-Frontend baru dari nol</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <DocsStep title="Step 1: Generate via Nx CLI" color="emerald">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Perintah ini membuat folder React+Vite+Module Federation+Tailwind v4 secara otomatis dan
            mendaftarkannya ke{' '}
            <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">
              shell/public/remotes.json
            </code>
            .
          </p>
          <CodeBlock
            language="bash"
            codeString={`# Format: pnpm nx g @nashta/tools:mfe <nama-mfe> --port=<port>
pnpm nx g @nashta/tools:mfe reporting-mfe --port=4004`}
          />
        </DocsStep>

        <DocsStep title="Step 2: Daftarkan Route di Shell" color="emerald">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Tambah lazy import dan route di{' '}
            <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">
              apps/shell/src/router.tsx
            </code>
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
        </DocsStep>

        <DocsStep title="Step 3: Tambah Menu di Sidebar" color="emerald">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Tambah entry di{' '}
            <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">
              apps/shell/src/data/mock-menus.ts
            </code>{' '}
            untuk sidebar navigation.
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
              Gunakan{' '}
              <code className="text-xs bg-amber-100 dark:bg-amber-900/50 px-1 rounded">
                NavLink
              </code>{' '}
              dari react-router, BUKAN{' '}
              <code className="text-xs bg-amber-100 dark:bg-amber-900/50 px-1 rounded">
                &lt;a href&gt;
              </code>
              ! Tag &lt;a&gt; akan trigger full page reload dan kehilangan state login.
            </p>
          </div>
        </DocsStep>

        <DocsStep title="Step 4: Import Shared Libraries" color="emerald">
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
        </DocsStep>

        <DocsStep title="Step 5: Jalankan & Verifikasi" color="emerald">
          <CodeBlock
            language="bash"
            codeString={`# Jalankan semua
pnpm dev

# Atau hanya shell + MFE baru
pnpm nx run-many --target=serve --projects=shell,reporting-mfe --parallel

# Buka http://localhost:4000/reporting`}
          />
        </DocsStep>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
          <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
            ✅ Checklist MFE Baru
          </h4>
          <ul className="space-y-1.5 text-sm text-emerald-700 dark:text-emerald-400">
            <li>
              ☐ Generate folder:{' '}
              <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">
                pnpm nx g @nashta/tools:mfe nama-mfe --port=PORT
              </code>
            </li>
            <li>
              ☐ Route di{' '}
              <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">
                router.tsx
              </code>{' '}
              Shell
            </li>
            <li>
              ☐ Menu entry di{' '}
              <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">
                mock-menus.ts
              </code>
            </li>
            <li>
              ☐ Icon terdaftar di{' '}
              <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">
                icon-map.ts
              </code>
            </li>
            <li>
              ☐ Pakai{' '}
              <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">
                @nashta/ui-kit
              </code>
              ,{' '}
              <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">
                @nashta/shared-api
              </code>
              ,{' '}
              <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">
                @nashta/shared-types
              </code>
            </li>
            <li>
              ☐ Test di browser:{' '}
              <code className="text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">
                http://localhost:4000/nama-url
              </code>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
