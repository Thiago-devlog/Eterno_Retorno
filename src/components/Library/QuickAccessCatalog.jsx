import React from 'react';

export default function QuickAccessCatalog({ books, onOpenBook }) {
  return (
    <section className="space-y-3 rounded-2xl border border-parchment-200 bg-white p-5 shadow-card-soft">
      <h2 className="border-b border-parchment-200/60 pb-2 text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted">
        Acesso rápido ao acervo
      </h2>
      {books.map((book) => (
        <button
          key={book.id}
          type="button"
          onClick={() => onOpenBook(book.id)}
          className="group -mx-2 flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-parchment-100/70"
        >
          <span className="h-9 w-7 shrink-0 overflow-hidden rounded bg-parchment-200 shadow-sm">
            <img alt="" className="h-full w-full object-cover" src={book.cover} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xs font-semibold leading-tight text-slate-ink transition-colors group-hover:text-terracotta">
              {book.title}
            </span>
            <span className="block text-[11px] text-charcoal-muted">{book.author}</span>
          </span>
        </button>
      ))}
    </section>
  );
}
