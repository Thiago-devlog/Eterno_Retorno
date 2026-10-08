import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, BookmarkCheck } from 'lucide-react';

export default function BookCard({ book, onSelectBook }) {
  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-editorial border border-parchment-border/80 shadow-card-soft hover:shadow-book-elevated transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Capa com proporção de livro e relevo táctil */}
      <div className="relative aspect-[3/4] bg-parchment-vellum overflow-hidden flex items-center justify-center p-4 border-b border-parchment-border/60">
        <img 
          src={book.cover} 
          alt={`Capa do livro ${book.title}`}
          className="h-full w-auto object-cover rounded-[2px] shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.02] border border-black/5"
          loading="lazy"
        />

        {/* Tag de Época / Categoria */}
        <span className="absolute top-3 left-3 bg-parchment-50/95 backdrop-blur-sm text-[10px] font-sans font-semibold tracking-wider uppercase text-slate-ink-muted px-2 py-0.5 rounded border border-parchment-border/90 shadow-2xs">
          {book.year}
        </span>
      </div>

      {/* Conteúdo Editorial */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-[11px] font-sans font-semibold tracking-[0.12em] uppercase text-terracotta mb-1.5">
            {book.category}
          </div>
          <h3 className="font-display text-lg font-semibold text-slate-ink group-hover:text-terracotta transition-colors leading-snug line-clamp-2">
            {book.title}
          </h3>
          <p className="text-xs font-sans text-slate-ink-muted mt-1">
            {book.author}
          </p>
          <p className="font-reader text-xs text-slate-ink-soft mt-3 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Rodapé do Card */}
        <div className="pt-4 mt-4 border-t border-parchment-100 flex items-center justify-between">
          <span className="text-[11px] font-sans text-slate-ink-muted">
            {book.pagesEstimate}
          </span>
          <button
            onClick={() => onSelectBook(book)}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-slate-ink hover:text-terracotta transition-colors py-1 px-2.5 rounded bg-parchment-50 hover:bg-parchment-100 border border-parchment-border"
          >
            <BookOpen className="w-3.5 h-3.5 text-terracotta stroke-[2]" />
            <span>Abrir Leitor</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

