import React from 'react';
import { motion } from 'framer-motion';

export default function ContinueReadingCard({ book, progress, onOpenBook }) {
  if (!book || !(progress > 0)) return null;

  const percentage = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group mb-6 flex w-full items-center gap-4 rounded-2xl border border-parchment-200 bg-white px-4 py-3 text-left shadow-card-soft transition-all duration-300 hover:border-amber-300/60 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
      onClick={() => onOpenBook(book.id)}
    >
      <span className="h-14 w-10 shrink-0 overflow-hidden rounded-lg border border-parchment-300 bg-parchment-100 shadow-sm transition-transform duration-300 group-hover:scale-105">
        <img src={book.cover} alt="" className="h-full w-full object-cover" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="mb-0.5 block text-[10px] font-mono uppercase tracking-wider text-charcoal-subtle">
          Continuar lendo
        </span>
        <span className="block truncate font-display text-sm font-bold leading-tight text-slate-ink transition-colors group-hover:text-terracotta">
          {book.title}
        </span>
        <span className="block truncate text-[11px] text-charcoal-muted">{book.author}</span>
        <span className="mt-1.5 block h-[2px] w-full overflow-hidden rounded-full bg-[#E2DCD5]">
          <span className="block h-full rounded-full bg-terracotta" style={{ width: `${percentage}%` }} />
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1 text-right">
        <span className="font-mono text-xs font-bold text-slate-ink">{percentage}%</span>
        <span className="text-[11px] font-semibold text-terracotta transition-colors group-hover:text-slate-ink">
          Continuar →
        </span>
      </span>
    </motion.button>
  );
}
