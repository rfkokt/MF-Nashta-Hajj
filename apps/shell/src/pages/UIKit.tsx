import { useState } from 'react';
import { useLocation } from 'react-router';
import {
  Button,
  Input,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Skeleton,
  Badge,
  Modal,
  FormField,
  useFormValidation,
} from '@nashta/ui-kit';
import { useNotificationStore } from '@nashta/shared-types';
import { discoveredComponents } from '../utils/component-discovery';
import * as yup from 'yup';

/* ═══════════════════════════════════════════════
   UI Kit Showcase — route-based, no internal sidebar.
   Sub-menu lives in the main shell sidebar.
   ═══════════════════════════════════════════════ */

/** Simple syntax highlighter — tokenizes TSX/JS code into colored spans */
function highlightCode(code: string): React.ReactNode[] {
  // Token patterns ordered by priority
  const patterns: [RegExp, string][] = [
    // Comments
    [/\/\/.*$/gm, 'text-neutral-500 italic'],
    // Template literals
    [/`[^`]*`/g, 'text-[#a5d6ff]'],
    // Strings (double & single)
    [/"(?:[^"\\]|\\.)*"/g, 'text-[#a5d6ff]'],
    [/'(?:[^'\\]|\\.)*'/g, 'text-[#a5d6ff]'],
    // JSX self-closing & opening tags: <Component or </Component
    [/<\/?[A-Z][A-Za-z0-9.]*/g, 'text-[#7ee787]'],
    // HTML tags: <div, </div, <p, etc.
    [/<\/?[a-z][a-z0-9-]*/g, 'text-[#7ee787]'],
    // Closing bracket / or />
    [/\/>/g, 'text-[#7ee787]'],
    // Keywords
    [/\b(import|export|from|const|let|var|function|return|if|else|new|typeof|type|interface|extends|implements|class|default|async|await|throw|try|catch|finally|for|while|do|switch|case|break|continue|void|null|undefined|true|false|as)\b/g, 'text-[#ff7b72]'],
    // React/TS types & special
    [/\b(React|useState|useEffect|useRef|useMemo|useCallback|ReactNode|FC|JSX|Record|Partial|Pick|Omit|Promise)\b/g, 'text-[#d2a8ff]'],
    // JSX attribute names (word followed by =)
    [/\b([a-zA-Z-]+)(?==)/g, 'text-[#79c0ff]'],
    // Numbers
    [/\b\d+\.?\d*\b/g, 'text-[#ffa657]'],
    // Arrow & operators
    [/=>/g, 'text-[#ff7b72]'],
  ];

  type Token = { start: number; end: number; className: string };
  const tokens: Token[] = [];

  // Collect all matches
  for (const [regex, className] of patterns) {
    const r = new RegExp(regex.source, regex.flags);
    let match;
    while ((match = r.exec(code)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      // Check overlap with higher-priority tokens
      const overlaps = tokens.some(t => start < t.end && end > t.start);
      if (!overlaps) {
        tokens.push({ start, end, className });
      }
    }
  }

  // Sort by position
  tokens.sort((a, b) => a.start - b.start);

  // Build React nodes
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  tokens.forEach((tok, i) => {
    if (tok.start > cursor) {
      nodes.push(<span key={`t-${i}`}>{code.slice(cursor, tok.start)}</span>);
    }
    nodes.push(<span key={`h-${i}`} className={tok.className}>{code.slice(tok.start, tok.end)}</span>);
    cursor = tok.end;
  });
  if (cursor < code.length) {
    nodes.push(<span key="rest">{code.slice(cursor)}</span>);
  }
  return nodes;
}

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = children.split('\n');

  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-neutral-800 shadow-lg my-3">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-neutral-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <button onClick={handleCopy} className="text-xs text-neutral-500 hover:text-white transition-colors px-2 py-1 rounded hover:bg-neutral-800">
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-[#161b22]">
                <td className="select-none text-right pr-4 pl-4 py-0 text-[13px] font-mono text-neutral-600 w-[1%] whitespace-nowrap align-top leading-relaxed">
                  {i + 1}
                </td>
                <td className="pr-4 py-0 text-[13px] font-mono text-[#c9d1d9] whitespace-pre leading-relaxed">
                  {highlightCode(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

function PropsTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="w-full text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <thead className="bg-neutral-50 dark:bg-neutral-900">
          <tr>
            <th className="text-left px-4 py-2 font-medium">Prop</th>
            <th className="text-left px-4 py-2 font-medium">Type</th>
            <th className="text-left px-4 py-2 font-medium">Default</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {rows.map(([prop, type, def]) => (
            <tr key={prop}>
              <td className="px-4 py-2"><code>{prop}</code></td>
              <td className="px-4 py-2 text-neutral-500">{type}</td>
              <td className="px-4 py-2 text-neutral-400">{def}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Component Sections ─── */

function ButtonSection() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
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
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Usage</h3>
        <CodeBlock>{`import { Button } from '@nashta/ui-kit';

<Button variant="primary" size="md">Click me</Button>
<Button variant="danger">Hapus</Button>
<Button isLoading>Menyimpan...</Button>`}</CodeBlock>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Props</h3>
        <PropsTable rows={[
          ['variant', 'primary | secondary | outline | ghost | danger', 'primary'],
          ['size', 'sm | md | lg | icon', 'md'],
          ['isLoading', 'boolean', 'false'],
          ['disabled', 'boolean', 'false'],
        ]} />
      </CardContent>
    </Card>
  );
}

function InputSection() {
  const [val, setVal] = useState('');
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <SectionHeader title="Input" description="Text input dengan label, error state, dan hint." />
        <PreviewCard>
          <div className="space-y-4 max-w-md">
            <Input label="Nama Lengkap" placeholder="Masukkan nama..." value={val} onChange={(e) => setVal(e.target.value)} />
            <Input label="Email" type="email" placeholder="email@example.com" hint="Kami tidak akan share email Anda." />
            <Input label="Password" type="password" error="Password minimal 8 karakter" placeholder="••••••••" />
            <Input label="Disabled" disabled value="Tidak bisa diedit" />
          </div>
        </PreviewCard>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Usage</h3>
        <CodeBlock>{`import { Input } from '@nashta/ui-kit';

<Input label="Email" type="email" placeholder="email@example.com" />
<Input label="Password" error="Minimal 8 karakter" />
<Input label="Catatan" hint="Opsional" />`}</CodeBlock>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Props</h3>
        <PropsTable rows={[
          ['label', 'string', '—'],
          ['error', 'string', '—'],
          ['hint', 'string', '—'],
        ]} />
      </CardContent>
    </Card>
  );
}

function CardSection() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
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
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Usage</h3>
        <CodeBlock>{`import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@nashta/ui-kit';

<Card>
  <CardHeader>
    <CardTitle>Judul</CardTitle>
  </CardHeader>
  <CardContent>Isi konten</CardContent>
  <CardFooter><Button>Aksi</Button></CardFooter>
</Card>`}</CodeBlock>
      </CardContent>
    </Card>
  );
}

function BadgeSection() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
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
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Usage</h3>
        <CodeBlock>{`import { Badge } from '@nashta/ui-kit';

<Badge variant="success">Aktif</Badge>
<Badge variant="error">Ditolak</Badge>`}</CodeBlock>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Props</h3>
        <PropsTable rows={[
          ['variant', 'default | success | warning | error | info | outline', 'default'],
          ['className', 'string', '—'],
        ]} />
      </CardContent>
    </Card>
  );
}

function SkeletonSection() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
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
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Usage</h3>
        <CodeBlock>{`import { Skeleton } from '@nashta/ui-kit';

<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-3/4" />`}</CodeBlock>
      </CardContent>
    </Card>
  );
}

