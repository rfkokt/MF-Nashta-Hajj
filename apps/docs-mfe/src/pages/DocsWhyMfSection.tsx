import { Card, CardContent } from '@nashta/ui-kit';
import { CodeBlock } from '../components/CodeBlock';
import {
  SectionTitle,
  FeatureGrid,
  ComparisonTable,
  InfoBox,
  KeyValueCard,
} from '../components/docs-primitives';
import type { ComparisonColumn, ComparisonRow } from '../components/docs-primitives';

/* ═══════════════════════════════════════════════
   Section: Kenapa Module Federation?
   ═══════════════════════════════════════════════ */

// ── Data: MF approach comparison ──
const approachColumns: ComparisonColumn[] = [
  { header: 'Module Federation', highlight: true },
  { header: 'iframe' },
  { header: 'Single SPA' },
  { header: 'Import Map / ESM' },
];

const approachRows: ComparisonRow[] = [
  {
    criteria: 'Shared Dependencies',
    values: [
      '✅ Singleton, deduplicated',
      '❌ Duplikat di setiap iframe',
      '⚠️ Butuh konfigurasi manual',
      '⚠️ Bertanggung jawab sendiri',
    ],
  },
  {
    criteria: 'State Sharing',
    values: [
      '✅ Zustand store langsung',
      '❌ Hanya via postMessage',
      '⚠️ Custom event bus',
      '⚠️ Custom event bus',
    ],
  },
  {
    criteria: 'Build Tool',
    values: ['✅ Vite (fast, native ESM)', '✅ Bebas', '⚠️ Webpack dominan', '✅ Bebas'],
  },
  {
    criteria: 'CSS Isolation',
    values: [
      '✅ Tailwind shared config',
      '✅ Full isolation',
      '⚠️ Manual namespace',
      '⚠️ Manual namespace',
    ],
  },
  {
    criteria: 'Routing',
    values: ['✅ React Router shared', '❌ URL sync kompleks', '✅ Built-in', '⚠️ Manual'],
  },
  {
    criteria: 'TypeScript Support',
    values: ['✅ Full, shared types', '❌ Tidak bisa share types', '⚠️ Partial', '⚠️ Partial'],
  },
  {
    criteria: 'Performa Runtime',
    values: ['✅ Lazy load remotes', '❌ Berat, duplikat runtime', '✅ Lazy', '✅ Native lazy'],
  },
  {
    criteria: 'DX (Developer Experience)',
    values: ['✅ Hot reload, manifest', '❌ Debug sulit', '⚠️ Setup kompleks', '⚠️ Setup manual'],
  },
  {
    criteria: 'Error Isolation',
    values: [
      '✅ Error Boundary per remote',
      '✅ Full sandbox',
      '✅ App-level boundary',
      '⚠️ Manual',
    ],
  },
  {
    criteria: 'Deploy Independen',
    values: ['✅ Manifest-based discovery', '✅ URL-based', '✅ Import map', '✅ Import map'],
  },
];

// ── Data: MF implementation comparison ──
const implColumns: ComparisonColumn[] = [
  { header: '@module-federation/vite', highlight: true },
  { header: 'Webpack 5 MF' },
  { header: 'Rspack MF' },
  { header: 'Turbopack' },
];

