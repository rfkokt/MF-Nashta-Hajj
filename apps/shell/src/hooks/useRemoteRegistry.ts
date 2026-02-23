import { useState, useEffect } from 'react';
import type { RemoteRegistry } from '../types/remote-registry';

const REGISTRY_URL = '/remotes.json';

let cachedRegistry: RemoteRegistry | null = null;

/**
 * Fetches the remote registry from /remotes.json.
 * Cached after first load — no duplicate fetches.
 */
export async function fetchRemoteRegistry(): Promise<RemoteRegistry> {
  if (cachedRegistry) return cachedRegistry;

  const response = await fetch(REGISTRY_URL);
  if (!response.ok) {
    throw new Error(`Failed to load remote registry: ${response.status}`);
  }

  cachedRegistry = await response.json();
  return cachedRegistry!;
}

/**
 * React hook to access the remote registry.
 */
export function useRemoteRegistry() {
  const [registry, setRegistry] = useState<RemoteRegistry | null>(cachedRegistry);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(!cachedRegistry);

  useEffect(() => {
    if (cachedRegistry) {
      setRegistry(cachedRegistry);
      setIsLoading(false);
      return;
    }

    fetchRemoteRegistry()
      .then((data) => {
        setRegistry(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
        console.error('[RemoteRegistry] Failed to load:', err);
      });
  }, []);

  return { registry, error, isLoading };
}