function ModalSection() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <SectionHeader title="Modal / Dialog" description="Native <dialog> element. 3 sizes." />
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
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Konten modal.</p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={() => setOpen(false)}>Simpan</Button>
          </div>
        </Modal>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Usage</h3>
        <CodeBlock>{`import { Modal } from '@nashta/ui-kit';

const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)} title="Judul" size="md">
  <p>Konten</p>
</Modal>`}</CodeBlock>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Props</h3>
        <PropsTable rows={[
          ['open', 'boolean', 'false'],
          ['onClose', '() => void', '—'],
          ['title', 'string', '—'],
          ['size', 'sm | md | lg | fullscreen', 'md'],
        ]} />
      </CardContent>
    </Card>
  );
}

function ToastSection() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <SectionHeader title="Toast / Notification" description="Toast via useNotificationStore. 4 variant." />
        <PreviewCard title="Try it">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => useNotificationStore.getState().success('Data berhasil disimpan!')}>✅ Success</Button>
            <Button variant="outline" onClick={() => useNotificationStore.getState().error('Gagal menyimpan data')}>❌ Error</Button>
            <Button variant="outline" onClick={() => useNotificationStore.getState().warning('Sesi hampir habis')}>⚠️ Warning</Button>
            <Button variant="outline" onClick={() => useNotificationStore.getState().info('Update tersedia')}>ℹ️ Info</Button>
          </div>
        </PreviewCard>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Usage</h3>
        <CodeBlock>{`import { useNotificationStore } from '@nashta/shared-types';

useNotificationStore.getState().success('Berhasil!');
useNotificationStore.getState().error('Gagal!');`}</CodeBlock>
      </CardContent>
    </Card>
  );
}

