import React, { useState } from 'react';

export default function BookCard({ book, onSelectBook, index = 0 }) {
  const [transformStyle, setTransformStyle] = useState('');

  const isDomCasmurro = book.id === 'dom-casmurro';
  const isQuincasBorba = book.id === 'quincas-borba';

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    const rotateY = deltaX * 6;
    const rotateX = -deltaY * 6;
    setTransformStyle(`translateY(-10px) scale(1.025) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('');
  };

  const staggerClass = index === 0 ? 'stagger-book-1' : index === 1 ? 'stagger-book-2' : 'stagger-book-3';

  return (
    <div
      onClick={() => onSelectBook(book)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      className={`${staggerClass} group canonical-book-card bg-white rounded-2xl p-3 shadow-card-soft border border-parchment-200 flex flex-col cursor-pointer`}
    >
      {/* Moldura da Capa do Livro (aspect-[3/4.4]) */}
      {isDomCasmurro ? (
        <div className="book-cover-sheen relative w-full aspect-[3/4.4] rounded-xl overflow-hidden bg-[#18363F] border border-[#234d59] shadow-sm flex flex-col justify-between p-3 sm:p-4 text-parchment-100">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-ochre-light font-mono">
            <span>Edição Garnier</span>
            <span className="bg-slate-900/40 px-1.5 py-0.5 rounded">1899</span>
          </div>
          <div className="text-center my-auto space-y-1">
            <h4 className="font-serif text-lg font-bold tracking-wider text-parchment-50 uppercase leading-tight group-hover:scale-105 transition-transform duration-300">
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
        <div className="book-cover-sheen relative w-full aspect-[3/4.4] rounded-xl overflow-hidden bg-[#843e2b] border border-[#a2513c] shadow-sm flex flex-col justify-between p-3 sm:p-4 text-parchment-100">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-parchment-200 font-mono">
            <span>Humanitismo</span>
            <span className="bg-slate-900/40 px-1.5 py-0.5 rounded text-amber-200">1891</span>
          </div>
          <div className="text-center my-auto space-y-1">
            <h4 className="font-serif text-lg font-bold tracking-wider text-parchment-50 uppercase leading-tight group-hover:scale-105 transition-transform duration-300">
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
        <div className="book-cover-sheen relative w-full aspect-[3/4.4] rounded-xl overflow-hidden bg-parchment-100 border border-parchment-300 shadow-sm flex items-center justify-center p-2">
          <img 
            alt={`Capa de ${book.title}`}
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
        <p className="text-[10px] text-charcoal-muted font-sans uppercase tracking-wider font-semibold">
          {book.author}
        </p>
        <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-ochre-aged transition-colors leading-snug mt-0.5 sm:text-base">
          {book.id === 'memorias-posthumas' ? 'Memórias Póstumas' : book.title}
        </h3>
        <p className="mt-1.5 text-xs text-charcoal-muted">{book.category}</p>
      </div>
    </div>
  );
}
