import { useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE as string;

export function useApi() {
  // GET genérico
  const get = useCallback(async <T>(url: string): Promise<T> => {
    try {
      const res = await fetch(`${API_BASE}${url}`);
      if (!res.ok) throw new Error('Error de red');
      return await res.json();
    } catch (e) {
      throw new Error('No se pudo conectar al servidor.', { cause: e });
    }
  }, []);

  // POST genérico
  const post = useCallback(async <T, B = unknown>(url: string, body: B): Promise<T> => {
    try {
      const res = await fetch(`${API_BASE}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Error de red');
      return await res.json();
    } catch (e) {
      throw new Error('No se pudo conectar al servidor.', { cause: e });
    }
  }, []);

  return { get, post };
}
