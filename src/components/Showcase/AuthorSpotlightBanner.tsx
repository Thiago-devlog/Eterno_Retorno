import React, { useState, useEffect } from 'react';
import { AuthorProfile } from '../../data/booksData';
import { ChevronLeft, ChevronRight, Quote, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

interface AuthorSpotlightBannerProps {
  authors: AuthorProfile[];
  themeMode: 'light' | 'dark' | 'amber';
  onSelectAuthorDossier: (author: AuthorProfile) => void;
}

export const AuthorSpotlightBanner: React.FC<AuthorSpotlightBannerProps> = ({
  authors,
  themeMode,
  onSelectAuthorDossier,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Troca automática a cada 5 segundos (pausa quando o usuário passar o mouse por cima)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % authors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [authors.length, isPaused]);

  const author = authors[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + authors.length) % authors.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % authors.length);
  };

  // Cores adaptadas ao tema (Claro, Escuro e Amarelado sem luz azul)
  const themeStyles = {
    light: {
      cardBg: 'bg-gradient-to-r from-[#FAF8F5] via-[#FFFFFF] to-[#F7F4EF]',
      border: 'border-slate-200/90 shadow-sm',
      title: 'text-slate-900',
      subtitle: 'text-amber-800',
      quote: 'text-slate-700',
      tagBg: 'bg-amber-100/70 text-amber-900 border-amber-200/60',
      dotActive: 'bg-black',
      dotInactive: 'bg-slate-300',
      btn: 'bg-slate-900 hover:bg-black text-white',
      avatarRing: 'ring-2 ring-amber-600/40 shadow-md',
    },
    dark: {
      cardBg: 'bg-gradient-to-r from-[#172239] via-[#1E293B] to-[#141C2E]',
      border: 'border-slate-700/80 shadow-md',
      title: 'text-white',
      subtitle: 'text-amber-400',
      quote: 'text-slate-300',
      tagBg: 'bg-amber-950/60 text-amber-300 border-amber-800/40',
      dotActive: 'bg-amber-400',
      dotInactive: 'bg-slate-700',
      btn: 'bg-amber-500 hover:bg-amber-400 text-black',
      avatarRing: 'ring-2 ring-amber-500/50 shadow-lg',
    },
    amber: {
      cardBg: 'bg-gradient-to-r from-[#F4E8CB] via-[#FAF1DC] to-[#EFE2C2]',
      border: 'border-[#DFCDB0] shadow-sm',
      title: 'text-[#3E2B18]',
      subtitle: 'text-[#8C4A19]',
      quote: 'text-[#4D361F]',
      tagBg: 'bg-[#EBDABA] text-[#6E360F] border-[#DEC9A4]',
      dotActive: 'bg-[#5C3210]',
      dotInactive: 'bg-[#D6C19E]',
      btn: 'bg-[#5C3210] hover:bg-[#43230A] text-[#FAF3E0]',
      avatarRing: 'ring-2 ring-[#8C4A19]/50 shadow-md',
    },
  }[themeMode];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative px-3 sm:px-4 mb-4 select-none"
    >
      <div
        className={`relative overflow-hidden rounded-3xl p-4 sm:p-5 border transition-all duration-300 ${themeStyles.cardBg} ${themeStyles.border}`}
      >
        {/* Marca d'água clássica de fundo */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.04] pointer-events-none flex items-center justify-end pr-6 font-display text-8xl font-black">
          XIX
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 relative z-10">
          {/* FOTO / RETRATO DO AUTOR COM MOLDURA CLÁSSICA */}
          <div className="relative shrink-0 group">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105 ${themeStyles.avatarRing} bg-slate-200`}
            >
              <img
                src={author.avatarUrl}
                alt={author.name}
                className="w-full h-full object-cover object-top filter contrast-[1.05]"
                loading="eager"
                onError={(e) => {
                  // Fallback para portraitUrl se avatar falhar
                  if (e.currentTarget.src !== author.portraitUrl) {
                    e.currentTarget.src = author.portraitUrl;
                  }
                }}
              />
            </div>
            {/* Selo comemorativo */}
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[8px] font-mono font-bold bg-amber-600 text-white shadow-xs">
              SÉC. {author.lifespan.includes('1908') || author.lifespan.includes('1895') ? 'XIX' : 'XIX-XX'}
            </span>
          </div>

          {/* DADOS E CITAÇÃO DO ESCRITOR */}
          <div className="flex-1 text-center sm:text-left space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
              <span
                className={`text-[9px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${themeStyles.tagBg}`}
              >
                {author.movement}
              </span>
              <span className="text-[10px] font-mono text-slate-500 font-semibold">
                {author.lifespan}
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className={`font-display text-lg sm:text-xl font-black tracking-tight ${themeStyles.title} truncate`}>
                {author.name}
              </h3>
            </div>

            {/* Citação Literária */}
            <div className="relative pl-0 sm:pl-3 sm:border-l-2 border-amber-600/40 pt-0.5">
              <p className={`font-cormorant italic text-xs sm:text-sm line-clamp-2 leading-relaxed ${themeStyles.quote}`}>
                “{author.quote}”
              </p>
            </div>

            {/* Rodapé do Banner: Ação do Dossiê */}
            <div className="pt-1 flex items-center justify-center sm:justify-start gap-3">
              <button
                onClick={() => onSelectAuthorDossier(author)}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs ${themeStyles.btn}`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Ver Dossiê & Obras</span>
              </button>
              <span className="text-[10px] font-sans opacity-70">
                {author.tagline}
              </span>
            </div>
          </div>
        </div>

        {/* SETAS DE NAVEGAÇÃO DO BANNER */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-slate-800 dark:text-white backdrop-blur-xs cursor-pointer transition-colors"
          title="Autor anterior"
          aria-label="Autor anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-slate-800 dark:text-white backdrop-blur-xs cursor-pointer transition-colors"
          title="Próximo autor"
          aria-label="Próximo autor"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* INDICADORES EM PONTOS (DOTS) */}
        <div className="flex justify-center items-center gap-1.5 mt-2.5 pt-1">
          {authors.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? `w-5 ${themeStyles.dotActive}` : `w-1.5 ${themeStyles.dotInactive}`
              }`}
              title={`Ir para autor ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
