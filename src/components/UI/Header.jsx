import React from 'react';
import { BookOpen, Search, Bookmark, Feather } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-parchment/90 backdrop-blur-md border-b border-parchment-border/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Marca / Identidade Editorial */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-terracotta/40 flex items-center justify-center bg-parchment-50 shadow-sm text-terracotta">
            <Feather className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-ink flex items-center gap-2">
              Eterno Retorno
            </h1>
            <p className="text-[10px] font-sans font-semibold tracking-[0.16em] uppercase text-slate-ink-muted">
              Arquivo Canônico &amp; Biblioteca Viva
            </p>
          </div>
        </div>

        {/* Navegação & Controles Restritos */}
        <nav className="flex items-center gap-3 sm:gap-6">
          <button className="flex items-center gap-2 text-xs font-sans font-medium text-slate-ink-soft hover:text-terracotta transition-colors py-2 px-3 rounded-editorial">
            <Search className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden sm:inline">Pesquisar no Acervo</span>
          </button>
          
          <button className="flex items-center gap-2 text-xs font-sans font-medium text-slate-ink-soft hover:text-terracotta transition-colors py-2 px-3 rounded-editorial">
            <Bookmark className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden sm:inline">Marcadores</span>
          </button>

          <div className="h-4 w-px bg-parchment-border/80 hidden sm:block" />

          <div className="flex items-center gap-2 pl-2">
            <span className="text-[11px] font-sans font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-parchment-vellum text-terracotta border border-terracotta/20">
              Machado de Assis
            </span>
          </div>
        </nav>

      </div>
    </header>
  );
}

