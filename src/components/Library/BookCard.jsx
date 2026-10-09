import React from 'react';
import { motion } from 'framer-motion';

export default function BookCard({ book, onSelectBook, index = 0 }) {
  // Configurações visuais personalizadas por obra (idênticas ao code.html da referência)
  const isDomCasmurro = book.id === 'dom-casmurro';
  const isQuincasBorba = book.id === 'quincas-borba';

  return (
    <div
      onClick={() => onSelectBook(book)}
      className="group canonical-book-card bg-white rounded-2xl p-3 shadow-card-soft border border-parchment-200 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-card-hover"
    >
      {/* Moldura da Capa do Livro (aspect-[3/4.4] com brilho reflexivo e sombra de lombada) */}
      {isDomCasmurro ? (
        <div className="book-cover-sheen book-spine-shadow relative w-full aspect-[3/4.4] rounded-xl overflow-hidden bg-[#18363F] border border-[#234d59] shadow-sm flex flex-col justify-between p-4 text-parchment-100">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-ochre-light font-mono">
            <span>Edição Garnier</span>
            <span className="bg-slate-900/40 px-1.5 py-0.5 rounded">1899</span>
          </div>
          <div className="text-center my-auto space-y-1">
            <h4 className="font-display text-lg font-bold tracking-wider text-parchment-50 uppercase leading-tight group-hover:scale-105 transition-transform duration-300">
              Dom Casmurro
            </h4>
            <p className="font-cormorant italic text-xs text-amber-200">
              Capitu &amp; Olhos de Ressaca
            </p>
          </div>
          <div className="text-[9px] font-mono tracking-widest uppercase text-center text-parchment-300 border-t border-ochre/30 pt-1">
            Rio de Janeiro
          </div>
        </div>
      ) : isQuincasBorba ? (
        <div className="book-cover-sheen book-spine-shadow relative w-full aspect-[3/4.4] rounded-xl overflow-hidden bg-[#843e2b] border border-[#a2513c] shadow-sm flex flex-col justify-between p-4 text-parchment-100">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-parchment-200 font-mono">
            <span>Humanitismo</span>
            <span className="bg-slate-900/40 px-1.5 py-0.5 rounded text-amber-200">1891</span>
          </div>
          <div className="text-center my-auto space-y-1">
            <h4 className="font-display text-lg font-bold tracking-wider text-parchment-50 uppercase leading-tight group-hover:scale-105 transition-transform duration-300">
              Quincas Borba
            </h4>
            <p className="font-cormorant italic text-xs text-amber-200">
              “Ao vencedor, as batatas!”
            </p>
          </div>
          <div className="text-[9px] font-mono tracking-widest uppercase text-center text-parchment-300 border-t border-ochre-light/30 pt-1">
            Romance Psicológico
          </div>
        </div>
      ) : (
        <div className="book-cover-sheen book-spine-shadow relative w-full aspect-[3/4.4] rounded-xl overflow-hidden bg-parchment-100 border border-parchment-300 shadow-sm flex items-center justify-center p-2">
          <img 
            alt={`Frontispício de ${book.title}`} 
            className="w-full h-full object-contain filter sepia-[0.15] group-hover:scale-105 transition-transform duration-500" 
            src={book.cover} 
            loading="lazy"
          />
          <span className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-mono shadow-sm transition-transform duration-300 group-hover:scale-105">
            {book.year}
          </span>
        </div>
      )}

      {/* Metadados Editoriais Inferiores */}
      <div className="pt-3 pb-1 text-left">
        <p className="text-[11px] text-charcoal-muted font-sans uppercase tracking-wider font-semibold">
          {book.author}
        </p>
        <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-terracotta transition-colors leading-snug mt-0.5">
          {book.title.replace(' de Brás Cubas', '')}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mt-1.5">
          <span className="text-amber-500 font-bold">
            {book.id === 'memorias-posthumas' ? '★ 4.9' : book.id === 'dom-casmurro' ? '★ 4.8' : '★ 4.7'}
          </span>
          <span>
            {book.id === 'memorias-posthumas' ? '• 48k resenhas' : book.id === 'dom-casmurro' ? '• 54k resenhas' : '• 29k resenhas'}
          </span>
        </div>
      </div>
    </div>
  );
}
