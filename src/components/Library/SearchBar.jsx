import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange, onSearchSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-card-soft border border-parchment-200 flex flex-wrap sm:flex-nowrap items-center gap-2 transition-all duration-300 hover:shadow-md animate-search-enter">
      {/* Campo de Pesquisa */}
      <div className="search-input-box flex items-center gap-2.5 flex-1 px-3 py-2 bg-[#FAF8F5] rounded-xl text-xs text-charcoal border border-transparent transition-all duration-300 focus-within:bg-white focus-within:border-terracotta/40 focus-within:ring-2 focus-within:ring-terracotta/10">
        <Search className="w-4 h-4 text-charcoal-muted transition-colors" />
        <input 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-0 p-0 text-xs text-slate-ink placeholder:text-charcoal-subtle focus:ring-0 focus:outline-none" 
          placeholder="Buscar autor ou obra..." 
          type="text" 
        />
      </div>

      {/* Seletor de Tipo */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF8F5] rounded-xl text-xs text-charcoal font-medium cursor-pointer hover:bg-parchment-200/80 active:scale-95 transition-all duration-200 border border-transparent hover:border-parchment-300">
        <span className="text-charcoal-muted text-[11px]">Tipo:</span>
        <span className="font-semibold text-slate-ink">Todos</span>
        <ChevronDown className="w-3.5 h-3.5 text-charcoal-muted ml-0.5" />
      </div>

      {/* Seletor de Século */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF8F5] rounded-xl text-xs text-charcoal font-medium cursor-pointer hover:bg-parchment-200/80 active:scale-95 transition-all duration-200 border border-transparent hover:border-parchment-300">
        <span className="text-charcoal-muted text-[11px]">Séc:</span>
        <span className="font-semibold text-slate-ink">XIX</span>
        <ChevronDown className="w-3.5 h-3.5 text-charcoal-muted ml-0.5" />
      </div>

      {/* Botão de Ação "Ir" */}
      <button 
        onClick={onSearchSubmit}
        className="bg-slate-950 text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-slate-800 active:scale-90 hover:shadow-md transition-all duration-200 shadow-sm shrink-0"
      >
        Ir
      </button>
    </div>
  );
}

