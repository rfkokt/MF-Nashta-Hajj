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
   UI Kit Showcase — shadcn-style sidebar nav
   ═══════════════════════════════════════════════ */

const COMPONENTS = [
  { id: 'button', label: 'Button', icon: '🔘' },
  { id: 'input', label: 'Input', icon: '📝' },
  { id: 'card', label: 'Card', icon: '🃏' },
  { id: 'badge', label: 'Badge', icon: '🏷️' },
  { id: 'skeleton', label: 'Skeleton', icon: '💀' },
  { id: 'modal', label: 'Modal', icon: '🪟' },
  { id: 'toast', label: 'Toast', icon: '🔔' },
  { id: 'errorfallback', label: 'ErrorFallback', icon: '🛡️' },
  { id: 'tutorial', label: 'Tutorial', icon: '📖' },
] as const;

type ComponentId = typeof COMPONENTS[number]['id'];

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-neutral-800 shadow-lg my-3">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/50 border-b border-neutral-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
        <button onClick={handleCopy} className="text-xs text-neutral-500 hover:text-white transition-colors">
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-neutral-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{title}</h2>
      <p className="text-neutral-500 dark:text-neutral-400 mt-1">{description}</p>
    </div>
  );
}

function PreviewCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-4">
      {title && <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">{title}</p>}
      {children}
    </div>
  );
}

/* ─── Component Sections ─── */

