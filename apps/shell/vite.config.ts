import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      remotes: {
        docsmfe: {
          type: 'module',
          name: 'docsmfe',
          entry: 'http://localhost:4003/mf-manifest.json',
        },

        authMfe: {
          type: 'module',
          name: 'authMfe',
          entry: 'http://localhost:4001/mf-manifest.json',
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        'react/': { singleton: true },
        'react-dom/': { singleton: true },
        'react-router': { singleton: true, requiredVersion: '^7.0.0' },
        'react-router-dom': { singleton: true, requiredVersion: '^7.0.0' },
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
  },
});
