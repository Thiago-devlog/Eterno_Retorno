import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  List, 
  Settings2, 
  X, 
  Sun, 
  Moon, 
  BookOpen, 
  Maximize2, 
  Minimize2,
  Bookmark
} from 'lucide-react';
import { createEpubRendition } from '../../services/epubService.js';

export default function ReaderModal({ book, onClose }) {
  const viewerRef = useRef(null);
  const bookInstanceRef = useRef(null);
  const renditionInstanceRef = useRef(null);

  // Estados do leitor
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [toc, setToc] = useState([]);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Customizações do leitor
  const [currentLocation, setCurrentLocation] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState('');
  const [fontSize, setFontSize] = useState(105); // percentual
  const [theme, setTheme] = useState('parchment'); // 'parchment' | 'night' | 'clear'
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Inicializa o EPUB ao montar o componente
  useEffect(() => {
    if (!book || !viewerRef.current) return;

    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);

    try {
      const { book: epubBook, rendition } = createEpubRendition(
        book.epubUrl,
        viewerRef.current
      );

      bookInstanceRef.current = epubBook;
      renditionInstanceRef.current = rendition;

      // Aplica tema e fonte inicial
      rendition.themes.select(theme);
      rendition.themes.fontSize(`${fontSize}%`);

      // Carrega sumário (TOC)
      epubBook.loaded.navigation
        .then((nav) => {
          if (isMounted && nav && nav.toc) {
            setToc(nav.toc);
          }
        })
        .catch((err) => console.warn('Erro ao carregar navegação do EPUB:', err));

      // Gera locations para calcular progresso percentual
      epubBook.ready
        .then(() => epubBook.locations.generate(1024))
        .then(() => {
          if (isMounted && renditionInstanceRef.current) {
            const loc = renditionInstanceRef.current.currentLocation();
            if (loc && loc.start) {
              const currentPercent = epubBook.locations.percentageFromCfi(loc.start.cfi);
              setProgress(Math.round((currentPercent || 0) * 100));
            }
          }
        })
        .catch((err) => console.warn('Erro ao gerar localizações:', err));

      // Evento de mudança de página/relocação
      rendition.on('relocated', (location) => {
        if (!isMounted) return;
        setCurrentLocation(location);

        if (epubBook.locations && epubBook.locations.length() > 0 && location.start) {
          const pct = epubBook.locations.percentageFromCfi(location.start.cfi);
          setProgress(Math.round((pct || 0) * 100));
        }

        // Tenta capturar o nome do capítulo ativo
        if (location.start && location.start.href) {
          const found = toc.find((item) => item.href.includes(location.start.href.split('#')[0]));
          if (found) setCurrentChapter(found.label.trim());
        }
      });

      // Renderiza a primeira página
      rendition
        .display()
        .then(() => {
          if (isMounted) setIsLoading(false);
        })
        .catch((err) => {
          if (isMounted) {
            console.error('Falha ao renderizar EPUB:', err);
            setLoadError('Não foi possível renderizar a edição do EPUB.');
            setIsLoading(false);
          }
        });

    } catch (err) {
      console.error('Erro na inicialização do livro:', err);
      setLoadError('Ocorreu um erro ao carregar o livro.');
      setIsLoading(false);
    }

    // Teclas de atalho (seta esquerda / seta direita / Esc)
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

  // Atualiza tema quando o estado mudar
  useEffect(() => {
    if (renditionInstanceRef.current) {
      renditionInstanceRef.current.themes.select(theme);
    }
  }, [theme]);

  // Atualiza tamanho da fonte
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

  // Cores de fundo e texto da casca conforme tema ativo
  const themeClasses = {
    parchment: 'bg-parchment text-slate-ink border-parchment-border/80',
    night: 'bg-[#16181D] text-[#E2DFD8] border-[#2A2E39]',
    clear: 'bg-[#FAFBFD] text-[#1E293B] border-slate-200'
  }[theme];

  const headerBgClasses = {
    parchment: 'bg-parchment-50/95 border-parchment-border/80 text-slate-ink',
    night: 'bg-[#1C1F26]/95 border-[#2A2E39] text-[#E2DFD8]',
    clear: 'bg-white/95 border-slate-200 text-slate-900'
  }[theme];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={`fixed inset-0 z-50 flex flex-col select-none ${themeClasses}`}
    >
      {/* Barra Superior de Ferramentas */}
      <header className={`h-16 px-4 sm:px-8 border-b flex items-center justify-between backdrop-blur-md z-20 ${headerBgClasses}`}>
        
        {/* Lado Esquerdo: Voltar & Título da Obra */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium hover:text-terracotta py-1.5 px-2.5 rounded hover:bg-black/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Acervo</span>
          </button>
          
          <div className="h-4 w-px bg-current opacity-20 hidden sm:block" />

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

        {/* Lado Direito: Sumário, Tipografia, Tela Cheia */}
        <div className="flex items-center gap-2">
          
          {/* Botão de Sumário / Capítulos */}
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            title="Sumário de Capítulos"
            className={`p-2 rounded hover:bg-black/5 transition-colors flex items-center gap-1.5 text-xs font-sans font-medium ${isTocOpen ? 'text-terracotta' : ''}`}
          >
            <List className="w-4 h-4 stroke-[1.8]" />
            <span className="hidden md:inline">Capítulos</span>
          </button>

          {/* Botão de Ajustes Tipográficos */}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            title="Ajustes de Leitura"
            className={`p-2 rounded hover:bg-black/5 transition-colors ${isSettingsOpen ? 'text-terracotta' : ''}`}
          >
            <Settings2 className="w-4 h-4 stroke-[1.8]" />
          </button>

          {/* Alternar Tela Cheia */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            className="p-2 rounded hover:bg-black/5 transition-colors hidden sm:block"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 stroke-[1.8]" />
            ) : (
              <Maximize2 className="w-4 h-4 stroke-[1.8]" />
            )}
          </button>
        </div>
      </header>

      {/* Popover de Ajustes Tipográficos */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`absolute top-16 right-4 sm:right-8 z-30 w-72 p-4 rounded-editorial border shadow-modal backdrop-blur-md ${headerBgClasses}`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-current/10 mb-4">
              <span className="text-xs font-sans font-semibold tracking-wider uppercase opacity-80">
                Ajustes Editoriais
              </span>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 opacity-60 hover:opacity-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Ajuste de Tamanho de Fonte */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-sans mb-2 opacity-80">
                <span>Tamanho da Tipografia</span>
                <span>{fontSize}%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontSize(Math.max(80, fontSize - 10))}
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
                  onClick={() => setFontSize(Math.min(160, fontSize + 10))}
                  className="flex-1 py-1.5 px-2 rounded border border-current/20 text-xs font-sans font-semibold hover:bg-black/5 transition-colors"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Seleção de Tema Tátil */}
            <div>
              <span className="text-xs font-sans block mb-2 opacity-80">
                Atmosfera de Leitura
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme('parchment')}
                  className={`py-2 px-1 text-center rounded border text-xs font-sans transition-all ${
                    theme === 'parchment'
                      ? 'border-terracotta ring-1 ring-terracotta bg-[#FDFBF7] text-[#0F172A]'
                      : 'border-current/20 bg-[#FDFBF7] text-[#0F172A]'
                  }`}
                >
                  Pergaminho
                </button>

                <button
                  onClick={() => setTheme('clear')}
                  className={`py-2 px-1 text-center rounded border text-xs font-sans transition-all ${
                    theme === 'clear'
                      ? 'border-terracotta ring-1 ring-terracotta bg-white text-slate-900'
                      : 'border-current/20 bg-white text-slate-900'
                  }`}
                >
                  Alvo
                </button>

                <button
                  onClick={() => setTheme('night')}
                  className={`py-2 px-1 text-center rounded border text-xs font-sans transition-all ${
                    theme === 'night'
                      ? 'border-terracotta ring-1 ring-terracotta bg-[#16181D] text-[#E2DFD8]'
                      : 'border-current/20 bg-[#16181D] text-[#E2DFD8]'
                  }`}
                >
                  Noturno
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Painel Lateral / Drawer do Sumário (TOC) */}
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
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed top-0 bottom-0 left-0 w-80 sm:w-96 z-40 flex flex-col border-r shadow-2xl ${headerBgClasses}`}
            >
              <div className="h-16 px-6 border-b border-current/10 flex items-center justify-between">
                <span className="font-display text-base font-semibold">
                  Índice &amp; Capítulos
                </span>
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
                    Carregando capítulos da edição...
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

      {/* Viewport Central do Leitor */}
      <main className="flex-1 relative flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        
        {/* Botão de Página Anterior Flutuante */}
        <button
          onClick={handlePrev}
          title="Página Anterior (Seta Esquerda)"
          className="absolute left-2 sm:left-6 z-10 p-2.5 rounded-full bg-black/5 hover:bg-terracotta hover:text-white transition-all backdrop-blur-sm opacity-60 hover:opacity-100 focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Canvas de Leitura Confinado à Largura Ideal (640px-740px) */}
        <div className="w-full max-w-[740px] h-[92%] relative rounded-editorial overflow-hidden flex flex-col justify-center">
          
          {/* Skeleton de Carregamento Editorial */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-inherit space-y-3">
              <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
              <p className="font-display text-sm italic opacity-80">
                Restaurando edição canônica...
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
                Voltar à Biblioteca
              </button>
            </div>
          )}

          {/* O container onde o epubjs injeta o iframe */}
          <div 
            ref={viewerRef} 
            className="w-full h-full"
            style={{ minHeight: '400px' }}
          />
        </div>

        {/* Botão de Próxima Página Flutuante */}
        <button
          onClick={handleNext}
          title="Próxima Página (Seta Direita)"
          className="absolute right-2 sm:right-6 z-10 p-2.5 rounded-full bg-black/5 hover:bg-terracotta hover:text-white transition-all backdrop-blur-sm opacity-60 hover:opacity-100 focus:outline-none"
        >
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </button>
      </main>

      {/* Barra Inferior com Progresso e Indicadores */}
      <footer className={`h-12 px-6 border-t flex items-center justify-between text-xs font-sans ${headerBgClasses}`}>
        <div className="flex items-center gap-2 opacity-70">
          <BookOpen className="w-3.5 h-3.5 text-terracotta" />
          <span className="hidden sm:inline">Use as setas do teclado para folhear</span>
        </div>

        {/* Barra de Progresso Fina */}
        <div className="flex items-center gap-3">
          <div className="w-24 sm:w-40 h-1.5 bg-black/10 rounded-full overflow-hidden">
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
