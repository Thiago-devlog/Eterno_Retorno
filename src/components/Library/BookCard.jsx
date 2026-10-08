import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Feather } from 'lucide-react';

export default function BookCard({ book, onSelectBook }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelectBook(book)}
      className="group bg-white rounded-2xl p-3.5 shadow-card-soft border border-parchment-border/80 flex flex-col cursor-pointer transition-shadow hover:shadow-card-hover relative"
    >
      {/* Moldura da Capa do Livro (aspect-3/4.4 com acabamento de encadernação) */}
      <div className="relative w-full aspect-[3/4.2] rounded-xl overflow-hidden bg-parchment-vellum border border-parchment-border/70 shadow-sm flex items-center justify-center p-3">
        <img 
          src={book.cover} 
          alt={`Capa de ${book.title}`}
          className="h-full w-auto object-cover rounded-[2px] shadow-sm transition-transform duration-500 group-hover:scale-105 border border-black/5"
          loading="lazy"
        />

        {/* Tag Superior de Ano & Edição */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center pointer-events-none">
          <span className="bg-white/95 backdrop-blur-xs text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full border border-black/5 text-slate-ink-muted shadow-2xs">
            {book.edition}
          </span>
          <span className="bg-amber-400 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded font-mono shadow-xs">
            {book.year}
          </span>
        </div>

        {/* Efeito sutil de vinco na lombada à esquerda */}
        <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/10 via-black/5 to-transparent pointer-events-none" />
      </div>

      {/* Metadados e Tipografia Editorial */}
      <div className="pt-3.5 pb-1 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-wider font-semibold text-terracotta mb-1">
            <Feather className="w-3 h-3 stroke-[2]" />
            <span>{book.category}</span>
          </div>

          <h3 className="font-display text-base sm:text-lg font-bold text-slate-950 group-hover:text-terracotta transition-colors leading-snug line-clamp-1">
            {book.title}
          </h3>

          <p className="text-xs font-sans text-slate-ink-muted mt-0.5">
            {book.author}
          </p>

          <p className="font-reader text-xs text-slate-ink-soft mt-2.5 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Rodapé do Card com Gatilho do Leitor */}
        <div className="pt-3.5 mt-3 border-t border-parchment-100 flex items-center justify-between text-xs">
          <span className="text-[11px] font-sans text-slate-ink-muted">
            {book.pagesEstimate}
          </span>
          
          <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-slate-900 group-hover:text-terracotta transition-colors py-1 px-2.5 rounded-lg bg-parchment-50 group-hover:bg-terracotta/10 border border-parchment-border group-hover:border-terracotta/30">
            <BookOpen className="w-3.5 h-3.5 text-terracotta stroke-[2]" />
            <span>Ler Obra</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
