import React, { useState } from 'react';
import BookCard from './BookCard.jsx';
import { Sparkles } from 'lucide-react';

export default function BookGrid({ books, onSelectBook }) {
  const [filter, setFilter] = useState('all');

  const filteredBooks = books.filter((book) => {
    if (filter === 'trilogia') {
      return ['memorias-posthumas', 'quincas-borba', 'dom-casmurro'].includes(book.id);
    }
    return true;
  });

  return (
    <section id="acervo" className="py-6 sm:py-10">
      {/* Título & Filtros do Acervo */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-parchment-border/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-terracotta mb-1">
            <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
            <span>Obras Canônicas Restauradas</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
            Edições Históricas de Machado de Assis
          </h2>
          <p className="text-xs font-sans text-slate-ink-muted mt-1 max-w-xl">
            Textos originais integrais com anotações de rodapé, notas críticas e paginação adaptativa.
          </p>
        </div>

        {/* Abas de Filtro Minimalistas */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-parchment-border shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs font-sans px-3 py-1.5 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'text-slate-ink-muted hover:text-slate-900'
            }`}
          >
            Todas as Obras ({books.length})
          </button>
          <button
            onClick={() => setFilter('trilogia')}
            className={`text-xs font-sans px-3 py-1.5 rounded-lg transition-all ${
              filter === 'trilogia'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'text-slate-ink-muted hover:text-slate-900'
            }`}
          >
            Trilogia Realista
          </button>
        </div>
      </div>

      {/* Grid de Livros (4 colunas no Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {filteredBooks.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onSelectBook={onSelectBook} 
          />
        ))}
      </div>
    </section>
  );
}
