import React from 'react';
import { BookOpen, Search, Bookmark, Feather, User } from 'lucide-react';

export default function Header({ onSearchClick }) {
  return (
    <header className="sticky top-0 z-30 bg-parchment/90 backdrop-blur-md border-b border-parchment-border/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Top Left Logo & Subtítulo */}
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-slate-800">
            <Feather className="w-5 h-5 text-amber-400 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-slate-950">
                Eterno Retorno
              </span>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-terracotta/10 text-terracotta border border-terracotta/20">
                1881–1908
              </span>
            </div>
            <p className="text-[11px] font-sans font-medium tracking-wide text-slate-ink-muted">
              Biblioteca Clássica &amp; Arquivo Vivo
            </p>
          </div>
        </div>

        {/* Navegação Central */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-sans font-medium text-slate-ink-soft">
          <a href="#inicio" className="text-slate-950 font-semibold relative py-1">
            Início
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900 rounded-full"></span>
          </a>
          <a href="#acervo" className="hover:text-terracotta transition-colors py-1">
            Acervo Canônico
          </a>
          <a href="#machado" className="hover:text-terracotta transition-colors py-1">
            Machado de Assis
          </a>
          <a href="#arquivo" className="hover:text-terracotta transition-colors py-1">
            Sobre as Edições
          </a>
        </nav>

        {/* Lado Direito: Ações & Perfil */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onSearchClick}
            className="flex items-center gap-2 text-xs font-sans font-medium text-slate-ink-soft hover:text-terracotta transition-colors py-2 px-3 rounded-xl bg-white border border-parchment-border/80 shadow-2xs hover:shadow-xs"
          >
            <Search className="w-4 h-4 stroke-[1.75] text-slate-ink-muted" />
            <span className="hidden sm:inline">Buscar obra...</span>
          </button>

          <div className="flex items-center gap-2.5 p-1 pr-3 rounded-full hover:bg-parchment-200/60 active:scale-95 transition-all duration-200 cursor-pointer border border-transparent hover:border-parchment-border">
            <img 
              src="/assets/authors/machado-de-assis.jpg"
              alt="Perfil Leitor Canônico" 
              className="w-8 h-8 rounded-full object-cover object-top border border-slate-300 shadow-2xs" 
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">Leitor</span>
              <span className="text-[10px] text-slate-ink-muted">Edição Crítica</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
