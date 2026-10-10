/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { AUTHORS_DATABASE, BOOKS_DATABASE, BookItem } from './data/booksData';
import { AuthorFilingCabinet } from './components/AuthorFilingCabinet';
import { MinimalistReader } from './components/Reader/MinimalistReader';
import { BookEditorialModal } from './components/Modal/BookEditorialModal';
import { Author, Book } from './types/library';

const mapBookItemToLibraryBook = (book: BookItem): Book => ({
  id: book.id,
  authorId: book.authorId,
  title: book.title,
  originalYear: book.year,
  movement: book.category,
  subgenre: book.category,
  quote: book.tagline,
  synopsis: book.description,
  coverBg: book.coverBg,
  coverBorderColor: book.coverBorder,
  coverAccent: book.coverAccent,
  coverStyle: 'facsimile-cream',
  editionLabel: book.editionLabel,
  chapters: book.chapters.map((chapter) => ({
    ...chapter,
    subtitle: chapter.title,
  })),
  pagesCount: book.pagesCount,
});

export default function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'amber'>(() => {
    const saved = localStorage.getItem('eterno_theme_mode');
    if (saved === 'light' || saved === 'dark' || saved === 'amber') return saved;
    return 'light';
  });

  const [selectedAuthorId, setSelectedAuthorId] = useState<string>('machado-de-assis');

  useEffect(() => {
    localStorage.setItem('eterno_theme_mode', themeMode);
  }, [themeMode]);

  const [selectedBookForModal, setSelectedBookForModal] = useState<BookItem | null>(null);
  const [activeReaderBook, setActiveReaderBook] = useState<BookItem | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('eterno_favorites_acrylic');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['memorias-postumas', 'quincas-borba'];
      }
    }
    return ['memorias-postumas', 'quincas-borba'];
  });

  useEffect(() => {
    localStorage.setItem('eterno_favorites_acrylic', JSON.stringify(favorites));
  }, [favorites]);

  const [readingProgress, setReadingProgress] = useState<
    Record<string, { progressPercent: number; chapterIndex?: number; lastLocation?: string }>
  >(() => {
    const saved = localStorage.getItem('eterno_reading_progress_acrylic');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          'memorias-postumas': {
            progressPercent: 48,
            chapterIndex: 1,
            lastLocation: 'Capítulo II',
          },
          'quincas-borba': {
            progressPercent: 72,
            chapterIndex: 0,
            lastLocation: 'Capítulo IV',
          },
        };
      }
    }

    return {
      'memorias-postumas': {
        progressPercent: 48,
        chapterIndex: 1,
        lastLocation: 'Capítulo II',
      },
      'quincas-borba': {
        progressPercent: 72,
        chapterIndex: 0,
        lastLocation: 'Capítulo IV',
      },
    };
  });

  useEffect(() => {
    localStorage.setItem('eterno_reading_progress_acrylic', JSON.stringify(readingProgress));
  }, [readingProgress]);

  const libraryAuthors = useMemo<Author[]>(() =>
    AUTHORS_DATABASE.map((author) => {
      const authorBooks = BOOKS_DATABASE.filter((book) => book.authorId === author.id).map(mapBookItemToLibraryBook);

      return {
        id: author.id,
        name: author.name,
        shortName: author.shortName,
        lifespan: author.lifespan,
        movement: author.movement,
        city: author.archiveCode.includes('JAL') ? 'Niterói' : author.archiveCode.includes('CAL') ? 'Salvador' : author.archiveCode.includes('AAZ') ? 'Rio de Janeiro' : author.archiveCode.includes('RPO') ? 'Rio de Janeiro' : 'Rio de Janeiro',
        archiveCode: author.archiveCode,
        bio: author.bio,
        quote: author.quote,
        portraitUrl: author.portraitUrl,
        folderColor: '#8C2D19',
        tabLabel: author.shortName,
        books: authorBooks,
      };
    }),
  []);

  const handleInspectBook = (book: Book) => {
    const matchedBook = BOOKS_DATABASE.find((item) => item.id === book.id) || null;
    setSelectedBookForModal(matchedBook);
  };

  const handleSelectAuthor = (authorId: string) => {
    setSelectedAuthorId(authorId);
  };

  const handleStartReadingFromModal = (book: BookItem) => {
    setSelectedBookForModal(null);
    setActiveReaderBook(book);
    const savedChapter = readingProgress[book.id]?.chapterIndex || 0;
    setActiveChapterIndex(savedChapter);
  };

  const handleToggleMarkAsRead = (bookId: string) => {
    setReadingProgress((prev) => {
      const currentProg = prev[bookId]?.progressPercent || 0;
      const isAlreadyCompleted = currentProg >= 100;
      return {
        ...prev,
        [bookId]: {
          chapterIndex: 0,
          progressPercent: isAlreadyCompleted ? 0 : 100,
          lastLocation: isAlreadyCompleted ? 'Não iniciado' : 'Obra Concluída',
        },
      };
    });
  };

  const handleToggleFavorite = (bookId: string) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const handleCloseReader = () => {
    setActiveReaderBook(null);
  };

  const handleUpdateProgress = (
    bookId: string,
    chapterIndex: number,
    progressPercent: number,
    locationText: string
  ) => {
    setReadingProgress((prev) => ({
      ...prev,
      [bookId]: {
        chapterIndex,
        progressPercent,
        lastLocation: locationText,
      },
    }));
  };

  const rootThemeStyles = {
    light: 'bg-[#F7F4EE] text-[#1F1C18]',
    dark: 'bg-[#2A2724] text-[#F7F4EE]',
    amber: 'bg-[#F7F4EE] text-[#1F1C18]',
  }[themeMode];

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-[#D9C2A5] selection:text-[#1F1C18] transition-colors duration-300 ${rootThemeStyles}`}>
      <AuthorFilingCabinet
        authors={libraryAuthors}
        selectedAuthorId={selectedAuthorId}
        onSelectAuthor={handleSelectAuthor}
        onOpenBook={handleInspectBook}
        readingProgress={readingProgress}
      />

      <BookEditorialModal
        book={selectedBookForModal}
        isOpen={Boolean(selectedBookForModal)}
        progressPercent={
          selectedBookForModal ? readingProgress[selectedBookForModal.id]?.progressPercent || 0 : 0
        }
        isFavorite={selectedBookForModal ? favorites.includes(selectedBookForModal.id) : false}
        onClose={() => setSelectedBookForModal(null)}
        onStartReading={handleStartReadingFromModal}
        onToggleMarkAsRead={handleToggleMarkAsRead}
        onToggleFavorite={handleToggleFavorite}
      />

      {activeReaderBook && (
        <MinimalistReader
          book={activeReaderBook}
          initialChapterIndex={activeChapterIndex}
          initialProgressPercent={readingProgress[activeReaderBook.id]?.progressPercent || 0}
          themeMode={themeMode}
          onToggleTheme={setThemeMode}
          onClose={handleCloseReader}
          onUpdateProgress={handleUpdateProgress}
        />
      )}
    </div>
  );
}
