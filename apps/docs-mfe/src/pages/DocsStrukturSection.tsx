import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@nashta/ui-kit';
import { CodeBlock } from '../components/CodeBlock';

export function DocsStrukturSection() {
  return (
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
  );
}
