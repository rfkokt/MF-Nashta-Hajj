import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@nashta/ui-kit';
import { CodeBlock } from '../components/CodeBlock';

export function DocsDynamicRemotesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-400 text-sm font-bold">
              7a
            </span>
            Dynamic Remotes
          </CardTitle>
          <CardDescription>Module Federation berbasis konfigurasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            Shell membaca daftar MFE dari{' '}
            <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">
              remotes.json
            </code>{' '}
            saat runtime — bukan hardcoded.
          </p>
          <p>
            Tim infra bisa repoint URL (misal ke versi MFE lama saat error) tanpa build ulang Shell.
          </p>
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
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-400 text-sm font-bold">
              7b
            </span>
            Dynamic Menu dari Backend
          </CardTitle>
          <CardDescription>Sidebar navigasi dari API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            Menu sidebar di-fetch dari{' '}
            <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">
              GET /api/v1/menus
            </code>
            , dengan fallback ke mock data.
          </p>
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
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              💡 Selalu sediakan mock data sebagai fallback di{' '}
              <code className="text-xs bg-blue-100 dark:bg-blue-900/50 px-1 rounded">
                mock-menus.ts
              </code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
