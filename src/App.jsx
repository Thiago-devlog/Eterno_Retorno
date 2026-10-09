import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EpubReader from './components/Reader/EpubReader.jsx';
import { CANONICAL_BOOKS } from './data/books.js';
import { useAuth } from './hooks/useAuth.js';
import { getLastReadBook } from './services/readingService.js';
import HeroBanner, { HERO_AUTHORS } from './components/Library/HeroBanner.jsx';
import SearchBar from './components/Library/SearchBar.jsx';
import BookCard from './components/Library/BookCard.jsx';
import ReadingLog from './components/Library/ReadingLog.jsx';

export default function App() {
  const { uid } = useAuth();
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentHeroAuthor, setCurrentHeroAuthor] = useState(HERO_AUTHORS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRead, setLastRead] = useState(null);

  // Carrega o último livro lido assim que o uid estiver disponível
  useEffect(() => {
    if (!uid) return;
    const bookIds = CANONICAL_BOOKS.map((b) => b.id);
    getLastReadBook(uid, bookIds)
      .then((result) => {
        if (result && result.percentage > 0) {
          setLastRead(result);
        }
      })
      .catch(() => {});
  }, [uid]);

  // Atualiza o painel "Continuar Lendo" quando o leitor avança de página
  const handleLocationChanged = (cfi, percentage) => {
    if (selectedBook) {
      setLastRead((prev) => {
        if (!prev || prev.bookId === selectedBook.id || percentage > (prev.percentage || 0)) {
          return { bookId: selectedBook.id, cfi, percentage, updatedAt: new Date() };
        }
        return prev;
      });
    }
  };

  // Helper para abrir obra por id
  const openBookById = (id) => {
    const found = CANONICAL_BOOKS.find((b) => b.id === id);
    if (found) setSelectedBook(found);
  };

  // Submissão da busca
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const target = CANONICAL_BOOKS.find((b) => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (target) setSelectedBook(target);
    }
  };

  return (
    <div className="bg-[#FDFBF7] text-slate-ink font-sans antialiased min-h-screen selection:bg-terracotta/25 selection:text-slate-ink">
      
      {/* Transição Suave: Biblioteca Principal vs Leitor de EPUB */}
      <AnimatePresence mode="wait">
        {selectedBook ? (
          <EpubReader 
            key={selectedBook.id}
            book={selectedBook}
            uid={uid}
            onClose={() => setSelectedBook(null)}
            onLocationChanged={handleLocationChanged}
            onTextSelected={(text, cfiRange) => {
              console.log(`[Eterno Retorno] Anotação selecionada: "${text}" no range: ${cfiRange}`);
            }}
          />
        ) : (
          <motion.div
            key="library-canvas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6"
          >
            {/* 1. HEADER & NAVEGAÇÃO SUPERIOR */}
            <header className="flex items-center justify-between py-4 mb-8 animate-header-enter">
              {/* Top Left Logo */}
              <a className="flex items-center gap-3.5 group transition-transform duration-300 active:scale-95" href="#inicio">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-slate-800 group-hover:shadow-md">
                  <svg className="w-5 h-5 text-amber-300 transition-transform duration-300 group-hover:rotate-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 2h11a2 2 0 0 1 2 2v15a1 1 0 0 1-1.447.894L12 17.118l-5.553 2.776A1 1 0 0 1 5 19V4a2 2 0 0 1 2-2zm0 2v13.382l5.105-2.553a1 1 0 0 1 .895 0L17 17.382V4H6z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg sm:text-xl tracking-tight leading-none text-slate-ink uppercase group-hover:text-terracotta transition-colors duration-300">
                    Eterno Retorno
                  </span>
                  <span className="text-[10px] uppercase font-jakarta tracking-[0.22em] text-charcoal-muted font-semibold mt-1">
                    Biblioteca Clássica
                  </span>
                </div>
              </a>

              {/* Center Navigation Links */}
              <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-charcoal-muted">
                <a className="text-slate-ink font-semibold relative py-1 group/link" href="#inicio">
                  Início
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-ink rounded-full transition-all duration-300" />
                </a>
                <a className="hover:text-slate-ink transition-colors py-1 relative group/link" href="#autores">
                  Autores do Séc. XIX
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-ink rounded-full transition-all duration-300 group-hover/link:w-full" />
                </a>
                <a className="hover:text-slate-ink transition-colors py-1 relative group/link" href="#obras">
                  Catálogo Canônico
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-ink rounded-full transition-all duration-300 group-hover/link:w-full" />
                </a>
                <a className="hover:text-slate-ink transition-colors py-1 relative group/link" href="#caderno">
                  Caderno de Notas
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-ink rounded-full transition-all duration-300 group-hover/link:w-full" />
                </a>
              </nav>

              {/* Right User Profile */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 p-1 pr-3 rounded-full hover:bg-parchment-200/60 active:scale-95 transition-all duration-200 cursor-pointer border border-transparent hover:border-parchment-300 hover:shadow-sm">
                  <img 
                    alt="Retrato de Machado de Assis" 
                    className="w-9 h-9 rounded-full object-cover object-top border border-slate-300 shadow-sm transition-transform duration-300 hover:scale-105" 
                    src="/Machado_de_Assis_aos_57_anos.jpg" 
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-ink leading-tight">Machado de Assis</span>
                    <span className="text-[10px] text-charcoal-muted">Leitor Canônico</span>
                  </div>
                  <svg className="w-4 h-4 text-charcoal-muted ml-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </header>

            {/* DESTAQUE CONTINUAR LENDO — visível quando há leitura ativa persistida */}
            <AnimatePresence>
              {lastRead && lastRead.percentage > 0 && (() => {
                const lr = CANONICAL_BOOKS.find((b) => b.id === lastRead.bookId);
                if (!lr) return null;
                return (
                  <motion.div
                    key="continuar-lendo"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6 bg-white rounded-2xl px-4 py-3 shadow-card-soft border border-parchment-200 flex items-center gap-4 group cursor-pointer hover:shadow-card-hover hover:border-amber-300/60 transition-all duration-300"
                    onClick={() => openBookById(lastRead.bookId)}
                  >
                    {/* Mini capa */}
                    <div className="w-10 h-14 rounded-lg overflow-hidden bg-parchment-100 border border-parchment-300 shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      {lr.cover ? (
                        <img src={lr.cover} alt={lr.title} className="w-full h-full object-cover filter sepia-[0.1]" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] font-display font-bold text-charcoal-muted text-center p-0.5 bg-parchment-200">
                          {lr.title.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Informações do livro */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-charcoal-subtle mb-0.5">
                        Continuar lendo
                      </p>
                      <h4 className="font-display font-bold text-sm text-slate-ink group-hover:text-terracotta transition-colors truncate leading-tight">
                        {lr.title}
                      </h4>
                      <p className="text-[11px] text-charcoal-muted truncate">{lr.author || 'Machado de Assis'}</p>
                      {/* Barra de progresso fina com a cor terracota */}
                      <div className="mt-1.5 w-full h-[2px] rounded-full bg-[#E2DCD5] overflow-hidden">
                        <div
                          className="h-full bg-terracotta rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.round(lastRead.percentage * 100))}%` }}
                        />
                      </div>
                    </div>

                    {/* Percentagem + CTA */}
                    <div className="shrink-0 text-right flex flex-col items-end gap-1">
                      <span className="font-mono text-xs font-bold text-slate-ink">
                        {Math.min(100, Math.round(lastRead.percentage * 100))}%
                      </span>
                      <span className="text-[11px] font-semibold text-terracotta group-hover:text-slate-ink transition-colors flex items-center gap-0.5">
                        Continuar <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
                      </span>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* 2. SEÇÃO SUPERIOR DIVIDIDA (GRID COUNTRY BOOKS STYLE) */}
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="inicio">
              
              {/* ================= COLUNA DA ESQUERDA (5 Colunas) ================= */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Hero Banner Escuro Arredondado */}
                <HeroBanner 
                  currentAuthor={currentHeroAuthor}
                  onSelectAuthor={setCurrentHeroAuthor}
                />

                {/* Barra de Pesquisa Integrada e Filtros Compactos */}
                <SearchBar 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSearchSubmit={handleSearchSubmit}
                />

                {/* Últimas Leituras Consultadas (Tabela Compacta) */}
                <div className="bg-white rounded-2xl p-5 shadow-card-soft border border-parchment-200 space-y-4 animate-history-enter transition-all duration-300 hover:shadow-card-hover">
                  <div className="flex items-center justify-between pb-2 border-b border-parchment-200/60">
                    <span className="text-[11px] font-jakarta uppercase tracking-wider font-semibold text-charcoal-muted">
                      Últimas consultas
                    </span>
                    <span className="text-[11px] text-terracotta font-semibold cursor-pointer hover:underline transition-colors hover:text-slate-ink">
                      Ver histórico
                    </span>
                  </div>

                  {/* Item 1: Memórias Póstumas */}
                  <div 
                    onClick={() => openBookById('memorias-posthumas')}
                    className="flex items-center justify-between gap-3 text-xs py-1.5 px-2 -mx-2 rounded-xl group cursor-pointer transition-all duration-250 hover:bg-parchment-100/70 hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-charcoal-subtle font-semibold transition-colors group-hover:text-terracotta">1</span>
                      <div className="w-7 h-9 rounded bg-parchment-200 overflow-hidden shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <img alt="Brás Cubas" className="w-full h-full object-cover" src="/Memorias_Posthumas_de_Braz_Cubas.jpg" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-slate-ink group-hover:text-terracotta transition-colors leading-tight">Memórias Póstumas</p>
                        <p className="text-[11px] text-charcoal-muted">Machado de Assis</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-1 text-[11px] text-charcoal-muted transition-transform duration-300 group-hover:scale-105">
                      <span className="text-amber-500 font-bold">★ 4.9</span>
                      <span>• 42k</span>
                    </div>
                  </div>

                  {/* Item 2: Dom Casmurro */}
                  <div 
                    onClick={() => openBookById('dom-casmurro')}
                    className="flex items-center justify-between gap-3 text-xs py-1.5 px-2 -mx-2 rounded-xl group cursor-pointer transition-all duration-250 hover:bg-parchment-100/70 hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-charcoal-subtle font-semibold transition-colors group-hover:text-terracotta">2</span>
                      <div className="w-7 h-9 rounded bg-emerald-900/10 overflow-hidden shadow-sm shrink-0 border border-slate-200 transition-transform duration-300 group-hover:scale-105">
                        <div className="w-full h-full bg-[#18363F] flex items-center justify-center text-[7px] font-display text-white text-center p-0.5">DC</div>
                      </div>
                      <div>
                        <p className="font-display font-semibold text-slate-ink group-hover:text-terracotta transition-colors leading-tight">Dom Casmurro</p>
                        <p className="text-[11px] text-charcoal-muted">Machado de Assis</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-1 text-[11px] text-charcoal-muted transition-transform duration-300 group-hover:scale-105">
                      <span className="text-amber-500 font-bold">★ 4.8</span>
                      <span>• 58k</span>
                    </div>
                  </div>

                  {/* Item 3: Quincas Borba */}
                  <div 
                    onClick={() => openBookById('quincas-borba')}
                    className="flex items-center justify-between gap-3 text-xs py-1.5 px-2 -mx-2 rounded-xl group cursor-pointer transition-all duration-250 hover:bg-parchment-100/70 hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-charcoal-subtle font-semibold transition-colors group-hover:text-terracotta">3</span>
                      <div className="w-7 h-9 rounded bg-[#843e2b] overflow-hidden shadow-sm shrink-0 flex items-center justify-center text-[7px] font-display text-white text-center p-0.5 transition-transform duration-300 group-hover:scale-105">
                        QB
                      </div>
                      <div>
                        <p className="font-display font-semibold text-slate-ink group-hover:text-terracotta transition-colors leading-tight">Quincas Borba</p>
                        <p className="text-[11px] text-charcoal-muted">Machado de Assis</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-1 text-[11px] text-charcoal-muted transition-transform duration-300 group-hover:scale-105">
                      <span className="text-amber-500 font-bold">★ 4.7</span>
                      <span>• 19k</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* ================= COLUNA DA DIREITA (7 Colunas) ================= */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* SEÇÃO: AUTORES EM DESTAQUE */}
                <section id="autores">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-2xl font-bold text-slate-ink">
                      Autores em Destaque
                    </h2>
                    <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-muted">
                      <button aria-label="Autor anterior" className="p-1 rounded-full border border-parchment-300 hover:bg-white hover:border-slate-400 active:scale-90 text-charcoal transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                      </button>
                      <button aria-label="Próximo autor" className="p-1 rounded-full border border-parchment-300 hover:bg-white hover:border-slate-400 active:scale-90 text-charcoal transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                      </button>
                    </div>
                  </div>

                  {/* Cards Verticais de Autores */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Autor 1: Machado de Assis */}
                    <div 
                      onClick={() => openBookById('memorias-posthumas')}
                      className="stagger-author-1 group bg-white rounded-2xl p-3 shadow-card-soft hover:shadow-card-hover transition-all duration-400 border border-parchment-200 flex flex-col cursor-pointer hover:-translate-y-1.5"
                    >
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 relative">
                        <img alt="Machado de Assis" className="w-full h-full object-cover object-top filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105" src="/Machado_de_Assis_aos_57_anos.jpg" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                      <div className="pt-3 pb-1 text-left">
                        <h3 className="font-display font-bold text-sm text-slate-ink group-hover:text-terracotta transition-colors truncate">
                          Machado de Assis
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted mt-1 font-medium">
                          <span className="text-amber-500 font-bold">★ 4.9</span>
                          <span>• 38k leituras</span>
                        </div>
                      </div>
                    </div>

                    {/* Autor 2: Lima Barreto */}
                    <div className="stagger-author-2 group bg-white rounded-2xl p-3 shadow-card-soft hover:shadow-card-hover transition-all duration-400 border border-parchment-200 flex flex-col cursor-pointer hover:-translate-y-1.5">
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 relative">
                        <img alt="Lima Barreto" className="w-full h-full object-cover filter grayscale contrast-110 sepia-[0.25] transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCffM3ijmhFKqIkCUpuFXU7BmgT57AIWiH6Yl9UYZZ6zgaYvBESzI7fsxN3rhl1jwAAHB1N0EuOIjlEU5wRMk3RswwquP8uoDiWInRAyrZQ0eriZDMzcCL2TK5z4ASalJlbZt4XebXu0zlxGh0-7wMkJOlglk_gcjwhC1QdPa-kqZ9HtbyvBnTm3ONmxy99fRMfZO0K73GZDTh7Ymd-May_o1Vb903NByZ90uy1S-Nl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                      <div className="pt-3 pb-1 text-left">
                        <h3 className="font-display font-bold text-sm text-slate-ink group-hover:text-terracotta transition-colors truncate">
                          Lima Barreto
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted mt-1 font-medium">
                          <span className="text-amber-500 font-bold">★ 4.8</span>
                          <span>• 22k leituras</span>
                        </div>
                      </div>
                    </div>

                    {/* Autor 3: Raul Pompéia */}
                    <div className="stagger-author-3 group bg-white rounded-2xl p-3 shadow-card-soft hover:shadow-card-hover transition-all duration-400 border border-parchment-200 flex flex-col cursor-pointer hover:-translate-y-1.5">
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 relative">
                        <img alt="Raul Pompéia" className="w-full h-full object-cover filter grayscale contrast-125 sepia-[0.2] transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtXgOZiXgWL7OurHWQfvMXA9cxaGzfVaEoHjbVdfy6qpYIEFCaz1xa_OdKyPfmWrhkbXjSUB4JmyWNSQuCxloLTRpHbiYV94DhIrjNe6G5LDRdYjwDORw_nXdXMyzYtfliaoykted2ErIdSf7tpPu_sposwujCLwukN96Tfz1Y-eB9ozgV-50D-xv4Iwiv6j7ERWWILMxzMrHdEM0hwKl0o8hdIiW0y_e8iEblzgIl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                      <div className="pt-3 pb-1 text-left">
                        <h3 className="font-display font-bold text-sm text-slate-ink group-hover:text-terracotta transition-colors truncate">
                          Raul Pompéia
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted mt-1 font-medium">
                          <span className="text-amber-500 font-bold">★ 4.7</span>
                          <span>• 16k leituras</span>
                        </div>
                      </div>
                    </div>

                    {/* Autor 4: Olavo Bilac */}
                    <div className="stagger-author-4 group bg-white rounded-2xl p-3 shadow-card-soft hover:shadow-card-hover transition-all duration-400 border border-parchment-200 flex flex-col cursor-pointer hover:-translate-y-1.5">
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 relative">
                        <img alt="Olavo Bilac" className="w-full h-full object-cover filter grayscale contrast-110 sepia-[0.3] transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKowCIDjWFFDPC7oGAb7YisdJQcA_BtFf34oJoaVbERHyLL10ZusPLn8koHtjSl-dW8GpPMeRxo9dp50HUv3TP6G9m5SSGv4qUDvat-z4TiCywhSYkCUS9lTqh_WINLnRqHPu3V-gUhOv18Kn3BQTzNTflVTZXglnLsUw2ZViJhLIeT-qLr5fpM0k3dEEDi5TuTYnQCPl9EN7FdLMzKATntMBTKkwrlHZV9aoCyrPF" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                      <div className="pt-3 pb-1 text-left">
                        <h3 className="font-display font-bold text-sm text-slate-ink group-hover:text-terracotta transition-colors truncate">
                          Olavo Bilac
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted mt-1 font-medium">
                          <span className="text-amber-500 font-bold">★ 4.6</span>
                          <span>• 12k leituras</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SEÇÃO: OBRAS CANÔNICAS (3 Colunas) */}
                <section id="obras">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-slate-ink">
                        Obras Canônicas
                      </h2>
                      <p className="font-cormorant italic text-sm text-charcoal-muted">
                        Volumes integrais com anotações e edições fac-símile
                      </p>
                    </div>
                    <a className="group text-xs font-semibold text-terracotta hover:text-slate-ink transition-all uppercase tracking-wider inline-flex items-center gap-1" href="#obras">
                      Ver Todas ({CANONICAL_BOOKS.length}) <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>

                  {/* Cards de Livros com Efeito Sheen e Tilt 3D */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {CANONICAL_BOOKS.slice(0, 3).map((book, idx) => (
                      <BookCard 
                        key={book.id} 
                        book={book} 
                        index={idx}
                        onSelectBook={setSelectedBook} 
                      />
                    ))}
                  </div>
                </section>

              </div>
            </main>

            {/* 3. SEÇÃO INFERIOR: CADERNO DE LEITURA & ANOTAÇÕES MARGINAIS */}
            <ReadingLog onOpenBook={openBookById} />

            {/* 4. FOOTER / COLOFÃO EDITORIAL */}
            <footer className="mt-16 pt-10 pb-8 border-t border-parchment-300/60 text-xs text-charcoal-muted">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-slate-ink uppercase tracking-widest">Eterno Retorno</span>
                  <span>·</span>
                  <span>Acervo Histórico e Biblioteca Aberta do Século XIX</span>
                </div>
                <div className="flex items-center gap-6 text-[11px] font-mono">
                  <span>Depósito Legal: Arquivo Público</span>
                  <a 
                    className="text-terracotta hover:text-slate-ink transition-colors uppercase tracking-wider font-semibold active:scale-95 inline-block" 
                    href="#inicio"
                  >
                    Voltar ao topo ↑
                  </a>
                </div>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
