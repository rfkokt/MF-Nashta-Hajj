import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@nashta/ui-kit';
import { CodeBlock } from '../components/CodeBlock';

export function DocsEnvDarkModeSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-100 dark:bg-lime-900 text-lime-700 dark:text-lime-400 text-sm font-bold">
              11a
            </span>
            Environment Variables
          </CardTitle>
          <CardDescription>Konfigurasi .env per environment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            Semua variabel wajib prefix{' '}
            <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">
              VITE_
            </code>
            .
          </p>
          <CodeBlock
            language="bash"
            codeString={`# .env.development
VITE_AUTH_MFE_URL=http://localhost:4001
VITE_API_BASE_URL=http://localhost:4003

# .env.production
VITE_AUTH_MFE_URL=https://auth.nashta.com
VITE_API_BASE_URL=https://api.nashta.com`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 text-sm font-bold">
              11b
            </span>
            Dark Mode
          </CardTitle>
          <CardDescription>Toggle tema gelap/terang</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            Class-based dark mode. Toggle menambah/menghapus{' '}
            <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">
              .dark
            </code>{' '}
            pada &lt;html&gt;.
          </p>
          <p>
            <strong>Prioritas:</strong> User preference → System preference → Default (light).
          </p>
          <p>
            User preference tersimpan di{' '}
            <code className="text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-1 rounded">
              localStorage
            </code>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
