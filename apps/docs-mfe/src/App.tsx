import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@my-saas/ui-kit';

export function App() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          Platform Architecture
        </h1>
        <p className="text-lg text-neutral-500">
          Nashta Hajj Micro-Frontend Documentation & Guidelines
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary-100 bg-primary-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-primary-100 rounded-lg text-primary-600">🏗️</span>
              Project Structure
            </CardTitle>
            <CardDescription>How the monorepo is organized</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Apps (Micro-Frontends)</h3>
              <ul className="space-y-2 text-sm text-neutral-600 list-disc ml-4">
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">shell</code> - Host app (Port 4000). Manages layout & routing.</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">auth-mfe</code> - Auth domain (Port 4001). Pre-loaded remote.</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">business-mfe</code> - Example remote (Port 4002).</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">docs-mfe</code> - This documentation app (Port 4003).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Libs (Shared)</h3>
              <ul className="space-y-2 text-sm text-neutral-600 list-disc ml-4">
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">ui-kit</code> - Shared React/Tailwind v4 components.</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">shared-types</code> - Global Zustand stores and TypeScript models.</li>
                <li><code className="text-primary-700 bg-primary-50 px-1 rounded">shared-api</code> - Protected Axios instances.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-2 bg-blue-100 rounded-lg text-blue-600">⚡</span>
              Local Development
            </CardTitle>
            <CardDescription>Commands to run the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-neutral-300">
              <span className="text-neutral-500"># Run everything</span><br/>
              <span className="text-primary-400">pnpm</span> nx run-many --target=serve --all --parallel<br/><br/>
              <span className="text-neutral-500"># Run specific apps</span><br/>
              <span className="text-primary-400">pnpm</span> nx run-many --target=serve --projects=shell,auth-mfe --parallel
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 rounded-lg text-emerald-600">🚀</span>
            Creating a new MFE
          </CardTitle>
          <CardDescription>We have automated MFE generation to save time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-900">1. Run the Generator CLI</h3>
            <p className="text-sm text-neutral-600">This instantly scaffolds the Vite configs, Module Federation plugins, Tailwind v4, and React setup.</p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm text-neutral-300">
              <span className="text-primary-400">pnpm</span> nx g @my-saas/tools:mfe &lt;name&gt; --port=&lt;port&gt;
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-900">2. Register in the Shell router.tsx</h3>
            <p className="text-sm text-neutral-600">The module registry is automated, but you still must add the lazy loaded route to the AppRouter.</p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm text-neutral-300 whitespace-pre">
              <span className="text-emerald-400">const</span> RemoteName = lazy(() {"=>"} import(<span className="text-amber-300">'namemfe/App'</span>));<br/>
              <br/>
              &lt;Route path=<span className="text-amber-300">"name/*"</span> element={"{"}&lt;RemoteLoader&gt;&lt;RemoteName /&gt;&lt;/RemoteLoader&gt;{"}"} /&gt;
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
