import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchQuery, searchMessage, onSearchChange, onSearchSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-card-soft border border-parchment-200 flex items-center gap-2 transition-all duration-300 hover:shadow-md animate-search-enter">
        <div className="search-input-box flex items-center gap-2.5 flex-1 px-3 py-2 bg-[#FAF8F5] rounded-xl text-xs text-charcoal border border-transparent transition-all duration-300 focus-within:bg-white focus-within:border-terracotta/40 focus-within:ring-2 focus-within:ring-terracotta/10">
          <Search className="w-4 h-4 text-charcoal-muted transition-colors" />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-0 p-0 text-xs text-slate-ink placeholder:text-charcoal-subtle focus:ring-0 focus:outline-none"
            placeholder="Buscar autor ou obra..."
            type="search"
            aria-label="Buscar autor ou obra"
          />
        </div>
        <button
          onClick={onSearchSubmit}
          className="bg-slate-950 text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-slate-800 active:scale-90 hover:shadow-md transition-all duration-200 shadow-sm shrink-0"
        >
          Ir
        </button>
      </div>
      {searchMessage && (
        <p className="px-3 pt-2 text-xs text-terracotta" role="status">
          {searchMessage}
        </p>
      )}
    </div>
  );
}