function ErrorFallbackSection() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <SectionHeader title="ErrorFallback" description="Fallback UI untuk React Error Boundary." />
        <PreviewCard>
          <div className="text-center p-8 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <p className="text-4xl mb-3">⚠️</p>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Terjadi Kesalahan</h3>
            <p className="text-sm text-neutral-500 mt-1">Komponen ini ditangkap oleh ErrorBoundary</p>
            <Button variant="outline" size="sm" className="mt-4">Coba Lagi</Button>
          </div>
        </PreviewCard>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Usage</h3>
        <CodeBlock>{`import { ErrorFallback } from '@nashta/ui-kit';
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <SomeComponent />
</ErrorBoundary>`}</CodeBlock>
      </CardContent>
    </Card>
  );
}

function TutorialSection() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <SectionHeader title="Tutorial: Membuat Komponen Baru" description="Langkah-langkah menambahkan komponen ke UI Kit." />
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">1. Buat file komponen</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
          Tambah file di <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">libs/ui-kit/src/components/Chip.tsx</code>
      </p>
      <CodeBlock>{`import type { ReactNode } from 'react';

export interface ChipProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'neutral';
  onRemove?: () => void;
}

export function Chip({ children, color = 'primary', onRemove }: ChipProps) {
  const colors = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/40',
    secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40',
    neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800',
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
          <li>Selalu support <strong>dark mode</strong></li>
          <li>Export komponen <strong>dan</strong> type dari <code className="text-xs">index.ts</code></li>
          <li>Jangan import <code className="text-xs">@nashta/shared-types</code> di ui-kit (circular)</li>
          <li>Tambahkan <strong>aria attributes</strong></li>
          <li>Komponen harus <strong>stateless</strong> (via props)</li>
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
      </CardContent>
    </Card>
  );
}

/* ─── Undocumented Component Placeholder ─── */
function UndocumentedSection({ name }: { name: string }) {
  return (
    <>
      <SectionHeader title={name} description="Komponen ini belum memiliki dokumentasi." />
      <div className="border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-xl p-8 text-center">
        <p className="text-4xl mb-4">📝</p>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Dokumentasi Belum Tersedia
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-4">
          Komponen <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm font-mono">{name}</code> sudah terdeteksi di <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm font-mono">libs/ui-kit/src/components/</code> tapi belum ada dokumentasinya.
        </p>
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 text-left max-w-lg mx-auto">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Cara menambahkan dokumentasi:</p>
          <ol className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <li>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">1.</span> Buka <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">apps/shell/src/pages/UIKit.tsx</code>
            </li>
            <li>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">2.</span> Buat function <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">{name}Section()</code> dengan preview + code usage
            </li>
            <li>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">3.</span> Tambahkan ke <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">SECTION_MAP</code>:
            </li>
          </ol>
          <CodeBlock>{`// Di SECTION_MAP, tambahkan:
const SECTION_MAP: Record<string, React.FC> = {
  ...
  ${name.toLowerCase()}: ${name}Section,
};`}</CodeBlock>
        </div>
      </div>
    </>
  );
}

/* ─── Overview / Landing ─── */
function OverviewSection() {
  return (
    <>
      <SectionHeader title="🎨 Shared UI Kit" description="Galeri komponen @nashta/ui-kit — pilih komponen dari sidebar untuk melihat preview." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {discoveredComponents.map((c) => {
          const hasDoc = c.slug in SECTION_MAP;
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
    </>
  );
}

/* ─── Form Validation Section ─── */

const demoSchema = yup.object({
  nama: yup.string().required('Nama wajib diisi').min(3, 'Nama minimal 3 karakter'),
  email: yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  umur: yup.string().required('Umur wajib diisi').test('is-number', 'Umur harus angka', (v) => !v || !isNaN(Number(v))).test('min-age', 'Minimal umur 17 tahun', (v) => !v || Number(v) >= 17),
  telepon: yup.string().required('Nomor telepon wajib diisi').matches(/^[0-9]+$/, 'Hanya angka').min(10, 'Minimal 10 digit'),
});

function FormFieldSection() {
  const { errors, touched, handleSubmit, isSubmitting, reset, getFieldProps } = useFormValidation({
    schema: demoSchema,
    initialValues: { nama: '', email: '', umur: '', telepon: '' },
    onSubmit: async (data) => {
      await new Promise(r => setTimeout(r, 1000));
      useNotificationStore.getState().success(`Form terkirim! Nama: ${data.nama}, Email: ${data.email}`);
      reset();
    },
  });

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <SectionHeader title="Form Validation" description="Validasi form menggunakan useFormValidation hook + Yup schema." />

        <PreviewCard title="Live Demo — Coba isi dan submit">
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <FormField name="nama" label="Nama Lengkap" required error={touched.nama ? errors.nama : undefined}>
              <Input {...getFieldProps('nama')} placeholder="Masukkan nama..." error={touched.nama ? errors.nama : undefined} />
            </FormField>

            <FormField name="email" label="Email" required error={touched.email ? errors.email : undefined}>
              <Input {...getFieldProps('email')} type="email" placeholder="email@example.com" error={touched.email ? errors.email : undefined} />
            </FormField>

            <FormField name="umur" label="Umur" required error={touched.umur ? errors.umur : undefined} hint="Minimal 17 tahun">
              <Input {...getFieldProps('umur')} placeholder="25" error={touched.umur ? errors.umur : undefined} />
            </FormField>

            <FormField name="telepon" label="No. Telepon" required error={touched.telepon ? errors.telepon : undefined}>
              <Input {...getFieldProps('telepon')} placeholder="08xxxxxxxxxx" error={touched.telepon ? errors.telepon : undefined} />
            </FormField>

            <div className="flex gap-3 pt-2">
              <Button type="submit" isLoading={isSubmitting}>Kirim</Button>
              <Button type="button" variant="outline" onClick={reset}>Reset</Button>
            </div>
          </form>
        </PreviewCard>

        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">1. Definisikan Schema</h3>
        <CodeBlock>{`import * as yup from 'yup';

const schema = yup.object({
  nama: yup.string()
    .required('Nama wajib diisi')
    .min(3, 'Nama minimal 3 karakter'),
  email: yup.string()
    .required('Email wajib diisi')
    .email('Format email tidak valid'),
  umur: yup.string()
    .required('Umur wajib diisi')
    .test('min-age', 'Minimal 17', (v) => Number(v) >= 17),
  telepon: yup.string()
    .required('Telepon wajib diisi')
    .matches(/^[0-9]+$/, 'Hanya angka')
    .min(10, 'Minimal 10 digit'),
});`}</CodeBlock>

        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">2. Gunakan Hook</h3>
        <CodeBlock>{`import { useFormValidation, FormField, Input, Button } from '@nashta/ui-kit';

function MyForm() {
  const { handleSubmit, getFieldProps, isSubmitting, reset, touched, errors } = useFormValidation({
    schema,
    initialValues: { nama: '', email: '', umur: '', telepon: '' },
    onSubmit: async (data) => {
      await api.post('/jamaah', data);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <FormField name="nama" label="Nama" required error={touched.nama ? errors.nama : undefined}>
        <Input {...getFieldProps('nama')} placeholder="Nama..." />
      </FormField>

      <FormField name="email" label="Email" required error={touched.email ? errors.email : undefined}>
        <Input {...getFieldProps('email')} type="email" />
      </FormField>

      <Button type="submit" isLoading={isSubmitting}>Simpan</Button>
      <Button type="button" variant="outline" onClick={reset}>Reset</Button>
    </form>
  );
}`}</CodeBlock>

        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">useFormValidation Props</h3>
        <PropsTable rows={[
          ['schema', 'yup.ObjectSchema<T>', '—'],
          ['initialValues', 'T', '—'],
          ['onSubmit', '(values: T) => void | Promise', '—'],
          ['validateOnChange', 'boolean', 'false'],
        ]} />

        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-4">Return Values</h3>
        <PropsTable rows={[
          ['values', 'T', 'Current form values'],
          ['errors', 'Partial<Record<keyof T, string>>', 'Validation errors'],
          ['touched', 'Partial<Record<keyof T, boolean>>', 'Touched fields'],
          ['isSubmitting', 'boolean', 'Submit in progress'],
          ['isValid', 'boolean', 'No errors'],
          ['handleChange', '(field) => onChange handler', '—'],
          ['handleBlur', '(field) => onBlur handler', '—'],
          ['handleSubmit', '(e?) => Promise<void>', '—'],
          ['getFieldProps', '(field) => { value, onChange, onBlur, error }', '—'],
          ['setValue', '(field, value) => void', '—'],
          ['reset', '() => void', '—'],
        ]} />

        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-4">FormField Props</h3>
        <PropsTable rows={[
          ['name', 'string', '—'],
          ['label', 'string', '—'],
          ['error', 'string', '—'],
          ['hint', 'string', '—'],
          ['required', 'boolean', 'false'],
          ['children', 'ReactNode', '—'],
        ]} />
      </CardContent>
    </Card>
  );
}

/* ─── Section Map (documented components) ─── */
const SECTION_MAP: Record<string, React.FC> = {
  button: ButtonSection,
  input: InputSection,
  card: CardSection,
  badge: BadgeSection,
  skeleton: SkeletonSection,
  modal: ModalSection,
  toast: ToastSection,
  errorfallback: ErrorFallbackSection,
  formfield: FormFieldSection,
  tutorial: TutorialSection,
};

/* ═══════════════════════════════════════════════
   Main Page — auto-discovers components from file system
   ═══════════════════════════════════════════════ */
export function UIKitPage() {
  const location = useLocation();
  // Extract component name from /ui-kit/button → "button"
  const segments = location.pathname.split('/');
  const componentName = segments[segments.indexOf('ui-kit') + 1] || '';

  // Check if documented → show docs, else show placeholder
  if (componentName && componentName in SECTION_MAP) {
    const Section = SECTION_MAP[componentName];
    return <div className="w-full"><Section /></div>;
  }

  if (componentName && componentName !== '') {
    // Component exists in sidebar (discovered) but no docs yet
    const displayName = discoveredComponents.find(c => c.slug === componentName)?.name || componentName;
    return <div className="w-full"><UndocumentedSection name={displayName} /></div>;
  }

  return (
    <div className="w-full">
      <OverviewSection />
    </div>
  );
}

export default UIKitPage;

