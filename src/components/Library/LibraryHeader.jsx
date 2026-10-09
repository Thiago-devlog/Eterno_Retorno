import React from 'react';

const NAVIGATION_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#autores', label: 'Autores do Séc. XIX' },
  { href: '#obras', label: 'Catálogo Canônico' },
  { href: '#caderno', label: 'Seu progresso' }
];

export default function LibraryHeader() {
  return (
    <header className="mb-7 flex items-center justify-between gap-4 border-b border-parchment-300/70 py-3 animate-header-enter sm:mb-8 sm:py-4">
      <a
        className="group flex items-center gap-3.5 transition-transform duration-300 active:scale-95"
        href="#inicio"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-slate-800 group-hover:shadow-md">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-amber-300 transition-transform duration-300 group-hover:rotate-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 2h11a2 2 0 0 1 2 2v15a1 1 0 0 1-1.447.894L12 17.118l-5.553 2.776A1 1 0 0 1 5 19V4a2 2 0 0 1 2-2zm0 2v13.382l5.105-2.553a1 1 0 0 1 .895 0L17 17.382V4H6z" />
          </svg>
        </span>
        <span className="flex flex-col">
          <span className="font-display text-lg font-bold uppercase leading-none tracking-tight text-slate-ink transition-colors duration-300 group-hover:text-terracotta sm:text-xl">
            Eterno Retorno
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal-muted">
            Biblioteca Clássica
          </span>
        </span>
      </a>

      <nav aria-label="Navegação principal" className="hidden items-center gap-8 text-[13px] font-medium text-charcoal-muted md:flex">
        {NAVIGATION_LINKS.map((link, index) => (
          <a
            key={link.href}
            aria-current={index === 0 ? 'page' : undefined}
            className={`relative py-1 transition-colors hover:text-slate-ink ${
              index === 0 ? 'font-semibold text-slate-ink' : ''
            }`}
            href={link.href}
          >
            {link.label}
            <span
              className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-slate-ink transition-all duration-300 ${
                index === 0 ? 'w-full' : 'w-0 hover:w-full'
              }`}
            />
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-2 sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-ink text-[#dfbd69]">
          <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 2h11a2 2 0 0 1 2 2v15a1 1 0 0 1-1.447.894L12 17.118l-5.553 2.776A1 1 0 0 1 5 19V4a2 2 0 0 1 2-2zm0 2v13.382l5.105-2.553a1 1 0 0 1 .895 0L17 17.382V4H6z" />
          </svg>
        </span>
        <span className="text-[11px] font-medium text-charcoal-muted">Acervo aberto</span>
      </div>
    </header>
  );
}