const implRows: ComparisonRow[] = [
  {
    criteria: 'Bundler',
    values: [
      '✅ Vite (native ESM, ~10x faster dev)',
      '⚠️ Webpack (slower, legacy)',
      '✅ Rspack (Rust, fast)',
      '❌ Belum support MF',
    ],
  },
  {
    criteria: 'Dev Server Speed',
    values: ['✅ ~200ms HMR', '❌ ~2-5s HMR', '✅ ~300ms HMR', '✅ ~100ms HMR'],
  },
  {
    criteria: 'React 19 Support',
    values: ['✅ Full support', '✅ Support', '✅ Support', '⚠️ Experimental'],
  },
  {
    criteria: 'Manifest-based Discovery',
    values: ['✅ Built-in mf-manifest.json', '⚠️ Manual remoteEntry.js', '✅ Built-in', '❌ N/A'],
  },
  {
    criteria: 'Shared Deps Singleton',
    values: ['✅ Automatic dedup', '✅ Automatic dedup', '✅ Automatic dedup', '❌ N/A'],
  },
  {
    criteria: 'TypeScript DX',
    values: ['✅ Type hinting plugin', '⚠️ Manual d.ts', '✅ Type hinting plugin', '❌ N/A'],
  },
  {
    criteria: 'Nx / Monorepo',
    values: [
      '✅ Nx plugin tersedia',
      '✅ Nx generator mature',
      '⚠️ Community support',
      '⚠️ Turborepo only',
    ],
  },
  {
    criteria: 'Production Maturity',
    values: ['✅ v1.11+ stabil', '✅ Paling mature', '⚠️ Early adoption', '❌ Belum tersedia'],
  },
  {
    criteria: 'ESM Output',
    values: ['✅ Native ESM', '❌ CommonJS default', '✅ ESM support', '✅ ESM'],
  },
  {
    criteria: 'Community / Ecosystem',
    values: [
      '✅ Growing, same team as WP MF',
      '✅ Terbesar',
      '⚠️ Kecil tapi growing',
      '❌ Belum ada',
    ],
  },
];

// ── Data: Monorepo vs Polyrepo comparison ──
const monorepoColumns: ComparisonColumn[] = [
  { header: 'Kriteria' },
  { header: 'Hybrid Monorepo (Nx)', highlight: true },
  { header: 'Polyrepo Tradisional' },
];

const monorepoRows: ComparisonRow[] = [
  {
    criteria: 'Shared Libraries (@nashta/ui-kit)',
    values: [
      '',
      '✅ Single Source of Truth, instan',
      '❌ Membutuhkan publish & update manual berkala',
    ],
  },
  {
    criteria: 'Standarisasi Tooling',
    values: [
      '',
      '✅ Terpusat via Nx Generators, 100% kongruen',
      '❌ Rentan deviasi (Webpack vs Vite, versi linting berbeda)',
    ],
  },
  {
    criteria: 'Kecepatan CI/CD Build',
    values: [
      '',
      '✅ Diferensial parsial via Affected Graph & Caching',
      '✅ Terisolasi sepenuhnya antar repositori',
    ],
  },
  {
    criteria: 'Visibilitas Lintas Tim',
    values: [
      '',
      '✅ Transparan, refaktor lintas-MFE dapat dieksekusi secara atomik',
      '❌ Silo, membutuhkan PR lintas repositori yang kompleks',
    ],
  },
];

