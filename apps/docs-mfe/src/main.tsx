import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import { App } from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 p-4">
        <header className="mb-8 pl-4">
          <p className="text-sm text-neutral-500 font-medium">Standalone Mode (Port 4003)</p>
        </header>
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>
);
