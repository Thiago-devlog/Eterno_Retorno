/**
 * readingService.js
 * Persistência de progresso de leitura e última posição (CFI) no Firestore.
 *
 * Coleção: `progresso_leitura`
 * Documento: `{userId}_{bookId}` (chave composta para queries diretas sem índices)
 *
 * Schema do documento:
 * {
 *   userId: string,
 *   bookId: string,
 *   cfi: string,           // CFI da última posição no EPUB
 *   percentage: number,    // 0–100
 *   updatedAt: Timestamp,
 *   startedAt: Timestamp   // Criado apenas na primeira gravação
 * }
 */
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase.js';

const COLLECTION = 'progresso_leitura';

/**
 * Gera o ID do documento com chave composta userId + bookId.
 */
function progressDocId(userId, bookId) {
  return `${userId}_${bookId}`;
}

/**
 * Salva (ou atualiza) o progresso de leitura no Firestore e no cache local resiliente.
 * @param {string} userId    - uid do leitor (anônimo ou autenticado)
 * @param {string} bookId    - id do livro (ex: 'memorias-posthumas')
 * @param {string} cfi       - CFI exato da posição no EPUB
 * @param {number} percentage - Percentual lido (0–100)
 */
export async function saveReadingProgress(userId, bookId, cfi, percentage) {
  if (!userId || !bookId || !cfi) return;

  const key = `er_prog_${progressDocId(userId, bookId)}`;
  const localRecord = {
    userId,
    bookId,
    cfi,
    percentage: Math.round(percentage),
    updatedAt: new Date().toISOString()
  };

  // Salva no cache local imediatamente (zero latência e offline-first)
  try {
    localStorage.setItem(key, JSON.stringify(localRecord));
  } catch {}

  // Sincroniza com Cloud Firestore
  try {
    const docRef = doc(db, COLLECTION, progressDocId(userId, bookId));
    const snapshot = await getDoc(docRef);

    const payload = {
      userId,
      bookId,
      cfi,
      percentage: Math.round(percentage),
      updatedAt: serverTimestamp()
    };

    // Preserva startedAt na primeira gravação
    if (!snapshot.exists()) {
      payload.startedAt = serverTimestamp();
    }

    await setDoc(docRef, payload, { merge: true });
  } catch (err) {
    // Silencioso: falha de rede não interrompe a leitura
    console.warn('[Eterno Retorno] Progresso salvo localmente (Firestore offline/não configurado):', err.message);
  }
}

/**
 * Resgata o progresso salvo de um livro para um leitor (Firestore com fallback local).
 * @param {string} userId
 * @param {string} bookId
 * @returns {Promise<{ cfi: string, percentage: number, updatedAt: Date } | null>}
 */
export async function getReadingProgress(userId, bookId) {
  if (!userId || !bookId) return null;

  const key = `er_prog_${progressDocId(userId, bookId)}`;
  let localData = null;

  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      localData = {
        cfi: parsed.cfi,
        percentage: parsed.percentage ?? 0,
        updatedAt: parsed.updatedAt ? new Date(parsed.updatedAt) : null,
        startedAt: null
      };
    }
  } catch {}

  try {
    const docRef = doc(db, COLLECTION, progressDocId(userId, bookId));
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      const firestoreData = {
        cfi: data.cfi,
        percentage: data.percentage ?? 0,
        updatedAt: data.updatedAt?.toDate?.() ?? null,
        startedAt: data.startedAt?.toDate?.() ?? null
      };

      // Atualiza cache local com a versão mais recente da nuvem
      try {
        localStorage.setItem(key, JSON.stringify({
          userId,
          bookId,
          cfi: firestoreData.cfi,
          percentage: firestoreData.percentage,
          updatedAt: firestoreData.updatedAt?.toISOString() || new Date().toISOString()
        }));
      } catch {}

      return firestoreData;
    }
  } catch (err) {
    console.warn('[Eterno Retorno] Usando progresso em cache local:', err.message);
  }

  return localData;
}

/**
 * Retorna o progresso de todos os livros de um leitor.
 * Usado para o card "Continuar Lendo" na Home.
 * @param {string} userId
 * @param {string[]} bookIds - Lista de IDs dos livros do acervo
 * @returns {Promise<Record<string, { cfi, percentage, updatedAt }>>}
 */
export async function getAllReadingProgress(userId, bookIds) {
  if (!userId || !bookIds?.length) return {};

  const results = {};

  await Promise.all(
    bookIds.map(async (bookId) => {
      const progress = await getReadingProgress(userId, bookId);
      if (progress) {
        results[bookId] = progress;
      }
    })
  );

  return results;
}

/**
 * Retorna o livro lido mais recentemente para um leitor.
 * @param {string} userId
 * @param {string[]} bookIds
 * @returns {Promise<{ bookId: string, cfi: string, percentage: number, updatedAt: Date } | null>}
 */
export async function getLastReadBook(userId, bookIds) {
  if (!userId || !bookIds?.length) return null;

  const allProgress = await getAllReadingProgress(userId, bookIds);

  let latest = null;

  Object.entries(allProgress).forEach(([bookId, data]) => {
    if (!latest || (data.updatedAt && data.updatedAt > latest.updatedAt)) {
      latest = { bookId, ...data };
    }
  });

  return latest;
}

