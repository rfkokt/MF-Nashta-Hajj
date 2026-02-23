import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  server: {
    port: 4001,
    origin: 'http://localhost:4001',
  },
  preview: {
    port: 4101,
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'authMfe',
      filename: 'remoteEntry.js',
      manifest: true,
      dts: false,
      exposes: {
        './LoginPage': './src/pages/Login.tsx',
        './RegisterPage': './src/pages/Register.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        'react/': { singleton: true },
        'react-dom/': { singleton: true },
      },
    }),
    visualizer({ open: false, filename: 'dist/apps/auth-mfe/stats.html', gzipSize: true, brotliSize: true })
  ] as any,
  build: {
    target: 'chrome89',
    modulePreload: false,
    minify: true,
  },
});
