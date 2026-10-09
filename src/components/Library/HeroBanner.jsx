import React from 'react';
import { ArrowDown, BookOpen } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-[380px] overflow-hidden rounded-3xl bg-[#222521] text-white shadow-dark-hero sm:min-h-[420px]"
    >
      <img
        src="/assets/authors/machado-de-assis.jpg"
        alt="Machado de Assis em retrato histórico"
        className="absolute inset-y-0 right-0 h-full w-[72%] object-cover object-[center_22%] grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#222521] via-[#222521]/90 to-[#222521]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#222521]/85 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[380px] flex-col justify-between p-7 sm:min-h-[420px] sm:p-8">
        <div className="max-w-[19rem]">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#dfbd69]">
            <BookOpen aria-hidden="true" className="h-4 w-4" />
            Biblioteca Machadiana
          </p>
          <h1 id="hero-title" className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            A literatura que atravessa o tempo.
          </h1>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">
            Leia obras integrais de Machado de Assis em edições digitais cuidadas.
          </p>
        </div>

        <a
          href="#obras"
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/15 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#dfbd69] hover:bg-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dfbd69]"
        >
          Explorar o acervo
          <ArrowDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
