import React from 'react';
import { motion } from 'framer-motion';
import AuthorFolderDrawer from '../components/Library/AuthorFolderDrawer.jsx';
import ReadingLog from '../components/Library/ReadingLog.jsx';
import LibraryHeader from '../components/Library/LibraryHeader.jsx';
import ContinueReadingCard from '../components/Library/ContinueReadingCard.jsx';
import CanonicalCatalog from '../components/Library/CanonicalCatalog.jsx';

export default function LibraryPage({ books, lastRead, readingProgress, onOpenBook }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto min-h-screen max-w-[1440px] bg-paper-canvas px-4 py-5 font-sans-label text-charcoal antialiased selection:bg-sepia-accent/25 selection:text-charcoal sm:px-6 lg:px-10 lg:py-7"
    >
      <LibraryHeader />

      <ContinueReadingCard
        book={books.find((book) => book.id === lastRead?.bookId)}
        progress={lastRead?.percentage}
        onOpenBook={onOpenBook}
      />

      <main className="space-y-12" id="inicio">
        <AuthorFolderDrawer books={books} onOpenBook={onOpenBook} />
        <CanonicalCatalog books={books} onOpenBook={onOpenBook} />
      </main>

      <ReadingLog books={books} readingProgress={readingProgress} onOpenBook={onOpenBook} />

      <footer className="mt-16 border-t border-[#D8CEBC] pb-8 pt-10 text-xs text-[#76684F]">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-serif-title font-bold uppercase tracking-widest text-charcoal">
              Eterno Retorno
            </span>
            <span aria-hidden="true">·</span>
            <span>Biblioteca Clássica · Arquivo literário brasileiro</span>
          </div>
          <a
            className="inline-block font-sans-label text-[10px] font-semibold uppercase tracking-wider text-sepia-accent transition-colors hover:text-charcoal"
            href="#inicio"
          >
            Voltar ao topo ↑
          </a>
        </div>
      </footer>
    </motion.div>
  );
}
