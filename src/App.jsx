import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EpubReader from './components/Reader/EpubReader.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import { CANONICAL_BOOKS } from './data/books.js';
import { useAuth } from './hooks/useAuth.js';
import { getAllReadingProgress } from './services/readingService.js';

export default function App() {
  const { uid, authReady } = useAuth();
  const [selectedBook, setSelectedBook] = useState(null);
  const [lastRead, setLastRead] = useState(null);
  const [readingProgress, setReadingProgress] = useState({});

  useEffect(() => {
    if (!uid || !authReady) return undefined;

    let isCurrent = true;
    setLastRead(null);
    setReadingProgress({});

    const bookIds = CANONICAL_BOOKS.map((book) => book.id);
    getAllReadingProgress(uid, bookIds)
      .then((result) => {
        if (!isCurrent) return;

        setReadingProgress((current) => {
          const merged = { ...result };
          Object.entries(current).forEach(([bookId, progress]) => {
            const currentTime = progress.updatedAt?.getTime() ?? 0;
            const loadedTime = merged[bookId]?.updatedAt?.getTime() ?? -1;
            if (currentTime > loadedTime) merged[bookId] = progress;
          });
          return merged;
        });

        const latest = Object.entries(result).reduce((current, [bookId, progress]) => {
          const updatedAt = progress.updatedAt?.getTime() ?? 0;
          const currentUpdatedAt = current?.updatedAt?.getTime() ?? -1;
          return !current || updatedAt > currentUpdatedAt
            ? { bookId, ...progress }
            : current;
        }, null);

        setLastRead((current) => {
          const currentTime = current?.updatedAt?.getTime() ?? 0;
          const loadedTime = latest?.updatedAt?.getTime() ?? -1;
          if (current && currentTime > loadedTime) return current;
          return latest && latest.percentage > 0 ? latest : null;
        });
      })
      .catch((err) => {
        console.error('[Eterno Retorno] Não foi possível carregar o histórico de leitura:', err);
      });

    return () => {
      isCurrent = false;
    };
  }, [authReady, uid]);

  const handleLocationChanged = (cfi, percentage) => {
    if (!selectedBook) return;

    const progress = {
      cfi,
      percentage,
      updatedAt: new Date()
    };

    setLastRead({ bookId: selectedBook.id, ...progress });
    setReadingProgress((current) => ({
      ...current,
      [selectedBook.id]: progress
    }));
  };

  const openBookById = (bookId) => {
    const book = CANONICAL_BOOKS.find((item) => item.id === bookId);
    if (book) setSelectedBook(book);
  };

  return (
    <AnimatePresence mode="wait">
      {selectedBook ? (
        <EpubReader
          key={selectedBook.id}
          book={selectedBook}
          uid={uid}
          authReady={authReady}
          onClose={() => setSelectedBook(null)}
          onLocationChanged={handleLocationChanged}
          onTextSelected={(text, cfiRange) => {
            console.log(`[Eterno Retorno] Anotação selecionada: "${text}" no range: ${cfiRange}`);
          }}
        />
      ) : (
        <LibraryPage
          key="library-canvas"
          books={CANONICAL_BOOKS}
          lastRead={lastRead}
          readingProgress={readingProgress}
          onOpenBook={openBookById}
        />
      )}
    </AnimatePresence>
  );
}
