import React from 'react';

export default function FeaturedAuthor() {
  return (
    <section
      id="autores"
      className="rounded-2xl border border-parchment-200 bg-white/75 p-5 sm:p-6"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta">
        Autor em foco
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-ink">Machado de Assis</h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-charcoal-muted">
            Quatro romances, do Realismo de 1881 às vésperas da República, reunidos para leitura em um só lugar.
          </p>
        </div>
        <a
          href="#obras"
          className="shrink-0 text-xs font-semibold text-terracotta transition-colors hover:text-slate-ink"
        >
          Ver as quatro obras →
        </a>
      </div>
    </section>
  );
}
