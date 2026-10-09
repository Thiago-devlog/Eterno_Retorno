/**
 * useAuth.js
 * Hook React que inicializa o login silencioso e expõe o uid do leitor.
 * Singleton: a autenticação ocorre uma única vez por sessão de app.
 */
import { useState, useEffect } from 'react';
import { initSilentAuth, onAuthChanged } from '../services/authService.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // Dispara o login anônimo silencioso ao montar
    initSilentAuth()
      .then((u) => {
        setUser(u);
        setAuthReady(true);
      })
      .catch(() => {
        // Sem Firebase configurado em dev: permite uso offline
        setAuthReady(true);
      });

    // Mantém sincronizado se o estado mudar (ex: reload de sessão)
    const unsubscribe = onAuthChanged((u) => {
      if (u) setUser(u);
    });

    return unsubscribe;
  }, []);

  return { user, uid: user?.uid ?? null, authReady };
}

