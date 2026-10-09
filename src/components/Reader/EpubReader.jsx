import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Highlighter,
  Cloud,
  CloudOff
} from 'lucide-react';
import { createEpubRendition, applyReaderThemes } from '../../services/epubService.js';
import { saveReadingProgress, getReadingProgress } from '../../services/readingService.js';

export default function EpubReader({ 
  book, 
  uid,
  onClose, 
  onLocationChanged, 
  onTextSelected 
}) {
  const viewerRef = useRef(null);
  const bookInstanceRef = useRef(null);
  const renditionInstanceRef = useRef(null);
  const saveTimerRef = useRef(null); // Debounce timer para salvar progresso

  // Estados de Carregamento & Navegação
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [toc, setToc] = useState([]);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentCfi, setCurrentCfi] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'

  // Controles Editoriais
  const [fontSize, setFontSize] = useState(105);
  const [fontFamily, setFontFamily] = useState('Merriweather');
  const [theme, setTheme] = useState('parchment');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectionNotice, setSelectionNotice] = useState(null);

  // ─── Salvar progresso com debounce de 1 segundo ───────────────────────────
  const persistProgress = useCallback((cfi, pct) => {
    if (!uid || !book?.id || !cfi) return;

    // Cancela o timer anterior
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    setSyncStatus('saving');

    saveTimerRef.current = setTimeout(async () => {
      try {
        await saveReadingProgress(uid, book.id, cfi, pct);
        setSyncStatus('saved');
        setTimeout(() => setSyncStatus('idle'), 2500);
      } catch {
        setSyncStatus('error');
        setTimeout(() => setSyncStatus('idle'), 3000);
      }
    }, 1000);
  }, [uid, book?.id]);

  // ─── Inicialização do EPUB ─────────────────────────────────────────────────
  useEffect(() => {
    if (!book || !viewerRef.current) return;

    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);

    let savedCfi = null;

    const init = async () => {
      // Carrega o progresso salvo (se uid disponível)
      if (uid && book.id) {
        const saved = await getReadingProgress(uid, book.id);
        if (saved?.cfi) {
          savedCfi = saved.cfi;
          if (saved.percentage) setProgress(saved.percentage);
        }
      }

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

        // Sumário (TOC)
        epubBook.loaded.navigation
          .then((nav) => {
            if (isMounted && nav?.toc) setToc(nav.toc);
          })
          .catch(() => {});

        // Gera localizações para cálculo de porcentagem
        epubBook.ready
          .then(() => epubBook.locations.generate(1024))
          .catch(() => {});

        // Evento de mudança de página (Relocated)
        rendition.on('relocated', (location) => {
          if (!isMounted || !location?.start) return;

          const cfi = location.start.cfi;
          setCurrentCfi(cfi);

          let pct = 0;
          if (epubBook.locations?.length?.() > 0) {
            pct = Math.round(
              (epubBook.locations.percentageFromCfi(cfi) || 0) * 100
            );
            setProgress(pct);
          }

          // Emite callback externo (para App.jsx e futuros consumidores)
          onLocationChanged?.(cfi, pct);

          // Persiste com debounce
          persistProgress(cfi, pct);

          // Captura capítulo atual pelo TOC
          if (location.start.href) {
            const cleanHref = location.start.href.split('#')[0];
            const matched = toc.find((item) =>
              item.href?.includes(cleanHref)
            );
            if (matched) setCurrentChapter(matched.label.trim());
          }
        });

        // Captura de seleção de texto (para grifos e notas)
        rendition.on('selected', (cfiRange) => {
          if (!isMounted) return;
          try {
            const text = rendition.getRange(cfiRange)?.toString() || '';
            if (text.trim().length > 3) {
              const preview = text.slice(0, 45);
              setSelectionNotice(`"${preview}${text.length > 45 ? '...' : ''}"`);
              setTimeout(() => setSelectionNotice(null), 3500);
              onTextSelected?.(text, cfiRange);
            }
          } catch {}
        });

        // Renderiza — na posição salva ou no início
        await rendition
          .display(savedCfi || undefined)
          .catch(() => rendition.display());

        if (isMounted) setIsLoading(false);

      } catch (err) {
        console.error('[Eterno Retorno] Falha ao inicializar leitor:', err);
        if (isMounted) {
          setLoadError('Não foi possível renderizar esta edição do EPUB.');
          setIsLoading(false);
        }
      }
    };

    init();

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
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

      try { renditionInstanceRef.current?.destroy(); } catch {}
      try { bookInstanceRef.current?.destroy(); } catch {}
    };
  }, [book.epubUrl]);

  // ─── Atualização reativa de tema e fonte ──────────────────────────────────
  useEffect(() => {
    if (renditionInstanceRef.current) {
      applyReaderThemes(renditionInstanceRef.current, fontFamily);
      renditionInstanceRef.current.themes.select(theme);
    }
  }, [theme, fontFamily]);

  useEffect(() => {
    if (renditionInstanceRef.current) {
      renditionInstanceRef.current.themes.fontSize(`${fontSize}%`);
    }
  }, [fontSize]);

  const handleNext = () => renditionInstanceRef.current?.next();
  const handlePrev = () => renditionInstanceRef.current?.prev();

  const handleJumpToChapter = (href) => {
    renditionInstanceRef.current?.display(href);
    setIsTocOpen(false);
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

  // ─── Classes dinâmicas por tema ──────────────────────────────────────────
  const shellTheme = {
    parchment: {
      bg: 'bg-[#FDFBF7] text-[#0F172A]',
      header: 'bg-[#FAF8F5]/95 border-[#E8E3D9]/80 text-[#0F172A]',
      bookCard: 'bg-white border-[#E8E3D9]/80 shadow-card-soft',
      btn: 'hover:bg-black/5',
      divider: 'bg-[#E8E3D9]/80'
    },
    night: {
      bg: 'bg-[#14161A] text-[#E2DFD8]',
      header: 'bg-[#1A1D23]/95 border-[#2A2E39] text-[#E2DFD8]',
      bookCard: 'bg-[#181B22] border-[#2A2E39]',
      btn: 'hover:bg-white/5',
      divider: 'bg-[#2A2E39]'
    },
    clear: {
      bg: 'bg-white text-slate-900',
      header: 'bg-white/95 border-slate-200 text-slate-900',
      bookCard: 'bg-white border-slate-200 shadow-card-soft',
      btn: 'hover:bg-slate-100',
      divider: 'bg-slate-200'
    }
  }[theme];

  // ─── Indicador de sincronização com o Firestore ───────────────────────────
  const SyncIndicator = () => {
    if (syncStatus === 'idle' || !uid) return null;
    return (
      <span className="flex items-center gap-1 text-[10px] font-mono">
        {syncStatus === 'saving' && (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="opacity-70">Salvando...</span>
          </>
        )}
        {syncStatus === 'saved' && (
          <>
            <Cloud className="w-3 h-3 text-emerald-500" />
            <span className="text-emerald-600 opacity-90">Salvo</span>
          </>
        )}
        {syncStatus === 'error' && (
          <>
            <CloudOff className="w-3 h-3 text-red-500" />
            <span className="text-red-500 opacity-90">Erro ao salvar</span>
          </>
        )}
      </span>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-50 flex flex-col select-none ${shellTheme.bg}`}
    >
      {/* ─── Header do Leitor ─── */}
      <header className={`h-16 px-4 sm:px-8 border-b flex items-center justify-between backdrop-blur-md z-20 ${shellTheme.header}`}>
        
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            onClick={onClose}
            className={`inline-flex items-center gap-2 text-xs font-sans font-semibold hover:text-terracotta py-1.5 px-3 rounded transition-colors ${shellTheme.btn}`}
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
            <span>Voltar ao Acervo</span>
          </button>
          
          <div className={`h-4 w-px ${shellTheme.divider} hidden sm:block`} />

          <div className="min-w-0">
            <h2 className="font-serif text-sm font-semibold truncate leading-tight">
              {book.title}
            </h2>
            {currentChapter && (
              <p className="text-[11px] font-sans opacity-60 truncate">
                {currentChapter}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SyncIndicator />

          <div className={`h-4 w-px ${shellTheme.divider} mx-1 hidden sm:block`} />

          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            title="Sumário de Capítulos"
            className={`p-2 rounded transition-colors flex items-center gap-1.5 text-xs font-sans font-medium ${shellTheme.btn} ${isTocOpen ? 'text-terracotta' : ''}`}
          >
            <List className="w-4 h-4 stroke-[1.8]" />
            <span className="hidden md:inline">Índice</span>
          </button>

          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`p-2 rounded transition-colors ${shellTheme.btn} ${isSettingsOpen ? 'text-terracotta' : ''}`}
          >
            <Settings2 className="w-4 h-4 stroke-[1.8]" />
          </button>

          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded transition-colors hidden sm:block ${shellTheme.btn}`}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 stroke-[1.8]" /> : <Maximize2 className="w-4 h-4 stroke-[1.8]" />}
          </button>
        </div>
      </header>

      {/* ─── Popover de Ajustes Tipográficos ─── */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className={`absolute top-16 right-4 sm:right-8 z-30 w-72 p-5 rounded border shadow-modal backdrop-blur-md ${shellTheme.header}`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-current/10 mb-4">
              <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-terracotta">
                Tipografia &amp; Atmosfera
              </span>
              <button onClick={() => setIsSettingsOpen(false)} className="p-1 opacity-60 hover:opacity-100">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Escala da Letra */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-sans mb-2 opacity-80 font-medium">
                <span>Escala da Letra</span>
                <span className="font-mono">{fontSize}%</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setFontSize(Math.max(85, fontSize - 10))} className="flex-1 py-1.5 rounded border border-current/20 text-xs font-semibold hover:bg-black/5 transition-colors">A-</button>
                <button onClick={() => setFontSize(105)} className="py-1.5 px-3 rounded border border-current/20 text-xs hover:bg-black/5 transition-colors">Padrão</button>
                <button onClick={() => setFontSize(Math.min(150, fontSize + 10))} className="flex-1 py-1.5 rounded border border-current/20 text-xs font-semibold hover:bg-black/5 transition-colors">A+</button>
              </div>
            </div>

            {/* Fonte de Leitura */}
            <div className="mb-4">
              <span className="text-xs font-sans block mb-2 opacity-80 font-medium">Fonte de Leitura</span>
              <div className="grid grid-cols-2 gap-2">
                {['Merriweather', 'Plus Jakarta Sans'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFontFamily(f)}
                    className={`py-1.5 px-2 text-center rounded border text-xs transition-all ${fontFamily === f ? 'border-terracotta text-terracotta font-semibold bg-terracotta/5' : 'border-current/20 opacity-70 hover:opacity-100'}`}
                  >
                    {f === 'Merriweather' ? 'Merriweather' : 'Jakarta Sans'}
                  </button>
                ))}
              </div>
            </div>

            {/* Papel & Iluminação */}
            <div>
              <span className="text-xs font-sans block mb-2 opacity-80 font-medium">Papel &amp; Iluminação</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'parchment', label: 'Pergaminho', bg: '#FDFBF7', color: '#0F172A' },
                  { key: 'clear', label: 'Alvo', bg: '#FFFFFF', color: '#1E293B' },
                  { key: 'night', label: 'Noturno', bg: '#16181D', color: '#E2DFD8' }
                ].map(({ key, label, bg, color }) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    style={{ backgroundColor: bg, color }}
                    className={`py-2 px-1 text-center rounded border text-xs font-sans transition-all ${theme === key ? 'ring-1 ring-terracotta border-terracotta' : 'border-current/20 opacity-80'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Drawer TOC ─── */}
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
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed top-0 bottom-0 left-0 w-80 sm:w-96 z-40 flex flex-col border-r shadow-2xl ${shellTheme.header}`}
            >
              <div className="h-16 px-6 border-b border-current/10 flex items-center justify-between">
                <div>
                  <span className="font-serif text-base font-semibold">Sumário</span>
                  <p className="text-[10px] font-sans opacity-60 uppercase tracking-wider truncate">{book.title}</p>
                </div>
                <button onClick={() => setIsTocOpen(false)} className="p-1.5 opacity-60 hover:opacity-100 rounded hover:bg-black/5">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {toc.length === 0 ? (
                  <p className="text-xs font-sans opacity-60 p-4 text-center">Mapeando capítulos da edição...</p>
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

      {/* ─── Notificação de Seleção de Texto ─── */}
      <AnimatePresence>
        {selectionNotice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg border border-terracotta/40 flex items-center gap-2 whitespace-nowrap"
          >
            <Highlighter className="w-3.5 h-3.5 text-terracotta shrink-0" />
            <span>Anotação capturada: {selectionNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Viewport Central de Leitura ─── */}
      <main className="flex-1 relative flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          title="Página Anterior (←)"
          className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/5 hover:bg-terracotta hover:text-white transition-all backdrop-blur-sm opacity-70 hover:opacity-100 shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2]" />
        </motion.button>

        {/* Moldura de Livro Físico */}
        <div className={`w-full max-w-[740px] h-[92%] relative rounded border ${shellTheme.bookCard} overflow-hidden flex flex-col justify-center`}>
          
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-inherit space-y-3">
              <div className="w-7 h-7 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
              <p className="font-serif text-sm italic opacity-80">
                {uid ? 'Restaurando posição de leitura...' : 'Restaurando edição histórica...'}
              </p>
            </div>
          )}

          {loadError && (
            <div className="p-8 text-center text-xs font-sans text-red-700 bg-red-50 rounded border border-red-200">
              <p className="font-semibold">{loadError}</p>
              <button onClick={onClose} className="mt-3 px-3 py-1.5 bg-white border border-red-300 rounded text-red-800 hover:bg-red-50">
                Voltar ao Acervo
              </button>
            </div>
          )}

          {/* Container DOM para o epubjs */}
          <div ref={viewerRef} className="w-full h-full" style={{ minHeight: '400px' }} />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          title="Próxima Página (→)"
          className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/5 hover:bg-terracotta hover:text-white transition-all backdrop-blur-sm opacity-70 hover:opacity-100 shadow-sm"
        >
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </motion.button>
      </main>

      {/* ─── Rodapé com Progresso ─── */}
      <footer className={`h-12 px-6 border-t flex items-center justify-between text-xs font-sans ${shellTheme.header}`}>
        <div className="flex items-center gap-2 opacity-70">
          <BookOpen className="w-3.5 h-3.5 text-terracotta" />
          <span className="hidden sm:inline">Use as setas laterais ou as teclas ← → para folhear</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Barra de Progresso 2px terracota (DESIGN.md spec) */}
          <div className="w-24 sm:w-44 h-[2px] bg-[#E2DCD5] rounded-full overflow-hidden">
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
