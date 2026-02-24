import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import type { RemoteRegistry } from './src/types/remote-registry';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type FederationRemoteConfig = {
  type: 'module';
  name: string;
  entry: string;
};

function loadFederationRemotes(): Record<string, FederationRemoteConfig> {
  const registryPath = path.resolve(__dirname, './public/remotes.json');

  try {
    const raw = fs.readFileSync(registryPath, 'utf-8');
    const registry = JSON.parse(raw) as RemoteRegistry;

    return Object.values(registry.remotes).reduce(
      (acc, remote) => {
        if (!remote.name || !remote.entry) {
          return acc;
        }

        acc[remote.name] = {
          type: 'module',
          name: remote.name,
          entry: remote.entry,
        };
        return acc;
      },
      {} as Record<string, FederationRemoteConfig>
    );
  } catch (error) {
    console.warn('[shell/vite.config] Failed to read remotes.json, using empty remotes map.', error);
    return {};
  }
}

const federationRemotes = loadFederationRemotes();

export default defineConfig({
  server: {
    port: 4000,
    origin: 'http://localhost:4000',
  },
  preview: {
    port: 4100,
  },
  resolve: {
    alias: {
      '@nashta/shared-types': path.resolve(__dirname, '../../libs/shared-types/src/index.ts'),
      '@nashta/shared-api': path.resolve(__dirname, '../../libs/shared-api/src/index.ts'),
      '@nashta/ui-kit': path.resolve(__dirname, '../../libs/ui-kit/src/index.ts'),
      '@nashta/shared-monitoring': path.resolve(
        __dirname,
        '../../libs/shared-monitoring/src/index.ts'
      ),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shell',
      dts: false,
      remotes: federationRemotes,
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        'react/': { singleton: true },
        'react-dom/': { singleton: true },
        'react-router': { singleton: true, requiredVersion: '^7.0.0' },
      },
    }),
    visualizer({
      open: false,
      filename: 'dist/apps/shell/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ] as any,
  build: {
    target: 'chrome89',
    modulePreload: false,
    minify: true,
    manifest: true,
  },
});