function ButtonSection() {
  return (
    <>
      <SectionHeader title="Button" description="Tombol interaktif dengan variant dan size berbeda." />
      <PreviewCard title="Variants">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </PreviewCard>
      <PreviewCard title="Sizes">
        <div className="flex flex-wrap gap-3 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </PreviewCard>
      <PreviewCard title="States">
        <div className="flex flex-wrap gap-3 items-center">
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
        </div>
      </PreviewCard>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Usage</h3>
      <CodeBlock>{`import { Button } from '@nashta/ui-kit';

<Button variant="primary" size="md">Click me</Button>
<Button variant="danger">Hapus</Button>
<Button variant="outline" size="sm">Batal</Button>
<Button isLoading>Menyimpan...</Button>`}</CodeBlock>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Props</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <thead className="bg-neutral-50 dark:bg-neutral-900">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Prop</th>
              <th className="text-left px-4 py-2 font-medium">Type</th>
              <th className="text-left px-4 py-2 font-medium">Default</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr><td className="px-4 py-2"><code>variant</code></td><td className="px-4 py-2">primary | secondary | outline | ghost | danger</td><td className="px-4 py-2">primary</td></tr>
            <tr><td className="px-4 py-2"><code>size</code></td><td className="px-4 py-2">sm | md | lg | icon</td><td className="px-4 py-2">md</td></tr>
            <tr><td className="px-4 py-2"><code>isLoading</code></td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">false</td></tr>
            <tr><td className="px-4 py-2"><code>disabled</code></td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">false</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function InputSection() {
  const [val, setVal] = useState('');
  return (
    <>
      <SectionHeader title="Input" description="Text input dengan label, error state, dan hint." />
      <PreviewCard>
        <div className="space-y-4 max-w-md">
          <Input label="Nama Lengkap" placeholder="Masukkan nama..." value={val} onChange={(e) => setVal(e.target.value)} />
          <Input label="Email" type="email" placeholder="email@example.com" hint="Kami tidak akan share email Anda." />
          <Input label="Password" type="password" error="Password minimal 8 karakter" placeholder="••••••••" />
          <Input label="Disabled" disabled value="Tidak bisa diedit" />
        </div>
      </PreviewCard>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Usage</h3>
      <CodeBlock>{`import { Input } from '@nashta/ui-kit';

<Input label="Email" type="email" placeholder="email@example.com" />
<Input label="Password" error="Minimal 8 karakter" />
<Input label="Catatan" hint="Opsional" />`}</CodeBlock>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Props</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <thead className="bg-neutral-50 dark:bg-neutral-900"><tr><th className="text-left px-4 py-2 font-medium">Prop</th><th className="text-left px-4 py-2 font-medium">Type</th><th className="text-left px-4 py-2 font-medium">Default</th></tr></thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr><td className="px-4 py-2"><code>label</code></td><td className="px-4 py-2">string</td><td className="px-4 py-2">—</td></tr>
            <tr><td className="px-4 py-2"><code>error</code></td><td className="px-4 py-2">string</td><td className="px-4 py-2">—</td></tr>
            <tr><td className="px-4 py-2"><code>hint</code></td><td className="px-4 py-2">string</td><td className="px-4 py-2">—</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function CardSection() {
  return (
    <>
      <SectionHeader title="Card" description="Kontainer konten dengan Header, Title, Description, Content, Footer." />
      <PreviewCard>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>Card Title</CardTitle><CardDescription>Deskripsi singkat</CardDescription></CardHeader>
            <CardContent><p className="text-sm text-neutral-600 dark:text-neutral-400">Konten utama card.</p></CardContent>
            <CardFooter className="flex gap-2"><Button size="sm">Simpan</Button><Button size="sm" variant="outline">Batal</Button></CardFooter>
          </Card>
          <Card>
            <CardHeader><CardTitle>Statistik</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">1,234</div><p className="text-sm text-emerald-600">+12.5%</p></CardContent>
          </Card>
        </div>
      </PreviewCard>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Usage</h3>
      <CodeBlock>{`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@nashta/ui-kit';

<Card>
  <CardHeader>
    <CardTitle>Judul</CardTitle>
    <CardDescription>Deskripsi</CardDescription>
  </CardHeader>
  <CardContent>Isi konten</CardContent>
  <CardFooter><Button>Aksi</Button></CardFooter>
</Card>`}</CodeBlock>
    </>
  );
}

function BadgeSection() {
  return (
    <>
      <SectionHeader title="Badge" description="Label status dengan 6 variants." />
      <PreviewCard title="Variants">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </PreviewCard>
      <PreviewCard title="Use Cases">
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">✓ Aktif</Badge>
          <Badge variant="warning">⏳ Pending</Badge>
          <Badge variant="error">✕ Ditolak</Badge>
          <Badge variant="info">3 Baru</Badge>
        </div>
      </PreviewCard>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Usage</h3>
      <CodeBlock>{`import { Badge } from '@nashta/ui-kit';

<Badge variant="success">Aktif</Badge>
<Badge variant="error">Ditolak</Badge>
<Badge variant="outline">Draft</Badge>`}</CodeBlock>
    </>
  );
}

function SkeletonSection() {
  return (
    <>
      <SectionHeader title="Skeleton" description="Placeholder loading dengan animasi pulse." />
      <PreviewCard>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
          </div>
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-20 rounded-lg" /><Skeleton className="h-20 rounded-lg" /><Skeleton className="h-20 rounded-lg" />
          </div>
        </div>
      </PreviewCard>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Usage</h3>
      <CodeBlock>{`import { Skeleton } from '@nashta/ui-kit';

<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-32 w-full rounded-xl" />`}</CodeBlock>
    </>
  );
}

function ModalSection() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  return (
    <>
      <SectionHeader title="Modal / Dialog" description="Dialog menggunakan native <dialog> element. 3 sizes." />
      <PreviewCard title="Try it">
        <div className="flex flex-wrap gap-3">
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Button key={s} variant="outline" onClick={() => { setSize(s); setOpen(true); }}>
              Open {s.toUpperCase()}
            </Button>
          ))}
        </div>
      </PreviewCard>
      <Modal open={open} onClose={() => setOpen(false)} title="Contoh Modal" description={`Size: ${size}`} size={size}>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Ini konten modal. Bisa form, konfirmasi, dll.</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
          <Button onClick={() => setOpen(false)}>Simpan</Button>
        </div>
      </Modal>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Usage</h3>
      <CodeBlock>{`import { Modal } from '@nashta/ui-kit';

const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)} title="Judul" size="md">
  <p>Konten modal</p>
  <Button onClick={() => setOpen(false)}>Tutup</Button>
</Modal>`}</CodeBlock>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Props</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <thead className="bg-neutral-50 dark:bg-neutral-900"><tr><th className="text-left px-4 py-2 font-medium">Prop</th><th className="text-left px-4 py-2 font-medium">Type</th><th className="text-left px-4 py-2 font-medium">Default</th></tr></thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr><td className="px-4 py-2"><code>open</code></td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">false</td></tr>
            <tr><td className="px-4 py-2"><code>onClose</code></td><td className="px-4 py-2">() =&gt; void</td><td className="px-4 py-2">—</td></tr>
            <tr><td className="px-4 py-2"><code>title</code></td><td className="px-4 py-2">string</td><td className="px-4 py-2">—</td></tr>
            <tr><td className="px-4 py-2"><code>size</code></td><td className="px-4 py-2">sm | md | lg | fullscreen</td><td className="px-4 py-2">md</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function ToastSection() {
  return (
    <>
      <SectionHeader title="Toast / Notification" description="Toast notifikasi via useNotificationStore. 4 variant." />
      <PreviewCard title="Try it">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => useNotificationStore.getState().success('Data berhasil disimpan!')}>✅ Success</Button>
          <Button variant="outline" onClick={() => useNotificationStore.getState().error('Gagal menyimpan data')}>❌ Error</Button>
          <Button variant="outline" onClick={() => useNotificationStore.getState().warning('Sesi hampir habis')}>⚠️ Warning</Button>
          <Button variant="outline" onClick={() => useNotificationStore.getState().info('Update tersedia')}>ℹ️ Info</Button>
        </div>
      </PreviewCard>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Usage</h3>
      <CodeBlock>{`import { useNotificationStore } from '@nashta/shared-types';

// Dari mana saja (tidak perlu hook):
useNotificationStore.getState().success('Berhasil!');
useNotificationStore.getState().error('Gagal!');
useNotificationStore.getState().warning('Peringatan!');
useNotificationStore.getState().info('Info baru');`}</CodeBlock>
    </>
  );
}

