import React from 'react';
import BookCard from './BookCard.jsx';

export default function BookGrid({ books, onSelectBook }) {
  return (
    <section className="py-8">
      <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-parchment-border/80">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-ink">
            Acervo Machado de Assis
          </h2>
          <p className="text-xs font-sans text-slate-ink-muted mt-1">
            Edições integrais restauradas para leitura imersiva e anotações.
          </p>
        </div>
        <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-slate-ink-muted">
          {books.length} Obras Disponíveis
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {books.map((book) => (
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

