import React from 'react';
import { Card, CardContent, Badge } from '@nashta/ui-kit';
import { discoveredComponents } from '../../utils/component-discovery';
import { SectionHeader, CodeBlock } from './shared';

export function OverviewSection({ sectionMap }: { sectionMap: Record<string, React.FC> }) {
  return (
    <>
      <SectionHeader
        title="🎨 Shared UI Kit"
        description="Galeri komponen @nashta/ui-kit — pilih komponen dari sidebar untuk melihat preview."
      />

      {/* ── Quick Start: Cara Install ── */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 mb-6">
        <h3 className="text-base font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
          🚀 Cara Install Komponen
        </h3>
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          Semua komponen tersedia di{' '}
          <code className="text-xs bg-emerald-100 dark:bg-emerald-800 px-1 rounded">
            @nashta/ui-kit
          </code>
          . Tinggal import dan pakai!
        </p>
      </div>

      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        1. Import di MFE manapun
      </h3>
      <CodeBlock>{`import { Button, Input, Card, Modal, Badge } from '@nashta/ui-kit';`}</CodeBlock>

      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2 mt-6">
        2. Tambah komponen baru via Shadcn CLI
      </h3>
      <CodeBlock>{`# Install satu komponen
pnpm add:ui accordion

# Install beberapa sekaligus
pnpm add:ui accordion tabs dialog dropdown-menu`}</CodeBlock>

      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2 mt-6">
        3. Atau buat manual
      </h3>
      <CodeBlock>{`// 1. Buat file di libs/ui-kit/src/components/NamaKomponen.tsx
// 2. Export dari libs/ui-kit/src/index.ts:
export { NamaKomponen } from './components/NamaKomponen';
export type { NamaKomponenProps } from './components/NamaKomponen';

// 3. Selesai! Komponen otomatis muncul di sidebar docs.`}</CodeBlock>

      {/* ── Component Grid ── */}
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4 mt-8">
        📦 Daftar Komponen ({discoveredComponents.length})
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {discoveredComponents.map((c) => {
          const hasDoc = c.slug in sectionMap;
          return (
            <Card key={c.name}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{c.name}</h3>
                  {hasDoc ? (
                    <Badge variant="success">✓ Documented</Badge>
                  ) : (
                    <Badge variant="warning">📝 Undocumented</Badge>
                  )}
                </div>
                <p className="text-xs text-neutral-500">
                  {hasDoc ? 'Klik dari sidebar untuk melihat docs' : 'Belum ada dokumentasi'}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Rules ── */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mt-8">
        <h3 className="text-base font-semibold text-amber-800 dark:text-amber-300 mb-2">
          ⚠️ Rules
        </h3>
        <ul className="space-y-1.5 list-disc list-inside text-sm text-amber-700 dark:text-amber-400">
          <li>
            Selalu pake <strong>shadcn CLI</strong> kalau komponen tersedia di registry
          </li>
          <li>
            Wajib <strong>export dari index.ts</strong>
          </li>
          <li>
            Wajib punya <strong>TypeScript interface</strong> (Props)
          </li>
          <li>
            Gunakan <strong>cn()</strong> untuk merge Tailwind classes
          </li>
          <li>
            Selalu support <strong>dark mode</strong>
          </li>
          <li>
            Jangan import <code className="text-xs">@nashta/shared-types</code> di ui-kit (circular)
          </li>
        </ul>
      </div>
    </>
  );
}
