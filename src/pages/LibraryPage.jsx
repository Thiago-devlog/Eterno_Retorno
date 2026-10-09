import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../components/Library/HeroBanner.jsx';
import SearchBar from '../components/Library/SearchBar.jsx';
import ReadingLog from '../components/Library/ReadingLog.jsx';
import LibraryHeader from '../components/Library/LibraryHeader.jsx';
import ContinueReadingCard from '../components/Library/ContinueReadingCard.jsx';
import QuickAccessCatalog from '../components/Library/QuickAccessCatalog.jsx';
import FeaturedAuthor from '../components/Library/FeaturedAuthor.jsx';
import CanonicalCatalog from '../components/Library/CanonicalCatalog.jsx';

export default function LibraryPage({ books, lastRead, readingProgress, onOpenBook }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  const handleSearchSubmit = () => {
    const query = searchQuery.trim().toLocaleLowerCase('pt-BR');
    if (!query) {
      setSearchMessage('Digite o título de uma obra ou o nome de um autor.');
      return;
    }

    const match = books.find((book) =>
      book.title.toLocaleLowerCase('pt-BR').includes(query) ||
      book.author.toLocaleLowerCase('pt-BR').includes(query)
    );

    if (!match) {
      setSearchMessage('Nenhuma obra encontrada no acervo.');
      return;
    }

    setSearchMessage('');
    onOpenBook(match.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto min-h-screen max-w-[1440px] bg-[#f7f5f0] px-4 py-5 font-sans text-slate-ink antialiased selection:bg-terracotta/25 selection:text-slate-ink sm:px-6 lg:px-10 lg:py-7"
    >
      <LibraryHeader />

      <ContinueReadingCard
        book={books.find((book) => book.id === lastRead?.bookId)}
        progress={lastRead?.percentage}
        onOpenBook={onOpenBook}
      />

      <main className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12" id="inicio">
        <div className="space-y-6 lg:col-span-5">
          <HeroBanner />
          <SearchBar
            searchQuery={searchQuery}
            searchMessage={searchMessage}
            onSearchChange={(query) => {
              setSearchQuery(query);
              setSearchMessage('');
            }}
            onSearchSubmit={handleSearchSubmit}
          />
          <QuickAccessCatalog books={books} onOpenBook={onOpenBook} />
        </div>

        <div className="space-y-8 lg:col-span-7">
          <FeaturedAuthor />
          <CanonicalCatalog books={books} onOpenBook={onOpenBook} />
        </div>
      </main>

      <ReadingLog books={books} readingProgress={readingProgress} onOpenBook={onOpenBook} />

      <footer className="mt-16 border-t border-parchment-300/60 pb-8 pt-10 text-xs text-charcoal-muted">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold uppercase tracking-widest text-slate-ink">
              Eterno Retorno
            </span>
            <span aria-hidden="true">·</span>
            <span>Acervo Histórico e Biblioteca Aberta do Século XIX</span>
          </div>
          <a
            className="inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-terracotta transition-colors hover:text-slate-ink"
            href="#inicio"
          >
            Voltar ao topo ↑
          </a>
        </div>
      </footer>
    </motion.div>
  );
}