function ErrorFallbackSection() {
  return (
    <>
      <SectionHeader title="ErrorFallback" description="Fallback UI untuk React Error Boundary." />
      <PreviewCard>
        <div className="text-center p-8 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <p className="text-4xl mb-3">⚠️</p>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Terjadi Kesalahan</h3>
          <p className="text-sm text-neutral-500 mt-1">Komponen ini mengalami error dan ditangkap oleh ErrorBoundary</p>
          <Button variant="outline" size="sm" className="mt-4">Coba Lagi</Button>
        </div>
      </PreviewCard>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">Usage</h3>
      <CodeBlock>{`import { ErrorFallback } from '@nashta/ui-kit';
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <SomeComponent />
</ErrorBoundary>`}</CodeBlock>
    </>
  );
}

function TutorialSection() {
  return (
    <>
      <SectionHeader title="Tutorial: Membuat Komponen Baru" description="Langkah-langkah menambahkan komponen ke UI Kit." />

      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">1. Buat file komponen</h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Tambah file di <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">libs/ui-kit/src/components/Chip.tsx</code></p>
      <CodeBlock>{`import type { ReactNode } from 'react';

export interface ChipProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'neutral';
  onRemove?: () => void;
}

export function Chip({ children, color = 'primary', onRemove }: ChipProps) {
  const colors = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300',
    secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  };
  return (
    <span className={\`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm \${colors[color]}\`}>
      {children}
      {onRemove && <button onClick={onRemove}>×</button>}
    </span>
  );
}`}</CodeBlock>

      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">2. Export dari barrel</h3>
      <CodeBlock>{`// libs/ui-kit/src/index.ts
export { Chip } from './components/Chip';
export type { ChipProps } from './components/Chip';`}</CodeBlock>

      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">3. Gunakan di MFE</h3>
      <CodeBlock>{`import { Chip } from '@nashta/ui-kit';

<Chip color="primary" onRemove={() => console.log('remove')}>
  Haji 2026
</Chip>`}</CodeBlock>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mt-6">
        <h3 className="text-base font-semibold text-amber-800 dark:text-amber-300 mb-2">⚠️ Rules & Conventions</h3>
        <ul className="space-y-1.5 list-disc list-inside text-sm text-amber-700 dark:text-amber-400">
          <li>Wajib punya <strong>TypeScript interface</strong> (Props)</li>
          <li>Gunakan <strong>design tokens</strong> dari <code className="text-xs">tokens.css</code></li>
          <li>Selalu support <strong>dark mode</strong> (<code className="text-xs">dark:</code> variant)</li>
          <li>Export komponen <strong>dan</strong> type dari <code className="text-xs">index.ts</code></li>
          <li>Jangan import <code className="text-xs">@nashta/shared-types</code> di ui-kit (circular)</li>
          <li>Tambahkan <strong>aria attributes</strong></li>
          <li>Komponen harus <strong>stateless</strong> (via props)</li>
          <li>Tambahkan <code className="text-xs">className</code> prop untuk extensibility</li>
        </ul>
      </div>

      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-6 mb-2">📁 Struktur Folder</h3>
      <CodeBlock>{`libs/ui-kit/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Skeleton.tsx
│   │   └── ErrorFallback.tsx
│   ├── theme/
│   │   └── tokens.css
│   ├── utils/
│   │   └── cn.ts
│   └── index.ts        ← WAJIB register di sini
└── package.json`}</CodeBlock>
    </>
  );
}

/* ─── Component Map ─── */
const SECTION_MAP: Record<ComponentId, () => JSX.Element> = {
  button: ButtonSection,
  input: InputSection,
  card: CardSection,
  badge: BadgeSection,
  skeleton: SkeletonSection,
  modal: ModalSection,
  toast: ToastSection,
  errorfallback: ErrorFallbackSection,
  tutorial: TutorialSection,
};

/* ═══════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════ */
export function UIKitPage() {
  const [active, setActive] = useState<ComponentId>('button');
  const ActiveSection = SECTION_MAP[active];

  return (
    <div className="flex gap-0 -mx-6 lg:-mx-8 -mt-6 min-h-[calc(100vh-4rem)]">
      {/* ── Sidebar ── */}
      <aside className="w-56 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-6 px-3 overflow-y-auto">
        <div className="px-3 mb-4">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Components</h2>
          <p className="text-xs text-neutral-400 mt-0.5">@nashta/ui-kit</p>
        </div>

        <div className="space-y-0.5">
          {COMPONENTS.filter(c => c.id !== 'tutorial').map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActive(comp.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                active === comp.id
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium nav-item-active'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <span className="mr-2 text-xs">{comp.icon}</span>
              {comp.label}
            </button>
          ))}
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-4 pt-4 px-3">
          <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Guide</p>
        </div>
        <button
          onClick={() => setActive('tutorial')}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            active === 'tutorial'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium nav-item-active'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <span className="mr-2 text-xs">📖</span>
          Tutorial
        </button>
      </aside>

      {/* ── Content ── */}
      <main className="flex-1 p-8 overflow-y-auto">
        <ActiveSection />
      </main>
    </div>
  );
}

export default UIKitPage;
