import React from 'react';

export default function ReadingLog({ onOpenBook }) {
  return (
    <section className="mt-16 pt-10 border-t border-parchment-300/80 space-y-10" id="caderno">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-terracotta font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Vigília &amp; Ritmo Solene
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-ink mt-1 italic">
            Maratona de Leitura &amp; Caderno de Registro
          </h2>
        </div>
        <p className="font-cormorant italic text-base sm:text-lg text-charcoal-muted max-w-lg leading-relaxed">
          Caderno orgânico de anotações, permanência silenciosa e o andamento das obras canônicas do século XIX em ritmo acolhedor.
        </p>
      </div>

      {/* Bloco Principal Integrado: Maratona + Painel Cozy de Vigília */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-parchment-200 shadow-card-soft space-y-10 study-card relative overflow-hidden">
        {/* Detalhe decorativo sutil de fitilho/marcação no canto superior */}
        <div className="absolute top-0 right-12 w-8 h-14 bg-gradient-to-b from-[#843e2b] to-[#a2513c] rounded-b-md shadow-md flex items-end justify-center pb-1.5 opacity-90 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80" />
        </div>

        {/* 1. Destaques da Maratona Literária (Cartões Táteis Estilo Papel Pólen) */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-parchment-100 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-slate-ink text-lg">Vigília Literária do Outono</span>
              <span className="text-[11px] font-mono bg-parchment-100 text-terracotta px-2.5 py-0.5 rounded-full font-semibold border border-parchment-200">
                Meta Ativa: 120 Horas
              </span>
            </div>
            <span className="text-[11px] font-mono text-charcoal-muted">Caderno de Bordo #1881</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Cartão 1: Dias Consecutivos */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/70 hover:border-amber-400/60 hover:shadow-sm transition-all duration-300 group cursor-default">
              <div className="flex items-center justify-between text-charcoal-muted mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-charcoal-subtle">Vigília Contínua</span>
                <span className="text-amber-500 font-serif text-lg font-bold group-hover:scale-110 transition-transform">✦</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-bold text-slate-ink group-hover:text-terracotta transition-colors">47</span>
                <span className="text-xs font-serif italic text-charcoal-muted">dias</span>
              </div>
              <p className="text-[11px] text-terracotta font-semibold mt-2 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Fio ininterrupto
              </p>
            </div>

            {/* Cartão 2: Horas Dedicadas */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/70 hover:border-amber-400/60 hover:shadow-sm transition-all duration-300 group cursor-default">
              <div className="flex items-center justify-between text-charcoal-muted mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-charcoal-subtle">Tempo de Mergulho</span>
                <span className="text-amber-500 font-serif text-lg font-bold group-hover:scale-110 transition-transform">⌛</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-bold text-slate-ink group-hover:text-terracotta transition-colors">94h</span>
                <span className="text-xs font-serif italic text-charcoal-muted">/ 120h</span>
              </div>
              <p className="text-[11px] text-charcoal-muted font-medium mt-2 font-mono">
                Ritmo médio: 2h/dia
              </p>
            </div>

            {/* Cartão 3: Páginas Consultadas */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/70 hover:border-amber-400/60 hover:shadow-sm transition-all duration-300 group cursor-default">
              <div className="flex items-center justify-between text-charcoal-muted mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-charcoal-subtle">Páginas Percorridas</span>
                <span className="text-amber-500 font-serif text-lg font-bold group-hover:scale-110 transition-transform">❦</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-bold text-slate-ink group-hover:text-terracotta transition-colors">1.842</span>
              </div>
              <p className="text-[11px] text-terracotta font-semibold mt-2 font-mono">
                +280 páginas esta semana
              </p>
            </div>

            {/* Cartão 4: Marcos & Capítulos */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/70 hover:border-amber-400/60 hover:shadow-sm transition-all duration-300 group cursor-default">
              <div className="flex items-center justify-between text-charcoal-muted mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-charcoal-subtle">Capítulos Vencidos</span>
                <span className="text-amber-500 font-serif text-lg font-bold group-hover:scale-110 transition-transform">✒</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-bold text-slate-ink group-hover:text-terracotta transition-colors">116</span>
                <span className="text-xs font-serif italic text-charcoal-muted">capítulos</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-2 font-mono">
                3 volumes avançando
              </p>
            </div>
          </div>

          {/* Barra Geral de Ritmo da Maratona */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FAF8F5] border border-parchment-200/80 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-slate-ink text-sm">Progresso da Maratona em Curso:</span>
                <span className="font-cormorant italic text-sm text-charcoal-muted">Trilogia Realista de Machado de Assis</span>
              </div>
              <span className="font-mono font-bold text-terracotta text-xs">78% Concluído (328/420 páginas alvo)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-parchment-200 overflow-hidden p-0.5 border border-parchment-300/50">
              <div 
                className="h-full bg-gradient-to-r from-terracotta via-amber-500 to-amber-400 rounded-full transition-all duration-700" 
                style={{ width: '78%' }} 
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-charcoal-muted pt-0.5">
              <span>Marco I: Brás Cubas (Concluído)</span>
              <span>Marco II: Quincas Borba (Em andamento)</span>
              <span>Marco III: Dom Casmurro</span>
            </div>
          </div>
        </div>

        {/* 2. Histórico de Leitura & Progresso Canônico */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-parchment-100 mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-ink">
                Histórico de Leitura &amp; Fichamento de Obras
              </h3>
              <p className="font-cormorant italic text-sm text-charcoal-muted mt-0.5">
                Acompanhamento detalhado de cadernos, anotações de margem e ritmo nas edições históricas.
              </p>
            </div>
            <a href="#obras" className="text-xs font-semibold text-terracotta hover:text-slate-ink transition-colors uppercase font-mono tracking-wider">
              Ficha Completa →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Obra 1: Memórias Póstumas */}
            <div 
              onClick={() => onOpenBook('memorias-posthumas')}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/80 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-parchment-200 shadow-sm shrink-0 border border-parchment-300 group-hover:scale-105 transition-transform duration-300">
                    <img src="/Memorias_Posthumas_de_Braz_Cubas.jpg" alt="Memórias Póstumas" className="w-full h-full object-cover filter sepia-[0.15]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">Machado de Assis · 1881</span>
                    <h4 className="font-display font-bold text-base text-slate-ink group-hover:text-terracotta transition-colors leading-tight mt-0.5">
                      Memórias Póstumas
                    </h4>
                    <span className="text-[11px] font-serif italic text-terracotta block mt-1">“O delírio &amp; o emplasto”</span>
                  </div>
                </div>
                <div className="text-xs text-charcoal-muted space-y-1 py-2 border-t border-parchment-200/60 font-mono">
                  <div className="flex justify-between">
                    <span>Última sessão:</span>
                    <span className="text-slate-ink font-semibold">Cap. LXIV (pág. 142)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Notas marginais:</span>
                    <span className="text-slate-ink font-semibold">28 anotações</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-parchment-200/60 space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-charcoal-muted">Progresso</span>
                  <span className="font-bold text-slate-ink">82%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-parchment-200 overflow-hidden">
                  <div className="h-full bg-slate-950 rounded-full transition-all duration-500" style={{ width: '82%' }} />
                </div>
              </div>
            </div>

            {/* Obra 2: Quincas Borba */}
            <div 
              onClick={() => onOpenBook('quincas-borba')}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/80 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-[#843e2b] text-white p-1 text-center shadow-sm shrink-0 border border-[#a2513c] flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                    <span className="text-[8px] font-mono tracking-widest">1891</span>
                    <span className="text-[9px] font-display font-bold uppercase leading-none">QB</span>
                    <span className="text-[7px] font-mono opacity-70">Gar.</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">Machado de Assis · 1891</span>
                    <h4 className="font-display font-bold text-base text-slate-ink group-hover:text-terracotta transition-colors leading-tight mt-0.5">
                      Quincas Borba
                    </h4>
                    <span className="text-[11px] font-serif italic text-terracotta block mt-1">“Ao vencedor, as batatas!”</span>
                  </div>
                </div>
                <div className="text-xs text-charcoal-muted space-y-1 py-2 border-t border-parchment-200/60 font-mono">
                  <div className="flex justify-between">
                    <span>Última sessão:</span>
                    <span className="text-slate-ink font-semibold">Cap. XXII (pág. 89)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Notas marginais:</span>
                    <span className="text-slate-ink font-semibold">14 anotações</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-parchment-200/60 space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-charcoal-muted">Progresso</span>
                  <span className="font-bold text-terracotta">45%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-parchment-200 overflow-hidden">
                  <div className="h-full bg-terracotta rounded-full transition-all duration-500" style={{ width: '45%' }} />
                </div>
              </div>
            </div>

            {/* Obra 3: Dom Casmurro */}
            <div 
              onClick={() => onOpenBook('dom-casmurro')}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/80 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-[#18363F] text-white p-1 text-center shadow-sm shrink-0 border border-[#234d59] flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                    <span className="text-[8px] font-mono tracking-widest text-ochre-light">1899</span>
                    <span className="text-[9px] font-display font-bold uppercase leading-none">DC</span>
                    <span className="text-[7px] font-mono opacity-70">RJ</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">Machado de Assis · 1899</span>
                    <h4 className="font-display font-bold text-base text-slate-ink group-hover:text-terracotta transition-colors leading-tight mt-0.5">
                      Dom Casmurro
                    </h4>
                    <span className="text-[11px] font-serif italic text-terracotta block mt-1">“Olhos de ressaca”</span>
                  </div>
                </div>
                <div className="text-xs text-charcoal-muted space-y-1 py-2 border-t border-parchment-200/60 font-mono">
                  <div className="flex justify-between">
                    <span>Última sessão:</span>
                    <span className="text-slate-ink font-semibold">Releitura concluída</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Notas marginais:</span>
                    <span className="text-slate-ink font-semibold">42 anotações</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-parchment-200/60 space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-charcoal-muted">Progresso</span>
                  <span className="font-bold text-emerald-700">100% Concluído</span>
                </div>
                <div className="w-full h-2 rounded-full bg-parchment-200 overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full transition-all duration-500" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

