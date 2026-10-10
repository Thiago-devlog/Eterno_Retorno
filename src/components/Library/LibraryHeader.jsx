import React from 'react';

const NAVIGATION_LINKS = [
  { href: '#autores', label: 'Fichário' },
  { href: '#obras', label: 'Obras' },
  { href: '#caderno', label: 'Progresso' }
];

export default function LibraryHeader() {
  return (
    <header className="mb-7 flex items-center justify-between gap-4 border-b border-[#D8CEBC] py-3 animate-header-enter sm:mb-8 sm:py-4">
      <a
        className="group flex items-center gap-3.5 transition-transform duration-300 active:scale-95"
        href="#inicio"
      >
        <span className="flex h-10 w-10 items-center justify-center border border-[#51483B] bg-paper-dark text-paper-canvas shadow-sm transition-colors group-hover:bg-[#403B34]">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-[#D5C09B]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v16H4V4Zm2 2v12h12V6H6Zm2 2h8v1.5H8V8Zm0 3h8v1.5H8V11Zm0 3h5v1.5H8V14Z" />
          </svg>
        </span>
        <span className="flex flex-col">
          <span className="font-serif-title text-lg font-bold uppercase leading-none tracking-tight text-charcoal transition-colors duration-300 group-hover:text-sepia-accent sm:text-xl">
            Eterno Retorno
          </span>
          <span className="mt-1 font-sans-label text-[9px] font-medium uppercase tracking-[0.18em] text-[#76684F] sm:text-[10px]">
            Biblioteca Clássica · Arquivo Literário
          </span>
        </span>
      </a>

      <nav aria-label="Navegação principal" className="hidden items-center gap-7 font-sans-label text-[11px] font-medium uppercase tracking-[0.12em] text-[#76684F] md:flex">
        {NAVIGATION_LINKS.map((link) => (
          <a
            key={link.href}
            className="relative py-1 transition-colors hover:text-charcoal"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-2 sm:flex">
        <span className="h-2 w-2 rounded-full bg-sepia-accent" aria-hidden="true" />
        <span className="font-sans-label text-[10px] uppercase tracking-wider text-[#76684F]">Acervo aberto</span>
      </div>
    </header>
  );
}
