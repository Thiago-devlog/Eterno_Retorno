import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  List, 
  Settings2, 
  X, 
  BookOpen, 
  Maximize2, 
  Minimize2,
  Type,
  Highlighter
} from 'lucide-react';
import { createEpubRendition, applyReaderThemes } from '../../services/epubService.js';

export default function EpubReader({ 
  book, 
  onClose, 
  onLocationChanged, 
  onTextSelected 
}) {
  const viewerRef = useRef(null);
  const bookInstanceRef = useRef(null);
  const renditionInstanceRef = useRef(null);

  // Estados de Carregamento & Navegação
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [toc, setToc] = useState([]);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentCfi, setCurrentCfi] = useState(null);

  // Controles Editoriais
  const [fontSize, setFontSize] = useState(105); // percentual
  const [fontFamily, setFontFamily] = useState('Merriweather'); // 'Merriweather' | 'Plus Jakarta Sans'
  const [theme, setTheme] = useState('parchment'); // 'parchment' | 'night' | 'clear'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectionNotice, setSelectionNotice] = useState(null);

  // Inicialização do EPUB
  useEffect(() => {
    if (!book || !viewerRef.current) return;

    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);

    try {
      const { book: epubBook, rendition } = createEpubRendition(
        book.epubUrl,
        viewerRef.current,
        {},
        fontFamily
      );

      bookInstanceRef.current = epubBook;
      renditionInstanceRef.current = rendition;

      rendition.themes.select(theme);
      rendition.themes.fontSize(`${fontSize}%`);

      // Sumário (Table of Contents)
      epubBook.loaded.navigation
        .then((nav) => {
          if (isMounted && nav && nav.toc) {
            setToc(nav.toc);
          }
        })
        .catch((err) => console.warn('Erro ao carregar TOC:', err));

      // Localizações e cálculo de progresso
      epubBook.ready
        .then(() => epubBook.locations.generate(1024))
        .then(() => {
          if (isMounted && renditionInstanceRef.current) {
            const loc = renditionInstanceRef.current.currentLocation();
            if (loc && loc.start) {
              const currentPercent = epubBook.locations.percentageFromCfi(loc.start.cfi);
              const pct = Math.round((currentPercent || 0) * 100);
              setProgress(pct);
              setCurrentCfi(loc.start.cfi);
              onLocationChanged?.(loc.start.cfi, pct);
            }
          }
        })
        .catch((err) => console.warn('Erro nas localizações:', err));

      // Evento de Mudança de Página (Relocated)
      rendition.on('relocated', (location) => {
        if (!isMounted || !location || !location.start) return;

        const cfi = location.start.cfi;
        setCurrentCfi(cfi);

        let pct = progress;
        if (epubBook.locations && epubBook.locations.length() > 0) {
          const calcPct = epubBook.locations.percentageFromCfi(cfi);
          pct = Math.round((calcPct || 0) * 100);
          setProgress(pct);
        }

        // Emite callback para futura sincronização com Firestore
        onLocationChanged?.(cfi, pct);

        // Identifica capítulo atual
        if (location.start.href) {
          const cleanHref = location.start.href.split('#')[0];
          const matchedItem = toc.find((item) => item.href.includes(cleanHref));
          if (matchedItem) {
            setCurrentChapter(matchedItem.label.trim());
          }
        }
      });

      // Captura de Seleção de Texto (para Grifos / Notas)
      rendition.on('selected', (cfiRange, contents) => {
        if (!isMounted) return;
        const text = rendition.getRange(cfiRange)?.toString() || '';
        if (text.trim().length > 0) {
          setSelectionNotice(`"${text.slice(0, 40)}..."`);
          setTimeout(() => setSelectionNotice(null), 3000);
          onTextSelected?.(text, cfiRange);
        }
      });

      // Renderiza primeira página
      rendition
        .display()
        .then(() => {
          if (isMounted) setIsLoading(false);
        })
        .catch((err) => {
          if (isMounted) {
            console.error('Erro na renderização do EPUB:', err);
            setLoadError('Não foi possível renderizar a edição do EPUB.');
            setIsLoading(false);
          }
        });

    } catch (err) {
      console.error('Falha ao inicializar o leitor:', err);
      setLoadError('Erro ao inicializar o leitor.');
      setIsLoading(false);
    }

    // Atalhos de teclado
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);

      if (renditionInstanceRef.current) {
        try {
          renditionInstanceRef.current.destroy();
        } catch (_) {}
      }
      if (bookInstanceRef.current) {
        try {
          bookInstanceRef.current.destroy();
        } catch (_) {}
      }
    };
  }, [book.epubUrl]);

  // Atualização reativa de temas
  useEffect(() => {
    if (renditionInstanceRef.current) {
      applyReaderThemes(renditionInstanceRef.current, fontFamily);
      renditionInstanceRef.current.themes.select(theme);
    }
  }, [theme, fontFamily]);

  // Atualização do tamanho de fonte
  useEffect(() => {
    if (renditionInstanceRef.current) {
      renditionInstanceRef.current.themes.fontSize(`${fontSize}%`);
    }
  }, [fontSize]);

  const handleNext = () => {
    if (renditionInstanceRef.current) {
      renditionInstanceRef.current.next();
    }
  };

  const handlePrev = () => {
    if (renditionInstanceRef.current) {
      renditionInstanceRef.current.prev();
    }
  };

  const handleJumpToChapter = (href) => {
    if (renditionInstanceRef.current) {
      renditionInstanceRef.current.display(href);
      setIsTocOpen(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Cores dinâmicas para a casca do leitor
  const shellTheme = {
    parchment: {
      bg: 'bg-parchment text-slate-ink',
      header: 'bg-parchment-50/95 border-parchment-border/70 text-slate-ink',
      bookCard: 'bg-white border-parchment-border/70 shadow-card-soft',
      btnHover: 'hover:bg-black/5',
      divider: 'bg-parchment-border/80'
    },
    night: {
      bg: 'bg-[#14161A] text-[#E2DFD8]',
      header: 'bg-[#1A1D23]/95 border-[#2A2E39] text-[#E2DFD8]',
      bookCard: 'bg-[#181B22] border-[#2A2E39] shadow-2xl',
      btnHover: 'hover:bg-white/5',
      divider: 'bg-[#2A2E39]'
    },
    clear: {
      bg: 'bg-[#F9FAFB] text-slate-900',
      header: 'bg-white/95 border-slate-200 text-slate-900',
      bookCard: 'bg-white border-slate-200 shadow-card-soft',
      btnHover: 'hover:bg-slate-100',
      divider: 'bg-slate-200'
    }
  }[theme];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-50 flex flex-col select-none ${shellTheme.bg}`}
    >
      {/* 1. Header do Leitor: Navegação de Retorno & Controles */}
      <header className={`h-16 px-4 sm:px-8 border-b flex items-center justify-between backdrop-blur-md z-20 ${shellTheme.header}`}>
        
        {/* Retorno ao Acervo & Metadados */}
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            onClick={onClose}
            className={`inline-flex items-center gap-2 text-xs font-sans font-medium text-slate-ink-soft hover:text-terracotta py-1.5 px-3 rounded-editorial transition-colors ${shellTheme.btnHover}`}
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
            <span className="font-semibold">Voltar ao Acervo</span>
          </button>
          
          <div className={`h-4 w-px ${shellTheme.divider} hidden sm:block`} />

          <div className="min-w-0">
            <h2 className="font-display text-sm font-semibold truncate leading-tight">
              {book.title}
            </h2>
            {currentChapter && (
              <p className="text-[11px] font-sans opacity-70 truncate">
                {currentChapter}
              </p>
            )}
          </div>
        </div>

        {/* Controles da Barra Minimalista */}
        <div className="flex items-center gap-2">
          
          {/* Sumário / Capítulos */}
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            title="Sumário de Capítulos"
            className={`p-2 rounded-editorial transition-colors flex items-center gap-1.5 text-xs font-sans font-medium ${shellTheme.btnHover} ${isTocOpen ? 'text-terracotta font-semibold' : ''}`}
          >
            <List className="w-4 h-4 stroke-[1.8]" />
            <span className="hidden md:inline">Índice</span>
          </button>

          {/* Ajustes Editoriais */}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            title="Ajustes Tipográficos"
            className={`p-2 rounded-editorial transition-colors ${shellTheme.btnHover} ${isSettingsOpen ? 'text-terracotta' : ''}`}
          >
            <Settings2 className="w-4 h-4 stroke-[1.8]" />
          </button>

          {/* Tela Cheia */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            className={`p-2 rounded-editorial transition-colors hidden sm:block ${shellTheme.btnHover}`}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 stroke-[1.8]" />
            ) : (
              <Maximize2 className="w-4 h-4 stroke-[1.8]" />
            )}
          </button>
        </div>
      </header>

      {/* Popover de Controles Editoriais */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-16 right-4 sm:right-8 z-30 w-72 p-5 rounded-editorial border shadow-modal backdrop-blur-md ${shellTheme.header}`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-current/10 mb-4">
              <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-terracotta">
                Tipografia &amp; Atmosfera
              </span>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 opacity-60 hover:opacity-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Ajuste de Tamanho de Fonte (A- / A+) */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-sans mb-2 opacity-80 font-medium">
                <span>Escala da Letra</span>
                <span className="font-mono">{fontSize}%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontSize(Math.max(85, fontSize - 10))}
                  className="flex-1 py-1.5 px-2 rounded border border-current/20 text-xs font-sans font-semibold hover:bg-black/5 transition-colors"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize(105)}
                  className="py-1.5 px-3 rounded border border-current/20 text-xs font-sans hover:bg-black/5 transition-colors"
                >
                  Padrão
                </button>
                <button
                  onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                  className="flex-1 py-1.5 px-2 rounded border border-current/20 text-xs font-sans font-semibold hover:bg-black/5 transition-colors"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Alternância de Família Tipográfica */}
            <div className="mb-4">
              <span className="text-xs font-sans block mb-2 opacity-80 font-medium">
                Fonte de Leitura
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFontFamily('Merriweather')}
                  className={`py-1.5 px-2 text-center rounded border text-xs font-reader transition-all ${
                    fontFamily === 'Merriweather'
                      ? 'border-terracotta text-terracotta font-semibold bg-terracotta/5'
                      : 'border-current/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  Merriweather
                </button>
                <button
                  onClick={() => setFontFamily('Plus Jakarta Sans')}
                  className={`py-1.5 px-2 text-center rounded border text-xs font-sans transition-all ${
                    fontFamily === 'Plus Jakarta Sans'
                      ? 'border-terracotta text-terracotta font-semibold bg-terracotta/5'
                      : 'border-current/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  Jakarta Sans
                </button>
              </div>
            </div>

            {/* Tema Visual de Papel / Pergaminho */}
            <div>
              <span className="text-xs font-sans block mb-2 opacity-80 font-medium">
                Papel &amp; Iluminação
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme('parchment')}
                  className={`py-2 px-1 text-center rounded border text-xs font-sans transition-all ${
                    theme === 'parchment'
                      ? 'border-terracotta ring-1 ring-terracotta bg-[#FDFBF7] text-[#0F172A]'
                      : 'border-current/20 bg-[#FDFBF7] text-[#0F172A] opacity-80'
                  }`}
                >
                  Pergaminho
                </button>

                <button
                  onClick={() => setTheme('clear')}
                  className={`py-2 px-1 text-center rounded border text-xs font-sans transition-all ${
                    theme === 'clear'
                      ? 'border-terracotta ring-1 ring-terracotta bg-white text-slate-900'
                      : 'border-current/20 bg-white text-slate-900 opacity-80'
                  }`}
                >
                  Alvo
                </button>

                <button
                  onClick={() => setTheme('night')}
                  className={`py-2 px-1 text-center rounded border text-xs font-sans transition-all ${
                    theme === 'night'
                      ? 'border-terracotta ring-1 ring-terracotta bg-[#16181D] text-[#E2DFD8]'
                      : 'border-current/20 bg-[#16181D] text-[#E2DFD8] opacity-80'
                  }`}
                >
                  Noturno
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer com Sumário (TOC) */}
      <AnimatePresence>
        {isTocOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTocOpen(false)}
              className="fixed inset-0 bg-black z-30"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed top-0 bottom-0 left-0 w-80 sm:w-96 z-40 flex flex-col border-r shadow-2xl ${shellTheme.header}`}
            >
              <div className="h-16 px-6 border-b border-current/10 flex items-center justify-between">
                <div>
                  <span className="font-display text-base font-semibold">
                    Sumário
                  </span>
                  <p className="text-[10px] font-sans opacity-60 uppercase tracking-wider">
                    {book.title}
                  </p>
                </div>
                <button
                  onClick={() => setIsTocOpen(false)}
                  className="p-1.5 opacity-60 hover:opacity-100 rounded hover:bg-black/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {toc.length === 0 ? (
                  <p className="text-xs font-sans opacity-60 p-4 text-center">
                    Mapeando capítulos da edição...
                  </p>
                ) : (
                  toc.map((item, idx) => (
                    <button
                      key={item.id || idx}
                      onClick={() => handleJumpToChapter(item.href)}
                      className="w-full text-left py-2.5 px-3 rounded hover:bg-black/5 text-xs font-sans transition-colors line-clamp-1 border-b border-current/5"
                    >
                      {item.label?.trim() || `Capítulo ${idx + 1}`}
                    </button>
                  ))
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Notificação sutil de texto selecionado para anotação */}
      <AnimatePresence>
        {selectionNotice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg border border-terracotta/40 flex items-center gap-2"
          >
            <Highlighter className="w-3.5 h-3.5 text-terracotta" />
            <span>Trecho capturado para anotação: {selectionNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Viewport Central de Leitura: Confinamento Ergonômico de Coluna (640px-740px) */}
      <main className="flex-1 relative flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        
        {/* Paginação Anterior Flutuante */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          title="Página Anterior (Seta Esquerda)"
          className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/5 hover:bg-terracotta hover:text-white transition-all backdrop-blur-sm opacity-70 hover:opacity-100 shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2]" />
        </motion.button>

        {/* Moldura de Livro Físico Diagramado */}
        <div className={`w-full max-w-[740px] h-[92%] relative rounded-editorial border ${shellTheme.bookCard} overflow-hidden flex flex-col justify-center`}>
          
          {/* Skeleton de Carregamento Editorial */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-inherit space-y-3">
              <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
              <p className="font-display text-sm italic opacity-80">
                Restaurando edição histórica...
              </p>
            </div>
          )}

          {/* Tratamento de Erro */}
          {loadError && (
            <div className="p-8 text-center text-xs font-sans text-red-700 bg-red-50 rounded border border-red-200">
              <p className="font-semibold">{loadError}</p>
              <button 
                onClick={onClose}
                className="mt-3 px-3 py-1.5 bg-white border border-red-300 rounded text-red-800 hover:bg-red-50"
              >
                Voltar ao Acervo
              </button>
            </div>
          )}

          {/* Container DOM para epubjs renderizar */}
          <div 
            ref={viewerRef} 
            className="w-full h-full"
            style={{ minHeight: '400px' }}
          />
        </div>

        {/* Paginação Próxima Flutuante */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          title="Próxima Página (Seta Direita)"
          className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/5 hover:bg-terracotta hover:text-white transition-all backdrop-blur-sm opacity-70 hover:opacity-100 shadow-sm"
        >
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </motion.button>
      </main>

      {/* 3. Rodapé do Leitor: Progresso e Indicadores Táteis */}
      <footer className={`h-12 px-6 border-t flex items-center justify-between text-xs font-sans ${shellTheme.header}`}>
        <div className="flex items-center gap-2 opacity-70">
          <BookOpen className="w-3.5 h-3.5 text-terracotta" />
          <span className="hidden sm:inline">Navegue pelas setas laterais ou setas do teclado</span>
        </div>

        {/* Barra de Progresso Fina */}
        <div className="flex items-center gap-3">
          <div className="w-24 sm:w-44 h-1.5 bg-black/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-terracotta transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-[11px] font-semibold text-terracotta">
            {progress}%
          </span>
        </div>
      </footer>
    </motion.div>
  );
}

