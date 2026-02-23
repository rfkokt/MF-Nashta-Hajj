import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@nashta/ui-kit';

export function DocsSecuritySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400 text-sm font-bold">12</span>
          Security Best Practices
        </CardTitle>
        <CardDescription>Standar keamanan wajib untuk semua MFE</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">✅ WAJIB</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Access token HANYA di memory (Zustand)</li>
              <li>Gunakan <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">apiClient</code> dari shared-api</li>
              <li>Form validasi pakai schema (Yup/Zod)</li>
              <li>Internal packages pakai scope <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">@nashta/</code></li>
              <li>Jalankan <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">pnpm audit</code> — 0 High/Critical</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ DILARANG</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Simpan token di localStorage / cookie</li>
              <li>Buat Axios instance sendiri</li>
              <li>Gunakan <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">dangerouslySetInnerHTML</code></li>
              <li>Hardcode URL remote di config</li>
              <li>Redirect tanpa validasi allowlist</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
