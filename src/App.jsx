import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EpubReader from './components/Reader/EpubReader.jsx';
import { CANONICAL_BOOKS } from './data/books.js';

// Lista de Mestres do Séc. XIX para alternância dinâmica no Hero
const HERO_AUTHORS = [
  {
    author: 'Machado de Assis',
    title: 'Mestres do Realismo',
    sub: 'Século XIX no Brasil',
    count: 'Mais de 1.200 capítulos e edições históricas',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvbpjpQX_7nUMEKqIKl8XnMQL1ZQ46vs8pr7gShzs_Yq_01D2eOG0bw_urOQdncUKitJcxbcFIFactSGssQPXi-hJU6vwTedE3EFAi-Ijhrdb71C9s7RYWbywDjNOwAz0UfOWSdxRDjRDfZLM_GvPKNT5nKnoDwv0ykbNceZaF09YU6yI731Hq63_WjAmIzUJUPkiSI6XKnr_4KO3LFt2anG7DbFT84cOgLkM6pD5985Ov6FswErqHhw',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArBFmuv8zsWSJp9bM6z1I-Jjd2oLoJHFdxf9hd664wNKllUi4in4Fjle0n4WRXeKjb2dpzow6bSVEA3siYpR9vkCSHwztnAIR2yAQFKohkUSdqSzDp2XI1QRXEItAjIFgLR2z9siCSmZS0TKcg1WQQr4q62-bfrKCqQ41K6UJRshaxIfvFuAE4hc6pZVjJG0VKddcTHHRXh9FEKOP-wlXL1uaiHUmc-MQRtuoIdfKiM_euGip0YFWqYA'
  },
  {
    author: 'José de Alencar',
    title: 'Romantismo e Brasilidade',
    sub: 'Fundações Nacionais do Séc. XIX',
    count: '940 capítulos e romances indigenistas',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZaVdm2KMN-gveL0c3jbkiBqDeBphxO-NGdgmlaSjUlK2my2TVWbwLDwBMKYtypG-gW6bZSZTYm_ElSLO6mIOe2FS76KfWRu-ZA7HC7RdYSxsup01bsyh542hQpIhSPQGvs6rEOtIvbGReLJ9mNBkeg1iSGzQ7YSDYVS-gLCe2AybggSGQ8PHI3j0BexG3WF-Uf-1XQembrWh9YD_JdrV7BnaplF95L-nrJYW_YIY',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZaVdm2KMN-gveL0c3jbkiBqDeBphxO-NGdgmlaSjUlK2my2TVWbwLDwBMKYtypG-gW6bZSZTYm_ElSLO6mIOe2FS76KfWRu-ZA7HC7RdYSxsup01bsyh542hQpIhSPQGvs6rEOtIvbGReLJ9mNBkeg1iSGzQ7YSDYVS-gLCe2AybggSGQ8PHI3j0BexG3WF-Uf-1XQembrWh9YD_JdrV7BnaplF95L-nrJYW_YIY'
  },
  {
    author: 'Castro Alves',
    title: 'A Voz dos Escravos',
    sub: 'Poesia Condoreira & Liberdade',
    count: '320 poemas e manuscritos em versos',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX-c-103e86Ns4m8F4PuIjoyjzjh7Zp_w2_j871JxK23JDcOZfbe2vwFK8nOf2Eg_KrWDVY2IRh4DOBEJCJ-1rZefoAHwENauJeL1Rf4Flg2M0Xe5fh_lzm4G0NCVPkxCuP4LGdU_9D-Z9yP4eKCenFKyYImd0WtkaL01nQY8TshNPMykGx0TvmlF84h3IC__6aBPhM6JALW28Epg2P0ea98PEUvPMKWjQnNQE2pIl',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX-c-103e86Ns4m8F4PuIjoyjzjh7Zp_w2_j871JxK23JDcOZfbe2vwFK8nOf2Eg_KrWDVY2IRh4DOBEJCJ-1rZefoAHwENauJeL1Rf4Flg2M0Xe5fh_lzm4G0NCVPkxCuP4LGdU_9D-Z9yP4eKCenFKyYImd0WtkaL01nQY8TshNPMykGx0TvmlF84h3IC__6aBPhM6JALW28Epg2P0ea98PEUvPMKWjQnNQE2pIl'
  },
  {
    author: 'Aluísio Azevedo',
    title: 'O Cortiço e o Naturalismo',
    sub: 'O Fervo Urbano do Rio de Janeiro',
    count: '610 capítulos e crônicas sociais',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUlT1fhAB0eVkRPza4w1oXAvH0J8Qrv5ZJ2WZEAtBmaNcvkvTUuR2BHycT-vtHgNDzvEcCIbrJX4CfN3dyriG3Ti3rfKRHuUj6eQ-dTVGxLSBs_RbWnkRyHwoQFfkorzFynEA0bud5p8dttBMlYOAA9w9JqVLeWb0BY0hesLA3nAji_8Q74W8_HA96CuIlxs0JS4vvGRF6qhg7V0qd7WvXTmc5nBMSRFI0qTXYR27G',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUlT1fhAB0eVkRPza4w1oXAvH0J8Qrv5ZJ2WZEAtBmaNcvkvTUuR2BHycT-vtHgNDzvEcCIbrJX4CfN3dyriG3Ti3rfKRHuUj6eQ-dTVGxLSBs_RbWnkRyHwoQFfkorzFynEA0bud5p8dttBMlYOAA9w9JqVLeWb0BY0hesLA3nAji_8Q74W8_HA96CuIlxs0JS4vvGRF6qhg7V0qd7WvXTmc5nBMSRFI0qTXYR27G'
  },
  {
    author: 'Raul Pompeia',
    title: 'O Ateneu & Memórias',
    sub: 'Impressionismo Psicológico',
    count: '450 páginas de prosa primorosa',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfvhdE7IcNnlePyEqLFF8zyoBnQ6IyRWIhXPp_eKDrZGFF6fTuj29r0xiNDh4Bx9G5hotGacIV1LuP0Dj1EB-qCbtQqPKogRoI3lRoI-8nvyzlkNcz4R-zsoBBSCeqn1iio1jMCAFC-lNsCIbpIiGLyPIMTSadAt71o7Zf5XjcXma-PF8nOYAmb5gm6NtCMUR2zNa5UTJh_oRbB8WBxORQ4bmXx85aiQf4zG81lSH_',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfvhdE7IcNnlePyEqLFF8zyoBnQ6IyRWIhXPp_eKDrZGFF6fTuj29r0xiNDh4Bx9G5hotGacIV1LuP0Dj1EB-qCbtQqPKogRoI3lRoI-8nvyzlkNcz4R-zsoBBSCeqn1iio1jMCAFC-lNsCIbpIiGLyPIMTSadAt71o7Zf5XjcXma-PF8nOYAmb5gm6NtCMUR2zNa5UTJh_oRbB8WBxORQ4bmXx85aiQf4zG81lSH_'
  }
];

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentHeroAuthor, setCurrentHeroAuthor] = useState(HERO_AUTHORS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper para abrir obra por id
  const openBookById = (id) => {
    const found = CANONICAL_BOOKS.find((b) => b.id === id);
    if (found) setSelectedBook(found);
  };

  return (
    <div className="bg-[#FBF9F5] text-charcoal font-sans antialiased min-h-screen selection:bg-ochre-light selection:text-charcoal">
      
      {/* Transição Suave: Biblioteca Principal vs Leitor de EPUB */}
      <AnimatePresence mode="wait">
        {selectedBook ? (
          <EpubReader 
            key={selectedBook.id}
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onLocationChanged={(cfi, progress) => {
              console.log(`[Eterno Retorno] Progresso: ${progress}% (CFI: ${cfi})`);
            }}
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
            transition={{ duration: 0.3 }}
            className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6"
          >
            {/* 1. HEADER & NAVEGAÇÃO SUPERIOR */}
            <header className="flex items-center justify-between py-4 mb-8">
              {/* Top Left Logo */}
              <a className="flex items-center gap-3.5 group transition-transform duration-300 active:scale-95" href="#inicio">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-slate-800 group-hover:shadow-md">
                  <svg className="w-5 h-5 text-amber-300 transition-transform duration-300 group-hover:rotate-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 2h11a2 2 0 0 1 2 2v15a1 1 0 0 1-1.447.894L12 17.118l-5.553 2.776A1 1 0 0 1 5 19V4a2 2 0 0 1 2-2zm0 2v13.382l5.105-2.553a1 1 0 0 1 .895 0L17 17.382V4H6z"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg sm:text-xl tracking-tight leading-none text-slate-900 uppercase group-hover:text-ochre-aged transition-colors duration-300">
                    Eterno Retorno
                  </span>
                  <span className="text-[10px] uppercase font-jakarta tracking-[0.22em] text-charcoal-muted font-semibold mt-1">
                    Biblioteca Clássica
                  </span>
                </div>
              </a>

              {/* Center Navigation Links */}
              <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-charcoal-muted">
                <a className="text-slate-900 font-semibold relative py-1 group/link" href="#inicio">
                  Início
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900 rounded-full transition-all duration-300"></span>
                </a>
                <a className="hover:text-slate-900 transition-colors py-1 relative group/link" href="#autores">
                  Autores do Séc. XIX
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 rounded-full transition-all duration-300 group-hover/link:w-full"></span>
                </a>
                <a className="hover:text-slate-900 transition-colors py-1 relative group/link" href="#obras">
                  Catálogo Canônico
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 rounded-full transition-all duration-300 group-hover/link:w-full"></span>
                </a>
                <a className="hover:text-slate-900 transition-colors py-1 relative group/link" href="#caderno">
                  Caderno de Notas
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 rounded-full transition-all duration-300 group-hover/link:w-full"></span>
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
                    <span className="text-xs font-semibold text-slate-900 leading-tight">Machado de Assis</span>
                    <span className="text-[10px] text-charcoal-muted">Leitor Canônico</span>
                  </div>
                  <svg className="w-4 h-4 text-charcoal-muted ml-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                  </svg>
                </div>
              </div>
            </header>

            {/* 2. SEÇÃO SUPERIOR DIVIDIDA (GRID COUNTRY BOOKS STYLE) */}
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="inicio">
              
              {/* ================= COLUNA DA ESQUERDA (5 Colunas) ================= */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Hero Banner Escuro Arredondado */}
                <div className="relative bg-slate-950 text-white rounded-3xl p-7 sm:p-8 overflow-hidden shadow-dark-hero flex flex-col justify-between min-h-[360px] border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-2xl group/hero">
                  
                  {/* Radial & Gradient Glow Background */}
                  <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-md z-0 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-amber-950/30 z-0 pointer-events-none"></div>
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none hero-glow-pulse z-0"></div>

                  {/* Retrato do Autor com Suavização à Direita */}
                  <div className="absolute -right-6 top-0 bottom-0 w-3/5 pointer-events-none z-0 overflow-hidden">
                    <img 
                      alt="Mestre em Destaque" 
                      className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-70 mix-blend-luminosity transition-all duration-700 ease-out group-hover/hero:scale-105 group-hover/hero:opacity-85" 
                      src={currentHeroAuthor.img}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  </div>

                  {/* Conteúdo de Texto do Banner */}
                  <div className="relative z-10 max-w-[260px] sm:max-w-[280px]">
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.1] uppercase transition-all duration-500">
                      {currentHeroAuthor.title}
                    </h1>
                    <p className="font-sans text-xs text-slate-300 mt-2 font-medium tracking-wide flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                      {currentHeroAuthor.sub}
                    </p>
                  </div>

                  {/* Contador */}
                  <div className="relative z-10 pt-16">
                    <p className="text-[11px] font-sans text-slate-400 font-normal transition-colors group-hover/hero:text-slate-300">
                      {currentHeroAuthor.count}
                    </p>
                  </div>

                  {/* Linha de Avatares dos Autores para Alternância */}
                  <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
                    {HERO_AUTHORS.map((item) => {
                      const isActive = item.author === currentHeroAuthor.author;
                      return (
                        <button
                          key={item.author}
                          onClick={() => setCurrentHeroAuthor(item)}
                          className={
                            isActive
                              ? "flex items-center gap-2 bg-slate-800/90 rounded-full pl-1 pr-3 py-1 border border-amber-400/80 shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-slate-700 focus:outline-none"
                              : "group/av relative w-8 h-8 rounded-full bg-slate-800 overflow-hidden shrink-0 border border-slate-700/60 hover:border-amber-400 transition-all duration-300 hover:scale-115 focus:outline-none cursor-pointer"
                          }
                          title={item.author}
                        >
                          <img 
                            src={item.avatar} 
                            alt={item.author}
                            className={`w-full h-full object-cover ${isActive ? 'w-7 h-7 rounded-full object-top border border-amber-400' : 'filter grayscale sepia-[0.3]'}`}
                          />
                          {isActive && (
                            <span className="text-[11px] font-medium text-white tracking-wide">
                              {item.author}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                </div>

                {/* Barra de Pesquisa Integrada e Filtros Compactos */}
                <div className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-card-soft border border-parchment-200 flex flex-wrap sm:flex-nowrap items-center gap-2 transition-all duration-300 hover:shadow-md">
                  <div className="search-input-box flex items-center gap-2.5 flex-1 px-3 py-2 bg-[#FAF8F5] rounded-xl text-xs text-charcoal border border-transparent transition-all duration-300 focus-within:bg-white focus-within:border-ochre-aged/40 focus-within:ring-2 focus-within:ring-ochre-light/20">
                    <svg className="w-4 h-4 text-charcoal-muted transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                    <input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-0 p-0 text-xs text-charcoal placeholder:text-charcoal-subtle focus:ring-0 focus:outline-none" 
                      placeholder="Buscar autor ou obra..." 
                      type="text" 
                    />
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF8F5] rounded-xl text-xs text-charcoal font-medium cursor-pointer hover:bg-parchment-200/80 active:scale-95 transition-all duration-200 border border-transparent hover:border-parchment-300">
                    <span className="text-charcoal-muted text-[11px]">Tipo:</span>
                    <span className="font-semibold text-slate-900">Todos</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF8F5] rounded-xl text-xs text-charcoal font-medium cursor-pointer hover:bg-parchment-200/80 active:scale-95 transition-all duration-200 border border-transparent hover:border-parchment-300">
                    <span className="text-charcoal-muted text-[11px]">Séc:</span>
                    <span className="font-semibold text-slate-900">XIX</span>
                  </div>

                  <button 
                    onClick={() => {
                      if (searchQuery.trim()) {
                        const target = CANONICAL_BOOKS.find((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()));
                        if (target) setSelectedBook(target);
                      }
                    }}
                    className="bg-slate-950 text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-slate-800 active:scale-90 hover:shadow-md transition-all duration-200 shadow-sm shrink-0"
                  >
                    Ir
                  </button>
                </div>

                {/* Últimas Leituras Consultadas (Tabela Compacta) */}
                <div className="bg-white rounded-2xl p-5 shadow-card-soft border border-parchment-200 space-y-4 transition-all duration-300 hover:shadow-card-hover">
                  <div className="flex items-center justify-between pb-2 border-b border-parchment-200/60">
                    <span className="text-[11px] font-jakarta uppercase tracking-wider font-semibold text-charcoal-muted">Últimas consultas</span>
                    <span className="text-[11px] text-ochre-aged font-semibold cursor-pointer hover:underline transition-colors hover:text-slate-900">Ver histórico</span>
                  </div>

                  {/* Item 1: Memórias Póstumas */}
                  <div 
                    onClick={() => openBookById('memorias-posthumas')}
                    className="flex items-center justify-between gap-3 text-xs py-1.5 px-2 -mx-2 rounded-xl group cursor-pointer transition-all duration-250 hover:bg-parchment-100/70 hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-charcoal-subtle font-semibold transition-colors group-hover:text-ochre-aged">1</span>
                      <div className="w-7 h-9 rounded bg-parchment-200 overflow-hidden shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <img alt="Brás Cubas" className="w-full h-full object-cover" src="/Memorias_Posthumas_de_Braz_Cubas.jpg" />
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-slate-900 group-hover:text-ochre-aged transition-colors leading-tight">Memórias Póstumas</p>
                        <p className="text-[11px] text-charcoal-muted">Machado de Assis</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-1 text-[11px] text-charcoal-muted transition-transform duration-300 group-hover:scale-105">
                      <span className="text-amber-500 font-bold">★ 4.9</span>
                      <span className="">• 42k</span>
                    </div>
                  </div>

                  {/* Item 2: Dom Casmurro */}
                  <div 
                    onClick={() => openBookById('dom-casmurro')}
                    className="flex items-center justify-between gap-3 text-xs py-1.5 px-2 -mx-2 rounded-xl group cursor-pointer transition-all duration-250 hover:bg-parchment-100/70 hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-charcoal-subtle font-semibold transition-colors group-hover:text-ochre-aged">2</span>
                      <div className="w-7 h-9 rounded bg-emerald-900/10 overflow-hidden shadow-sm shrink-0 border border-slate-200 transition-transform duration-300 group-hover:scale-105">
                        <div className="w-full h-full bg-[#18363F] flex items-center justify-center text-[7px] font-serif text-white text-center p-0.5">DC</div>
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-slate-900 group-hover:text-ochre-aged transition-colors leading-tight">Dom Casmurro</p>
                        <p className="text-[11px] text-charcoal-muted">Machado de Assis</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-1 text-[11px] text-charcoal-muted transition-transform duration-300 group-hover:scale-105">
                      <span className="text-amber-500 font-bold">★ 4.8</span>
                      <span className="">• 58k</span>
                    </div>
                  </div>

                  {/* Item 3: Quincas Borba */}
                  <div 
                    onClick={() => openBookById('quincas-borba')}
                    className="flex items-center justify-between gap-3 text-xs py-1.5 px-2 -mx-2 rounded-xl group cursor-pointer transition-all duration-250 hover:bg-parchment-100/70 hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-charcoal-subtle font-semibold transition-colors group-hover:text-ochre-aged">3</span>
                      <div className="w-7 h-9 rounded bg-[#843e2b] overflow-hidden shadow-sm shrink-0 flex items-center justify-center text-[7px] font-serif text-white text-center p-0.5 transition-transform duration-300 group-hover:scale-105">
                        QB
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-slate-900 group-hover:text-ochre-aged transition-colors leading-tight">Quincas Borba</p>
                        <p className="text-[11px] text-charcoal-muted">Machado de Assis</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-1 text-[11px] text-charcoal-muted transition-transform duration-300 group-hover:scale-105">
                      <span className="text-amber-500 font-bold">★ 4.7</span>
                      <span className="">• 19k</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* ================= COLUNA DA DIREITA (7 Colunas) ================= */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* SEÇÃO: AUTORES EM DESTAQUE */}
                <section id="autores">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif text-2xl font-bold text-slate-900">
                      Autores em Destaque
                    </h2>
                    <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-muted">
                      <button aria-label="Autor anterior" className="p-1 rounded-full border border-parchment-300 hover:bg-white hover:border-slate-400 active:scale-90 text-charcoal transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                      </button>
                      <button aria-label="Próximo autor" className="p-1 rounded-full border border-parchment-300 hover:bg-white hover:border-slate-400 active:scale-90 text-charcoal transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                      </button>
                    </div>
                  </div>

                  {/* Cards Verticais de Autores */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Autor 1: Machado de Assis */}
                    <div 
                      onClick={() => openBookById('memorias-posthumas')}
                      className="group bg-white rounded-2xl p-3 shadow-card-soft hover:shadow-card-hover transition-all duration-400 border border-parchment-200 flex flex-col cursor-pointer hover:-translate-y-1.5"
                    >
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 relative">
                        <img alt="Machado de Assis" className="w-full h-full object-cover object-top filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105" src="/Machado_de_Assis_aos_57_anos.jpg" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>
                      <div className="pt-3 pb-1 text-left">
                        <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-ochre-aged transition-colors truncate">
                          Machado de Assis
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted mt-1 font-medium">
                          <span className="text-amber-500 font-bold">★ 4.9</span>
                          <span className="">• 38k leituras</span>
                        </div>
                      </div>
                    </div>

                    {/* Autor 2: Lima Barreto */}
                    <div className="group bg-white rounded-2xl p-3 shadow-card-soft hover:shadow-card-hover transition-all duration-400 border border-parchment-200 flex flex-col cursor-pointer hover:-translate-y-1.5">
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 relative">
                        <img alt="Lima Barreto" className="w-full h-full object-cover filter grayscale contrast-110 sepia-[0.25] transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCffM3ijmhFKqIkCUpuFXU7BmgT57AIWiH6Yl9UYZZ6zgaYvBESzI7fsxN3rhl1jwAAHB1N0EuOIjlEU5wRMk3RswwquP8uoDiWInRAyrZQ0eriZDMzcCL2TK5z4ASalJlbZt4XebXu0zlxGh0-7wMkJOlglk_gcjwhC1QdPa-kqZ9HtbyvBnTm3ONmxy99fRMfZO0K73GZDTh7Ymd-May_o1Vb903NByZ90uy1S-Nl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>
                      <div className="pt-3 pb-1 text-left">
                        <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-ochre-aged transition-colors truncate">
                          Lima Barreto
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted mt-1 font-medium">
                          <span className="text-amber-500 font-bold">★ 4.8</span>
                          <span className="">• 22k leituras</span>
                        </div>
                      </div>
                    </div>

                    {/* Autor 3: Raul Pompéia */}
                    <div className="group bg-white rounded-2xl p-3 shadow-card-soft hover:shadow-card-hover transition-all duration-400 border border-parchment-200 flex flex-col cursor-pointer hover:-translate-y-1.5">
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 relative">
                        <img alt="Raul Pompéia" className="w-full h-full object-cover filter grayscale contrast-125 sepia-[0.2] transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtXgOZiXgWL7OurHWQfvMXA9cxaGzfVaEoHjbVdfy6qpYIEFCaz1xa_OdKyPfmWrhkbXjSUB4JmyWNSQuCxloLTRpHbiYV94DhIrjNe6G5LDRdYjwDORw_nXdXMyzYtfliaoykted2ErIdSf7tpPu_sposwujCLwukN96Tfz1Y-eB9ozgV-50D-xv4Iwiv6j7ERWWILMxzMrHdEM0hwKl0o8hdIiW0y_e8iEblzgIl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>
                      <div className="pt-3 pb-1 text-left">
                        <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-ochre-aged transition-colors truncate">
                          Raul Pompéia
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted mt-1 font-medium">
                          <span className="text-amber-500 font-bold">★ 4.7</span>
                          <span className="">• 16k leituras</span>
                        </div>
                      </div>
                    </div>

                    {/* Autor 4: Olavo Bilac */}
                    <div className="group bg-white rounded-2xl p-3 shadow-card-soft hover:shadow-card-hover transition-all duration-400 border border-parchment-200 flex flex-col cursor-pointer hover:-translate-y-1.5">
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 relative">
                        <img alt="Olavo Bilac" className="w-full h-full object-cover filter grayscale contrast-110 sepia-[0.3] transition-transform duration-700 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKowCIDjWFFDPC7oGAb7YisdJQcA_BtFf34oJoaVbERHyLL10ZusPLn8koHtjSl-dW8GpPMeRxo9dp50HUv3TP6G9m5SSGv4qUDvat-z4TiCywhSYkCUS9lTqh_WINLnRqHPu3V-gUhOv18Kn3BQTzNTflVTZXglnLsUw2ZViJhLIeT-qLr5fpM0k3dEEDi5TuTYnQCPl9EN7FdLMzKATntMBTKkwrlHZV9aoCyrPF" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>
                      <div className="pt-3 pb-1 text-left">
                        <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-ochre-aged transition-colors truncate">
                          Olavo Bilac
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted mt-1 font-medium">
                          <span className="text-amber-500 font-bold">★ 4.6</span>
                          <span className="">• 12k leituras</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SEÇÃO: OBRAS CANÔNICAS (3 Colunas) */}
                <section id="obras">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-slate-900">
                        Obras Canônicas
                      </h2>
                      <p className="font-cormorant italic text-sm text-charcoal-muted">
                        Volumes integrais com anotações e edições fac-símile
                      </p>
                    </div>
                    <a className="group text-xs font-semibold text-ochre-aged hover:text-slate-900 transition-all uppercase tracking-wider inline-flex items-center gap-1" href="#obras">
                      Ver Todas ({CANONICAL_BOOKS.length}) <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>

                  {/* Cards de Livros com Efeito Sheen e Tilt 3D */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    
                    {/* Book 1: Memórias Póstumas */}
                    <div 
                      onClick={() => openBookById('memorias-posthumas')}
                      className="group canonical-book-card bg-white rounded-2xl p-3 shadow-card-soft border border-parchment-200 flex flex-col cursor-pointer"
                    >
                      <div className="book-cover-sheen relative w-full aspect-[3/4.4] rounded-xl overflow-hidden bg-parchment-100 border border-parchment-300 shadow-sm flex items-center justify-center p-2">
                        <img 
                          alt="Frontispício de Memórias Póstumas" 
                          className="w-full h-full object-contain filter sepia-[0.15] group-hover:scale-105 transition-transform duration-500" 
                          src="/Memorias_Posthumas_de_Braz_Cubas.jpg" 
                        />
                        <span className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-mono shadow-sm transition-transform duration-300 group-hover:scale-105">
                          1881
                        </span>
                      </div>
                      <div className="pt-3 pb-1">
                        <p className="text-[11px] text-charcoal-muted font-sans uppercase tracking-wider font-semibold">Machado de Assis</p>
                        <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-ochre-aged transition-colors leading-snug mt-0.5">
                          Memórias Póstumas
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mt-1.5">
                          <span className="text-amber-500 font-bold">★ 4.9</span>
                          <span className="">• 48k resenhas</span>
                        </div>
                      </div>
                    </div>

                    {/* Book 2: Dom Casmurro */}
                    <div 
                      onClick={() => openBookById('dom-casmurro')}
                      className="group canonical-book-card bg-white rounded-2xl p-3 shadow-card-soft border border-parchment-200 flex flex-col cursor-pointer"
                    >
                      <div className="book-cover-sheen relative w-full aspect-[3/4.4] rounded-xl overflow-hidden bg-[#18363F] border border-[#234d59] shadow-sm flex flex-col justify-between p-4 text-parchment-100">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-ochre-light font-mono">
                          <span>Edição Garnier</span>
                          <span className="bg-slate-900/40 px-1.5 py-0.5 rounded">1899</span>
                        </div>
                        <div className="text-center my-auto space-y-1">
                          <h4 className="font-serif text-lg font-bold tracking-wider text-parchment-50 uppercase leading-tight group-hover:scale-105 transition-transform duration-300">
                            Dom Casmurro
                          </h4>
                          <p className="font-cormorant italic text-xs text-amber-200">
                            Capitu &amp; Olhos de Ressaca
                          </p>
                        </div>
                        <div className="text-[9px] font-mono tracking-widest uppercase text-center text-parchment-300 border-t border-ochre/30 pt-1">
                          Rio de Janeiro
                        </div>
                      </div>
                      <div className="pt-3 pb-1">
                        <p className="text-[11px] text-charcoal-muted font-sans uppercase tracking-wider font-semibold">Machado de Assis</p>
                        <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-ochre-aged transition-colors leading-snug mt-0.5">
                          Dom Casmurro
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mt-1.5">
                          <span className="text-amber-500 font-bold">★ 4.8</span>
                          <span className="">• 54k resenhas</span>
                        </div>
                      </div>
                    </div>

                    {/* Book 3: Quincas Borba */}
                    <div 
                      onClick={() => openBookById('quincas-borba')}
                      className="group canonical-book-card bg-white rounded-2xl p-3 shadow-card-soft border border-parchment-200 flex flex-col cursor-pointer"
                    >
                      <div className="book-cover-sheen relative w-full aspect-[3/4.4] rounded-xl overflow-hidden bg-[#843e2b] border border-[#a2513c] shadow-sm flex flex-col justify-between p-4 text-parchment-100">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-parchment-200 font-mono">
                          <span>Humanitismo</span>
                          <span className="bg-slate-900/40 px-1.5 py-0.5 rounded text-amber-200">1891</span>
                        </div>
                        <div className="text-center my-auto space-y-1">
                          <h4 className="font-serif text-lg font-bold tracking-wider text-parchment-50 uppercase leading-tight group-hover:scale-105 transition-transform duration-300">
                            Quincas Borba
                          </h4>
                          <p className="font-cormorant italic text-xs text-amber-200">
                            “Ao vencedor, as batatas!”
                          </p>
                        </div>
                        <div className="text-[9px] font-mono tracking-widest uppercase text-center text-parchment-300 border-t border-ochre-light/30 pt-1">
                          Romance Psicológico
                        </div>
                      </div>
                      <div className="pt-3 pb-1">
                        <p className="text-[11px] text-charcoal-muted font-sans uppercase tracking-wider font-semibold">Machado de Assis</p>
                        <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-ochre-aged transition-colors leading-snug mt-0.5">
                          Quincas Borba
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mt-1.5">
                          <span className="text-amber-500 font-bold">★ 4.7</span>
                          <span className="">• 29k resenhas</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

              </div>
            </main>

            {/* 3. SEÇÃO INFERIOR: CADERNO DE LEITURA & ANOTAÇÕES MARGINAIS */}
            <section className="mt-16 pt-10 border-t border-parchment-300/80 space-y-10" id="caderno">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-mono text-ochre-aged font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Vigília &amp; Ritmo Solene
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-1 italic">
                    Maratona de Leitura &amp; Caderno de Registro
                  </h2>
                </div>
                <p className="font-cormorant italic text-base sm:text-lg text-charcoal-muted max-w-lg leading-relaxed">
                  Caderno orgânico de anotações, permanência silenciosa e o andamento das obras canônicas do século XIX em ritmo acolhedor.
                </p>
              </div>

              {/* Bloco Principal Integrado: Maratona + Painel Cozy de Vigília */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-parchment-200 shadow-card-soft space-y-10 study-card relative overflow-hidden">
                
                {/* Fitilho no Canto Superior */}
                <div className="absolute top-0 right-12 w-8 h-14 bg-gradient-to-b from-[#843e2b] to-[#a2513c] rounded-b-md shadow-md flex items-end justify-center pb-1.5 opacity-90 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80"></span>
                </div>

                {/* Destaques da Maratona Literária */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-parchment-100 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-slate-900 text-lg">Vigília Literária do Outono</span>
                      <span className="text-[11px] font-mono bg-parchment-100 text-ochre-aged px-2.5 py-0.5 rounded-full font-semibold border border-parchment-200">
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
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 group-hover:text-ochre-aged transition-colors">47</span>
                        <span className="text-xs font-serif italic text-charcoal-muted">dias</span>
                      </div>
                      <p className="text-[11px] text-ochre-aged font-semibold mt-2 flex items-center gap-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Fio ininterrupto
                      </p>
                    </div>

                    {/* Cartão 2: Horas Dedicadas */}
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/70 hover:border-amber-400/60 hover:shadow-sm transition-all duration-300 group cursor-default">
                      <div className="flex items-center justify-between text-charcoal-muted mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-charcoal-subtle">Tempo de Mergulho</span>
                        <span className="text-amber-500 font-serif text-lg font-bold group-hover:scale-110 transition-transform">⌛</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 group-hover:text-ochre-aged transition-colors">94h</span>
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
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 group-hover:text-ochre-aged transition-colors">1.842</span>
                      </div>
                      <p className="text-[11px] text-ochre-aged font-semibold mt-2 font-mono">
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
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 group-hover:text-ochre-aged transition-colors">116</span>
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
                        <span className="font-serif font-bold text-slate-900 text-sm">Progresso da Maratona em Curso:</span>
                        <span className="font-cormorant italic text-sm text-charcoal-muted">Trilogia Realista de Machado de Assis</span>
                      </div>
                      <span className="font-mono font-bold text-ochre-aged text-xs">78% Concluído (328/420 páginas alvo)</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-parchment-200 overflow-hidden p-0.5 border border-parchment-300/50">
                      <div className="h-full bg-gradient-to-r from-ochre-aged via-amber-500 to-amber-400 rounded-full transition-all duration-700" style={{ width: '78%' }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-charcoal-muted pt-0.5">
                      <span className="">Marco I: Brás Cubas (Concluído)</span>
                      <span className="">Marco II: Quincas Borba (Em andamento)</span>
                      <span className="">Marco III: Dom Casmurro</span>
                    </div>
                  </div>
                </div>

                {/* Histórico de Leitura & Progresso Canônico */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-parchment-100 mb-6">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-slate-900">
                        Histórico de Leitura &amp; Fichamento de Obras
                      </h3>
                      <p className="font-cormorant italic text-sm text-charcoal-muted mt-0.5">
                        Acompanhamento detalhado de cadernos, anotações de margem e ritmo nas edições históricas.
                      </p>
                    </div>
                    <a href="#obras" className="text-xs font-semibold text-ochre-aged hover:text-slate-900 transition-colors uppercase font-mono tracking-wider">
                      Ficha Completa →
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Obra 1: Memórias Póstumas */}
                    <div 
                      onClick={() => openBookById('memorias-posthumas')}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/80 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-16 rounded-lg overflow-hidden bg-parchment-200 shadow-sm shrink-0 border border-parchment-300 group-hover:scale-105 transition-transform duration-300">
                            <img src="/Memorias_Posthumas_de_Braz_Cubas.jpg" alt="Memórias Póstumas" className="w-full h-full object-cover filter sepia-[0.15]" />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">Machado de Assis · 1881</span>
                            <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-ochre-aged transition-colors leading-tight mt-0.5">
                              Memórias Póstumas
                            </h4>
                            <span className="text-[11px] font-serif italic text-ochre-aged block mt-1">“O delírio &amp; o emplasto”</span>
                          </div>
                        </div>
                        <div className="text-xs text-charcoal-muted space-y-1 py-2 border-t border-parchment-200/60 font-mono">
                          <div className="flex justify-between">
                            <span className="">Última sessão:</span>
                            <span className="text-slate-900 font-semibold">Cap. LXIV (pág. 142)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="">Notas marginais:</span>
                            <span className="text-slate-900 font-semibold">28 anotações</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 mt-3 border-t border-parchment-200/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-charcoal-muted">Progresso</span>
                          <span className="font-bold text-slate-900">82%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-parchment-200 overflow-hidden">
                          <div className="h-full bg-slate-950 rounded-full transition-all duration-500" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Obra 2: Quincas Borba */}
                    <div 
                      onClick={() => openBookById('quincas-borba')}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/80 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-16 rounded-lg overflow-hidden bg-[#843e2b] text-white p-1 text-center shadow-sm shrink-0 border border-[#a2513c] flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                            <span className="text-[8px] font-mono tracking-widest">1891</span>
                            <span className="text-[9px] font-serif font-bold uppercase leading-none">QB</span>
                            <span className="text-[7px] font-mono opacity-70">Gar.</span>
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">Machado de Assis · 1891</span>
                            <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-ochre-aged transition-colors leading-tight mt-0.5">
                              Quincas Borba
                            </h4>
                            <span className="text-[11px] font-serif italic text-ochre-aged block mt-1">“Ao vencedor, as batatas!”</span>
                          </div>
                        </div>
                        <div className="text-xs text-charcoal-muted space-y-1 py-2 border-t border-parchment-200/60 font-mono">
                          <div className="flex justify-between">
                            <span className="">Última sessão:</span>
                            <span className="text-slate-900 font-semibold">Cap. XXII (pág. 89)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="">Notas marginais:</span>
                            <span className="text-slate-900 font-semibold">14 anotações</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 mt-3 border-t border-parchment-200/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-charcoal-muted">Progresso</span>
                          <span className="font-bold text-amber-600">45%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-parchment-200 overflow-hidden">
                          <div className="h-full bg-amber-600 rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Obra 3: Dom Casmurro */}
                    <div 
                      onClick={() => openBookById('dom-casmurro')}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-parchment-200/80 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-16 rounded-lg overflow-hidden bg-[#18363F] text-white p-1 text-center shadow-sm shrink-0 border border-[#234d59] flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                            <span className="text-[8px] font-mono tracking-widest text-ochre-light">1899</span>
                            <span className="text-[9px] font-serif font-bold uppercase leading-none">DC</span>
                            <span className="text-[7px] font-mono opacity-70">RJ</span>
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">Machado de Assis · 1899</span>
                            <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-ochre-aged transition-colors leading-tight mt-0.5">
                              Dom Casmurro
                            </h4>
                            <span className="text-[11px] font-serif italic text-ochre-aged block mt-1">“Olhos de ressaca”</span>
                          </div>
                        </div>
                        <div className="text-xs text-charcoal-muted space-y-1 py-2 border-t border-parchment-200/60 font-mono">
                          <div className="flex justify-between">
                            <span className="">Última sessão:</span>
                            <span className="text-slate-900 font-semibold">Releitura concluída</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="">Notas marginais:</span>
                            <span className="text-slate-900 font-semibold">42 anotações</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 mt-3 border-t border-parchment-200/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-charcoal-muted">Progresso</span>
                          <span className="font-bold text-emerald-700">100% Concluído</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-parchment-200 overflow-hidden">
                          <div className="h-full bg-emerald-700 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* 4. FOOTER / COLOFÃO EDITORIAL */}
            <footer className="mt-16 pt-10 pb-8 border-t border-parchment-300/60 text-xs text-charcoal-muted">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-slate-900 uppercase tracking-widest">Eterno Retorno</span>
                  <span>·</span>
                  <span>Acervo Histórico e Biblioteca Aberta do Século XIX</span>
                </div>
                <div className="flex items-center gap-6 text-[11px] font-mono">
                  <span>Depósito Legal: Arquivo Público</span>
                  <a 
                    className="text-ochre-aged hover:text-slate-900 transition-colors uppercase tracking-wider font-semibold active:scale-95 inline-block" 
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
