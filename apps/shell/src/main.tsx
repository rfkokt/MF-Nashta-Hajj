import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { initMonitoring, ErrorBoundary } from '@nashta/shared-monitoring';
import '@nashta/shared-types'; // Initializes i18n
import './index.css';

// Initialize Sentry before the app renders
initMonitoring();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div className="p-4 text-rose-600 bg-rose-50 rounded-md">
          Terjadi Kesalahan Aplikasi. Tim kami sudah dinotifikasi.
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
