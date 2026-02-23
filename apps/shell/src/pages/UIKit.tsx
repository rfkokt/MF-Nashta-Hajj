import { useState } from 'react';
import {
  Button,
  Input,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Skeleton,
  Badge,
  Modal,
} from '@nashta/ui-kit';
import { useNotificationStore } from '@nashta/shared-types';

/* ═══════════════════════════════════════════════
   UI Kit Showcase — Live component gallery + tutorial
   ═══════════════════════════════════════════════ */

function SectionTitle({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="text-xl font-bold mt-10 mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800 scroll-mt-20">
      {children}
    </h2>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-neutral-900 dark:bg-black text-neutral-100 text-sm p-4 rounded-xl overflow-x-auto mt-2 mb-4 leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

export function UIKitPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="w-full">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">🎨 Shared UI Kit</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-2">
          Galeri komponen <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">@nashta/ui-kit</code> —
          Live preview untuk semua komponen yang tersedia.
        </p>
      </div>

      {/* Quick Nav */}
      <Card>
        <CardContent className="pt-4">
          <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2">Quick Navigation</p>
          <div className="flex flex-wrap gap-2">
            {['Button', 'Input', 'Card', 'Badge', 'Skeleton', 'Modal', 'Toast', 'ErrorFallback', 'Tutorial'].map((name) => (
              <a
                key={name}
                href={`#${name.toLowerCase()}`}
                className="px-3 py-1.5 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {name}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ─── BUTTON ─── */}
      <SectionTitle id="button">Button</SectionTitle>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Tombol dengan variants: <code>default</code>, <code>secondary</code>, <code>outline</code>, <code>ghost</code>, <code>destructive</code>.
        Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.
      </p>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Button disabled>Disabled</Button>
            <Button className="w-full">Full Width</Button>
          </div>
        </CardContent>
      </Card>
      <CodeBlock>{`import { Button } from '@nashta/ui-kit';

<Button variant="default" size="md">Click me</Button>
<Button variant="danger">Hapus</Button>
<Button variant="outline" size="sm">Batal</Button>`}</CodeBlock>

      {/* ─── INPUT ─── */}
      <SectionTitle id="input">Input</SectionTitle>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Input field dengan label, error state, dan helper text.
      </p>
      <Card>
        <CardContent className="pt-6 space-y-4 max-w-md">
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="email@example.com"
            hint="Kami tidak akan membagikan email Anda."
          />
          <Input
            label="Password"
            type="password"
            error="Password minimal 8 karakter"
            placeholder="••••••••"
          />
          <Input
            label="Disabled"
            disabled
            value="Tidak bisa diedit"
          />
        </CardContent>
      </Card>
      <CodeBlock>{`import { Input } from '@nashta/ui-kit';

<Input label="Email" type="email" placeholder="email@example.com" />
<Input label="Password" error="Minimal 8 karakter" />`}</CodeBlock>

      {/* ─── CARD ─── */}
      <SectionTitle id="card">Card</SectionTitle>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Kontainer konten dengan Header, Title, Description, Content, Footer.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Deskripsi singkat card ini</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Konten utama card berada di sini. Bisa berisi teks, form, atau komponen lain.
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button size="sm">Simpan</Button>
            <Button size="sm" variant="outline">Batal</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Statistik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">+12.5% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>
      <CodeBlock>{`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@nashta/ui-kit';

<Card>
  <CardHeader>
    <CardTitle>Judul</CardTitle>
    <CardDescription>Deskripsi</CardDescription>
  </CardHeader>
  <CardContent>Isi konten</CardContent>
  <CardFooter>
    <Button>Aksi</Button>
  </CardFooter>
</Card>`}</CodeBlock>

      {/* ─── BADGE ─── */}
      <SectionTitle id="badge">Badge</SectionTitle>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Label status dengan 6 variants: <code>default</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code>, <code>outline</code>.
      </p>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3 items-center">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 items-center">
            <Badge variant="success">✓ Aktif</Badge>
            <Badge variant="warning">⏳ Pending</Badge>
            <Badge variant="error">✕ Ditolak</Badge>
            <Badge variant="info">3 Baru</Badge>
          </div>
        </CardContent>
      </Card>
      <CodeBlock>{`import { Badge } from '@nashta/ui-kit';

<Badge variant="success">Aktif</Badge>
<Badge variant="error">Ditolak</Badge>
<Badge variant="outline">Draft</Badge>`}</CodeBlock>

      {/* ─── SKELETON ─── */}
      <SectionTitle id="skeleton">Skeleton</SectionTitle>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Placeholder loading dengan animasi pulse.
      </p>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
        </CardContent>
      </Card>
      <CodeBlock>{`import { Skeleton } from '@nashta/ui-kit';

<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-32 w-full rounded-xl" />`}</CodeBlock>

      {/* ─── MODAL ─── */}
      <SectionTitle id="modal">Modal / Dialog</SectionTitle>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Dialog menggunakan native <code>&lt;dialog&gt;</code> element. Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>, <code>fullscreen</code>.
      </p>
      <Card>
        <CardContent className="pt-6 flex flex-wrap gap-3">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Button
              key={size}
              variant="outline"
              onClick={() => { setModalSize(size); setModalOpen(true); }}
            >
              Open {size.toUpperCase()}
            </Button>
          ))}
        </CardContent>
      </Card>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Contoh Modal" description={`Size: ${modalSize}`} size={modalSize}>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Ini adalah konten modal. Bisa berisi form, konfirmasi, atau informasi detail.
        </p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
          <Button onClick={() => setModalOpen(false)}>Simpan</Button>
        </div>
      </Modal>
      <CodeBlock>{`import { Modal } from '@nashta/ui-kit';

const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)} title="Judul" size="md">
  <p>Konten modal</p>
  <Button onClick={() => setOpen(false)}>Tutup</Button>
</Modal>`}</CodeBlock>

      {/* ─── TOAST ─── */}
      <SectionTitle id="toast">Toast / Notification</SectionTitle>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Toast notifikasi via <code>useNotificationStore</code>. 4 variant: <code>success</code>, <code>error</code>, <code>warning</code>, <code>info</code>.
      </p>
      <Card>
        <CardContent className="pt-6 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => useNotificationStore.getState().success('Data berhasil disimpan!')}>
            ✅ Success
          </Button>
          <Button variant="outline" onClick={() => useNotificationStore.getState().error('Gagal menyimpan data')}>
            ❌ Error
          </Button>
          <Button variant="outline" onClick={() => useNotificationStore.getState().warning('Sesi hampir habis')}>
            ⚠️ Warning
          </Button>
          <Button variant="outline" onClick={() => useNotificationStore.getState().info('Update tersedia')}>
            ℹ️ Info
          </Button>
        </CardContent>
      </Card>
      <CodeBlock>{`import { useNotificationStore } from '@nashta/shared-types';

// Dari mana saja (tidak perlu hook):
useNotificationStore.getState().success('Berhasil!');
useNotificationStore.getState().error('Gagal!');
useNotificationStore.getState().warning('Peringatan!');
useNotificationStore.getState().info('Info baru');`}</CodeBlock>

      {/* ─── ERROR FALLBACK ─── */}
      <SectionTitle id="errorfallback">ErrorFallback</SectionTitle>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Fallback UI untuk React Error Boundary.
      </p>
      <CodeBlock>{`import { ErrorFallback } from '@nashta/ui-kit';
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <SomeComponent />
</ErrorBoundary>`}</CodeBlock>

      {/* ═══════════════════════════════════════════════
         TUTORIAL: Cara Membuat Komponen Baru
         ═══════════════════════════════════════════════ */}
      <SectionTitle id="tutorial">📖 Tutorial: Membuat Komponen Baru</SectionTitle>

      <Card>
        <CardContent className="pt-6 space-y-6 text-sm text-neutral-600 dark:text-neutral-400">
          {/* Step 1 */}
          <div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">1. Buat file komponen</h3>
            <p className="mb-2">Tambahkan file baru di <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">libs/ui-kit/src/components/NamaKomponen.tsx</code></p>
            <CodeBlock>{`// libs/ui-kit/src/components/Chip.tsx
import type { ReactNode } from 'react';

export interface ChipProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'neutral';
  onRemove?: () => void;
  className?: string;
}

export function Chip({
  children,
  color = 'primary',
  onRemove,
  className = '',
}: ChipProps) {
  const colors = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300',
    secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  };

  return (
    <span className={\`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium \${colors[color]} \${className}\`}>
      {children}
      {onRemove && (
        <button onClick={onRemove} className="ml-1 hover:opacity-70" aria-label="Remove">
          ×
        </button>
      )}
    </span>
  );
}`}</CodeBlock>
          </div>

          {/* Step 2 */}
          <div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">2. Export dari barrel file</h3>
            <p className="mb-2">Tambahkan export di <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">libs/ui-kit/src/index.ts</code></p>
            <CodeBlock>{`// libs/ui-kit/src/index.ts
export { Chip } from './components/Chip';
export type { ChipProps } from './components/Chip';`}</CodeBlock>
          </div>

          {/* Step 3 */}
          <div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">3. Gunakan di MFE manapun</h3>
            <CodeBlock>{`// Di apps/shell/src/pages/... atau MFE lain
import { Chip } from '@nashta/ui-kit';

<Chip color="primary" onRemove={() => console.log('remove')}>
  Haji 2026
</Chip>`}</CodeBlock>
          </div>

          {/* Rules */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <h3 className="text-base font-semibold text-amber-800 dark:text-amber-300 mb-2">⚠️ Rules & Conventions</h3>
            <ul className="space-y-1.5 list-disc list-inside text-amber-700 dark:text-amber-400">
              <li>Setiap komponen wajib punya <strong>TypeScript interface</strong> (Props)</li>
              <li>Gunakan <strong>design tokens</strong> dari <code className="text-xs">tokens.css</code>, jangan hardcode warna</li>
              <li>Selalu support <strong>dark mode</strong> — tambahkan <code className="text-xs">dark:</code> variant</li>
              <li>Export komponen <strong>dan</strong> type dari <code className="text-xs">index.ts</code></li>
              <li>Jangan import dari <code className="text-xs">@nashta/shared-types</code> di ui-kit (circular dep)</li>
              <li>Tambahkan <strong>aria attributes</strong> untuk accessibility</li>
              <li>Komponen harus <strong>stateless</strong> (terima data via props)</li>
              <li>Tambahkan <code className="text-xs">className</code> prop untuk extensibility</li>
            </ul>
          </div>

          {/* File structure */}
          <div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">📁 Struktur Folder</h3>
            <CodeBlock>{`libs/ui-kit/
├── src/
│   ├── components/
│   │   ├── Button.tsx      ← Komponen
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Skeleton.tsx
│   │   ├── ErrorFallback.tsx
│   │   └── Chip.tsx        ← Komponen baru Anda
│   ├── theme/
│   │   └── tokens.css      ← Design tokens (warna, font, spacing)
│   ├── utils/
│   │   └── cn.ts           ← Helper className merger
│   └── index.ts            ← Barrel export (WAJIB register di sini)
└── package.json`}</CodeBlock>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UIKitPage;
