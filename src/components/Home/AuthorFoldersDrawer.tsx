import React, { useState } from 'react';
import { AuthorProfile, BookItem } from '../../data/booksData';
import { BookCard } from './BookCard';
import { FolderArchive, Quote, Sparkles, FolderOpen, History } from 'lucide-react';

interface AuthorFoldersDrawerProps {
  authors: AuthorProfile[];
  books: BookItem[];
  selectedAuthorId: string;
  onSelectAuthor: (authorId: string) => void;
  onOpenBook: (book: BookItem) => void;
  readingProgress: Record<string, { progressPercent: number }>;
}

export const AuthorFoldersDrawer: React.FC<AuthorFoldersDrawerProps> = ({
  authors,
  books,
  selectedAuthorId,
  onSelectAuthor,
  onOpenBook,
  readingProgress,
}) => {
  const selectedAuthor =
    authors.find((a) => a.id === selectedAuthorId) || authors[0];

  const authorBooks = books.filter((b) => b.authorId === selectedAuthor.id);

  return (
    <section className="space-y-8">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[rgba(15,23,42,0.08)]">
        <div>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A5B32] block mb-1">
            SISTEMA DE ARQUIVAMENTO FÍSICO
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Fichário de Pastas dos Autores
          </h2>
          <p className="font-cormorant italic text-sm sm:text-base text-[#64748B] mt-1">
            Pastas com abas escalonadas inspiradas em gaveteiros de bibliotecas clássicas. Clique na aba para puxar o dossiê.
          </p>
        </div>

        <span className="font-mono text-xs font-bold text-[#0F172A] bg-[#FAF8F5] border border-[rgba(15,23,42,0.08)] px-3 py-1 rounded-full shadow-xs">
          {authors.length} Autores Catalogados
        </span>
      </div>

      {/* GAVETA DE PASTAS FÍSICAS (Estilo arquivo clássico com abas) */}
      <div className="bg-[#0F172A] rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-[#1E293B]">
        {/* Plaqueta de metal da gaveta */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#334155]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#B8860B]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E2E8F0] font-bold">
              GAVETA N° 1 · CLÁSSICOS BRASILEIROS DO SÉCULO XIX &amp; XX
            </span>
          </div>
          <span className="font-sans text-[10px] uppercase font-bold text-[#94A3B8]">
            Acervo Aberto
          </span>
        </div>

        {/* Abas Escalonadas das Pastas */}
        <div className="flex flex-wrap items-end gap-1.5 sm:gap-2 pt-1 pb-4">
          {authors.map((author, index) => {
            const isSelected = author.id === selectedAuthor.id;
            const count = books.filter((b) => b.authorId === author.id).length;

            return (
              <button
                key={author.id}
                onClick={() => onSelectAuthor(author.id)}
                className={`group relative text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'z-20 translate-y-0 scale-100'
                    : 'z-10 translate-y-1 hover:translate-y-0 opacity-75 hover:opacity-100'
                }`}
                style={{ flex: '1 1 150px', minWidth: '130px' }}
              >
                <div
                  className={`p-3 rounded-t-xl border-t-2 border-x-2 transition-all shadow-md ${
                    isSelected
                      ? 'bg-[#FAF8F5] border-[#B8860B] text-[#0F172A]'
                      : 'bg-[#1E293B] hover:bg-[#334155] border-[#475569] text-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#9A5B32] font-bold truncate">
                      {author.archiveCode.split('·')[0]}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isSelected
                          ? 'bg-[#0F172A] text-[#FAF8F5]'
                          : 'bg-[#0F172A]/80 text-[#94A3B8]'
                      }`}
                    >
                      {count} {count === 1 ? 'vol' : 'vols'}
                    </span>
                  </div>

                  <h4
                    className={`font-display text-xs sm:text-sm font-bold truncate ${
                      isSelected ? 'text-[#0F172A]' : 'text-[#FAF8F5]'
                    }`}
                  >
                    {author.shortName}
                  </h4>

                  <span className="block text-[10px] font-cormorant italic truncate mt-0.5 opacity-80">
                    {author.movement}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* CONTEÚDO DO DOSSIÊ DO AUTOR SELECIONADO (Dentro da Pasta) */}
        <div className="bg-[#FAF8F5] text-[#0F172A] rounded-xl p-6 sm:p-8 shadow-xl border border-[#CBD5E1]">
          {/* Faixa Superior do Dossiê */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider font-bold bg-[#F1E9DC] text-[#784620] rounded border border-[#DFD1BE]">
                {selectedAuthor.archiveCode}
              </span>
              <span className="font-cormorant italic text-sm text-[#64748B]">
                {selectedAuthor.lifespan} ({selectedAuthor.role})
              </span>
            </div>

            <span className="text-xs font-sans font-semibold text-[#0F172A] flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#B8860B]" />
              Edição Fac-Símile &amp; Texto Integral
            </span>
          </div>

          {/* Perfil do Autor: Retrato + Biografia + Citação */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative max-w-[200px] w-full bg-[#FFFFFF] p-2.5 rounded-xl border border-[rgba(15,23,42,0.08)] shadow-md">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#0F172A]">
                  <img
                    src={selectedAuthor.portraitUrl}
                    alt={selectedAuthor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                </div>
                <div className="text-center mt-2">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#9A5B32] font-bold">
                    Retrato Documental
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-9 space-y-4">
              <div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#C28251]">
                  {selectedAuthor.movement}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] mt-0.5">
                  {selectedAuthor.name}
                </h3>
              </div>

              <p className="font-reading text-sm sm:text-base text-[#475569] leading-relaxed">
                {selectedAuthor.bio}
              </p>

              <div className="bg-[#FAF4EB] border-l-3 border-[#C28251] p-3.5 rounded-r-md">
                <Quote className="w-4 h-4 text-[#C28251] mb-1" />
                <p className="font-cormorant italic text-sm sm:text-base text-[#0F172A]">
                  “{selectedAuthor.quote}”
                </p>
              </div>
            </div>
          </div>

          {/* Obras Registradas nesta Pasta */}
          <div className="pt-6 border-t border-[rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#B8860B]" />
                Obras Registradas nesta Pasta ({authorBooks.length})
              </h4>
              <span className="text-xs font-cormorant italic text-[#64748B]">
                Clique para abrir o leitor imersivo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {authorBooks.map((book) => {
                const prog = readingProgress[book.id]?.progressPercent || 0;
                return (
                  <BookCard
                    key={book.id}
                    book={book}
                    progressPercent={prog}
                    onOpenBook={onOpenBook}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
