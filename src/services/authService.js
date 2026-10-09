/**
 * authService.js
 * Login anônimo silencioso — garante que todo leitor receba um uid
 * único sem formulários, persistido na sessão do navegador.
 */
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

/**
 * Gera ou recupera um UID anônimo local resiliente para contingência offline.
 */
function getLocalFallbackUser() {
  const KEY = 'er_anonymous_uid';
  let uid = localStorage.getItem(KEY);
  if (!uid) {
    uid = 'anon_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem(KEY, uid);
  }
  return { uid, isAnonymous: true, isLocalFallback: true };
}

/**
 * Inicializa a sessão anônima do leitor.
 * Retorna uma Promise que resolve com o User do Firebase ou usuário anônimo local.
 * Se o usuário já está autenticado (sessão persistida), não cria outro.
 */
export function initSilentAuth() {
  return new Promise((resolve) => {
    // onAuthStateChanged dispara imediatamente com o usuário atual (ou null)
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe(); // Remove o listener após a primeira chamada

        if (user) {
          // Sessão já existente no Firebase — reutiliza o uid
          resolve(user);
        } else {
          // Nenhuma sessão: cria identidade anônima no Firebase
          try {
            const credential = await signInAnonymously(auth);
            resolve(credential.user);
          } catch (err) {
            console.warn('[Eterno Retorno] Firebase Auth não configurado ou indisponível. Utilizando sessão anônima local resiliente.');
            resolve(getLocalFallbackUser());
          }
        }
      },
      (err) => {
        console.warn('[Eterno Retorno] Erro no listener do Firebase Auth:', err);
        resolve(getLocalFallbackUser());
      }
    );
  });
}

/**
 * Observa mudanças no estado de autenticação.
 * Útil para componentes que precisam reagir ao uid.
 * @param {(user: User | null) => void} callback
 * @returns {() => void} Função de cancelamento (unsubscribe)
 */
export function onAuthChanged(callback) {
  return onAuthStateChanged(auth, callback);
}

