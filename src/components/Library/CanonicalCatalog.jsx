import React from 'react';
import BookCard from './BookCard.jsx';

export default function CanonicalCatalog({ books, onOpenBook }) {
  return (
    <section id="obras">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-ink">Obras Canônicas</h2>
          <p className="font-cormorant text-sm italic text-charcoal-muted">
            Volumes integrais em edições digitais cuidadas
          </p>
        </div>
        <a
          className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-terracotta transition-colors hover:text-slate-ink"
          href="#obras"
        >
          {books.length} obras
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {books.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
            onSelectBook={(selectedBook) => onOpenBook(selectedBook.id)}
          />
        ))}
      </div>
    </section>
  );
}