export function DocsWhyMfSection() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <SectionTitle
          icon="🏗️"
          title="Kenapa Module Federation?"
          description="Perbandingan pendekatan Micro Frontend dan alasan memilih Vite Module Federation untuk arsitektur Nashta Hajj."
        />

        {/* ── Masalah ── */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Masalah yang Ingin Diselesaikan
          </h3>
          <FeatureGrid
            items={[
              {
                icon: '👥',
                title: 'Tim Paralel',
                desc: 'Beberapa tim harus bisa bekerja bersamaan tanpa saling mengganggu',
              },
              {
                icon: '🚀',
                title: 'Deploy Independen',
                desc: 'Setiap modul bisa di-deploy tanpa rebuild keseluruhan',
              },
              {
                icon: '🔒',
                title: 'Isolasi Kegagalan',
                desc: 'Satu modul crash tidak boleh mematikan seluruh aplikasi',
              },
              {
                icon: '⚡',
                title: 'Performa Build',
                desc: 'Build time harus cepat, terutama di mesin Apple Silicon M4',
              },
            ]}
          />
        </section>

        {/* ── Approach Comparison ── */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Perbandingan Micro Frontend Approaches
          </h3>
          <ComparisonTable columns={approachColumns} rows={approachRows} />
        </section>

        {/* ── Why Not Others ── */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Kenapa Bukan yang Lain?
          </h3>
          <div className="space-y-3">
            <InfoBox variant="red" title="❌ iframe">
              Setiap iframe me-load seluruh React runtime terpisah — berat untuk mobile, tidak bisa
              share state langsung, dan routing synchronization sangat kompleks. URL bar tidak
              mencerminkan state child app.
            </InfoBox>
            <InfoBox variant="amber" title="⚠️ Single SPA">
              Mature tapi terlalu terikat pada Webpack. Setup awal sangat verbose, dan karena kita
              sudah pakai <strong>Vite + React 19</strong>, integrasi menjadi tidak natural. Shared
              dependency management juga lebih manual dibanding Module Federation.
            </InfoBox>
            <InfoBox variant="amber" title="⚠️ Import Map / Native ESM">
              Pendekatan paling "pure" tapi butuh banyak boilerplate untuk state management,
              versioning, dan fallback. Tidak ada built-in support untuk shared singleton — harus
              dikelola manual. Cocok untuk project kecil, tidak untuk enterprise.
            </InfoBox>
          </div>
        </section>

        {/* ── Implementation Comparison ── */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Perbandingan Implementasi Module Federation
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            Setelah memilih pendekatan Module Federation, ada beberapa <em>implementasi</em> yang
            tersedia:
          </p>
          <ComparisonTable columns={implColumns} rows={implRows} />

          <div className="space-y-3 mt-4">
            <InfoBox variant="amber" title="⚠️ Webpack 5 Module Federation">
              Implementasi original dan paling mature, tapi kami sudah memilih <strong>Vite</strong>{' '}
              sebagai bundler karena dev server speed yang jauh lebih cepat (~10x improvement). Tim
              pembuat Webpack MF (Zack Jackson) sendiri yang membuat{' '}
              <code>@module-federation/vite</code> — jadi kualitasnya terjamin.
            </InfoBox>
            <InfoBox variant="amber" title="⚠️ Rspack Module Federation">
              Rspack sangat cepat (Rust-based) dan support MF, tapi masih di tahap{' '}
              <strong>early adoption</strong>. Ecosystem plugin masih kecil, dan Nx integration
              belum se-mature Vite. Bisa menjadi pilihan di masa depan.
            </InfoBox>
            <InfoBox variant="red" title="❌ Turbopack">
              Turbopack (dari Vercel/Next.js) belum mendukung Module Federation sama sekali.
              Fokusnya pada Next.js ecosystem, bukan general-purpose MFE. Eliminasi langsung.
            </InfoBox>
          </div>

          <InfoBox
            variant="emerald"
            title="✅ Kesimpulan: @module-federation/vite"
            className="mt-4"
          >
            <ul className="space-y-1.5 list-disc list-inside mt-1">
              <li>
                <strong>Satu tim pembuat</strong> dengan Webpack MF — Zack Jackson langsung maintain
                kedua versi
              </li>
              <li>
                <strong>Native Vite integration</strong> — langsung plug-in ke vite.config.ts
              </li>
              <li>
                <strong>Manifest-based discovery</strong> — mf-manifest.json bawaan
              </li>
              <li>
                <strong>ESM-first output</strong> — lebih ringan dan cepat di browser modern
              </li>
              <li>
                <strong>Type hinting plugin</strong> — otomatis generate d.ts untuk remote exposes
              </li>
              <li>
                <strong>Production-ready</strong> — v1.11+ sudah stabil
              </li>
            </ul>
          </InfoBox>
        </section>

        {/* ── Key Advantages ── */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Keunggulan Kunci yang Kita Manfaatkan
          </h3>
          <div className="space-y-4">
            <InfoBox variant="emerald" title="1. Manifest-based Dynamic Discovery">
              <p className="mb-3">
                Remote MFE URL tidak di-hardcode. Shell membaca <code>remotes.json</code> saat
                runtime — deploy versi baru tanpa rebuild Shell.
              </p>
              <CodeBlock
                codeString={`// shell/public/remotes.json
{
  "authMfe": "http://localhost:4001/mf-manifest.json",
  "docsMfe": "http://localhost:4003/mf-manifest.json"
}

// Production — cukup ganti URL manifest:
{
  "authMfe": "https://auth.nashta.id/mf-manifest.json",
  "docsMfe": "https://docs.nashta.id/mf-manifest.json"
}`}
                language="json"
              />
            </InfoBox>

            <InfoBox variant="blue" title="2. Shared Dependency Singleton">
              <p className="mb-3">
                React, React DOM, dan library berat lainnya hanya dimuat <strong>sekali</strong> di
                runtime. Semua MFE berbagi instance yang sama.
              </p>
              <CodeBlock
                codeString={`// vite.config.ts — shared dependency policy
shared: {
  react:       { singleton: true, requiredVersion: '^19.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
  'react-router': { singleton: true },
  'lucide-react':  { singleton: false }, // boleh duplikat
}`}
                language="typescript"
              />
            </InfoBox>

            <InfoBox variant="purple" title="3. Resilience — Error Boundary per Remote">
              <p className="mb-3">
                Setiap remote dibungkus <code>React.Suspense</code> + <code>ErrorBoundary</code>.
                Jika auth-mfe crash, Shell dan business-mfe tetap jalan normal.
              </p>
              <CodeBlock
                codeString={`// Shell router — setiap remote terisolasi
<Route path="auth/*" element={
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<PageSkeleton />}>
      <RemoteAuthPage />
    </Suspense>
  </ErrorBoundary>
} />`}
                language="tsx"
              />
            </InfoBox>

            <InfoBox variant="orange" title="4. Zustand State — Langsung Shared">
              <p className="mb-3">
                Auth state, theme, notification — semua Zustand store didefinisikan di{' '}
                <code>shared-types</code> dan langsung bisa diakses dari semua MFE.
              </p>
              <CodeBlock
                codeString={`// Dari MFE manapun — state langsung sync:
import { useAuthStore } from '@nashta/shared-types';

function Header() {
  const user = useAuthStore((s) => s.user);
  return <span>Halo, {user?.name}!</span>;
}`}
                language="tsx"
              />
            </InfoBox>
          </div>
        </section>

        {/* ── Monorepo vs Polyrepo ── */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Arsitektur Hybrid Monorepo (Nx)
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            Proyek ini menggunakan pendekatan <strong>Hybrid Monorepo</strong> yang diorkestrasi
            oleh <strong>Nx</strong>. Seluruh kode sumber dikelola dalam satu repositori terpusat,
            namun setiap modul di-<em>deploy</em> secara independen. Keputusan arsitektur ini
            diambil untuk mendobrak batasan manajerial pada ekosistem Multi-MFE:
          </p>
          <ComparisonTable columns={monorepoColumns} rows={monorepoRows} />

          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-6">
            Pola rancangan ini sejalan dengan fondasi teknis skala <em>enterprise</em> yang
            dipelopori oleh organisasi seperti Google dan Meta. Referensi literatur arsitektur
            komprehensif dapat diakses melalui{' '}
            <a
              href="https://nx.dev/concepts/more-concepts/monorepo-vs-polyrepo"
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline hover:text-blue-800"
            >
              dokumentasi resmi Nx
            </a>{' '}
            serta pedoman fundamental dari{' '}
            <a
              href="https://martinfowler.com/articles/micro-frontends.html"
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline hover:text-blue-800"
            >
              Martin Fowler
            </a>
            .
          </p>
        </section>

        {/* ── ADR ── */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Architecture Decision Record (ADR)
          </h3>
          <KeyValueCard
            entries={[
              { label: 'Status', value: 'Accepted', valueColor: 'text-emerald-600' },
              {
                label: 'Context',
                value:
                  'Sistem travel Hajj/Umroh multi-modul (Auth, CS, Paket, Inventaris) yang akan dikembangkan oleh tim paralel.',
              },
              {
                label: 'Decision',
                value: (
                  <>
                    Menggunakan <strong>Vite + @module-federation/vite</strong> dalam arsitektur{' '}
                    <strong>Nx Hybrid Monorepo</strong>, dengan Zustand shared stores dan
                    manifest-based discovery.
                  </>
                ),
              },
              {
                label: 'Consequences (+)',
                value:
                  'Deploy independen, shared singleton deps, full TypeScript support, fast Vite build, state sharing tanpa boilerplate.',
              },
              {
                label: 'Consequences (−)',
                value:
                  'Tim perlu memahami konsep MF, versioning shared deps perlu dijaga, debugging lintas-remote lebih kompleks.',
              },
            ]}
          />
        </section>
      </CardContent>
    </Card>
  );
}
