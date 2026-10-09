import React from 'react';

export default function ReadingLog({ books, readingProgress, onOpenBook }) {
  const booksInProgress = books.filter(
    (book) => (readingProgress[book.id]?.percentage ?? 0) > 0
  );

  return (
    <section className="mt-16 pt-10 border-t border-parchment-300/80 space-y-6" id="caderno">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-terracotta font-bold">
          Registro pessoal
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-ink mt-1">
          Seu progresso de leitura
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-charcoal-muted max-w-lg leading-relaxed mt-2">
          As posições são atualizadas enquanto você lê e ficam disponíveis neste dispositivo ou na sua conta Firebase.
        </p>
      </div>

      {booksInProgress.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-parchment-200 shadow-card-soft">
          <p className="font-serif text-lg text-slate-ink">Seu registro ainda está vazio.</p>
          <p className="text-sm text-charcoal-muted mt-1">
            Abra uma obra do acervo para começar a acompanhar sua leitura.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {booksInProgress.map((book) => {
            const percentage = Math.min(
              100,
              Math.max(0, Math.round(readingProgress[book.id].percentage))
            );

            return (
              <button
                key={book.id}
                type="button"
                onClick={() => onOpenBook(book.id)}
                className="text-left bg-white rounded-2xl p-4 border border-parchment-200 shadow-card-soft hover:shadow-card-hover transition-all"
              >
                <span className="block text-[11px] text-charcoal-muted truncate">
                  {book.author} · {book.year}
                </span>
                <span className="block font-display font-bold text-slate-ink mt-1 truncate">
                  {book.title}
                </span>
                <span className="flex justify-between items-center text-xs mt-4">
                  <span className="text-charcoal-muted">Progresso</span>
                  <span className="font-mono font-semibold text-terracotta">{percentage}%</span>
                </span>
                <span
                  className="block w-full h-1.5 rounded-full bg-parchment-200 overflow-hidden mt-2"
                  role="progressbar"
                  aria-label={`Progresso em ${book.title}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percentage}
                >
                  <span
                    className="block h-full bg-terracotta rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
