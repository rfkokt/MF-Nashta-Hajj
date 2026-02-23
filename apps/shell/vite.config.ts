import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';

export default defineConfig({
  server: {
    port: 4000,
    origin: 'http://localhost:4000',
  },
  preview: {
    port: 4100,
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shell',
      dts: false,
      remotes: {
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
      },
    }),
  ],
  build: {
    target: 'chrome89',
    modulePreload: false,
    minify: true,
  },
});
