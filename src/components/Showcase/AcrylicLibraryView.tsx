import React, { useState } from 'react';
import { BookItem, AuthorProfile } from '../../data/booksData';
import { AcrylicShelf } from './AcrylicShelf';
import { AuthorSpotlightBanner } from './AuthorSpotlightBanner';
import { PWAInstallButton, OfflineIndicator } from '../PWA/OfflineIndicator';
import {
  BookOpen,
  Smartphone,
  Maximize2,
  FolderArchive,
  Sun,
  Moon,
  Flame,
} from 'lucide-react';

interface AcrylicLibraryViewProps {
  books: BookItem[];
  authors: AuthorProfile[];
  readingProgress: Record<string, { progressPercent: number }>;
  favorites: string[];
  themeMode: 'light' | 'dark' | 'amber';
  onToggleTheme: (mode: 'light' | 'dark' | 'amber') => void;
  onOpenBook: (book: BookItem) => void;
  onOpenDossiers: () => void;
}

export const AcrylicLibraryView: React.FC<AcrylicLibraryViewProps> = ({
  books,
  authors,
  readingProgress,
  favorites,
  themeMode,
  onToggleTheme,
  onOpenBook,
  onOpenDossiers,
}) => {
  // Divisão em Categorias com Prateleiras de Acrílico Colorido
  const machadoBooks = books.filter((b) => b.authorId === 'machado-de-assis');
  const naturalismBooks = books.filter(
    (b) => b.authorId === 'aluisio-azevedo' || b.authorId === 'raul-pompeia'
  );
  const romanticismBooks = books.filter(
    (b) =>
      b.authorId === 'jose-de-alencar' ||
      b.authorId === 'castro-alves' ||
      b.authorId === 'lima-barreto'
  );

  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Livro em leitura ativa para o botão inferior
  const activeReadingBook = books.find((b) => b.id === 'quincas-borba') || books[0];
  const activePercent = readingProgress[activeReadingBook.id]?.progressPercent || 97;

  // Estilos da casca principal adaptados ao tema ativo
  const themePageStyles = {
    light: {
      canvasBg: 'bg-[#F1F3F5] text-[#0F172A]',
      topBar: 'bg-white/85 border-slate-200/80 text-slate-800',
      deviceCard: 'bg-white border-[#0F172A] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22)]',
      deviceCardExpanded: 'bg-white border-slate-200 shadow-xl',
      statusText: 'text-black',
      headerTitle: 'text-black',
      headerSub: 'text-slate-500',
      bottomBtn: 'bg-black text-white hover:bg-slate-900 shadow-[0_12px_28px_rgba(0,0,0,0.35)]',
      dossierBtn: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
    },
    dark: {
      canvasBg: 'bg-[#090D16] text-[#F1F5F9]',
      topBar: 'bg-[#131B2E]/90 border-slate-700/80 text-slate-200',
      deviceCard: 'bg-[#0F172A] border-slate-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]',
      deviceCardExpanded: 'bg-[#0F172A] border-slate-700 shadow-2xl',
      statusText: 'text-white',
      headerTitle: 'text-white',
      headerSub: 'text-slate-400',
      bottomBtn: 'bg-amber-500 text-black hover:bg-amber-400 font-black shadow-[0_12px_28px_rgba(245,158,11,0.35)]',
      dossierBtn: 'bg-slate-800 hover:bg-slate-700 text-slate-300',
    },
    amber: {
      canvasBg: 'bg-[#F4ECD8] text-[#3B2B1B]',
      topBar: 'bg-[#FAF3E0]/95 border-[#DFCDB0] text-[#3E2B18]',
      deviceCard: 'bg-[#FAF3E0] border-[#8C4A19] shadow-[0_25px_60px_-15px_rgba(140,74,25,0.22)]',
      deviceCardExpanded: 'bg-[#FAF3E0] border-[#DFCDB0] shadow-xl',
      statusText: 'text-[#3E2B18]',
      headerTitle: 'text-[#3E2B18]',
      headerSub: 'text-[#8C4A19]',
      bottomBtn: 'bg-[#5C3210] text-[#FAF3E0] hover:bg-[#43230A] shadow-[0_12px_28px_rgba(92,50,16,0.35)]',
      dossierBtn: 'bg-[#EFE2C2] hover:bg-[#E5D4B0] text-[#5C3210]',
    },
  }[themeMode];

  return (
    <div className={`min-h-screen py-6 px-3 sm:px-6 flex flex-col items-center justify-start transition-colors duration-300 ${themePageStyles.canvasBg}`}>
      {/* Indicador de Status Offline do PWA */}
      <OfflineIndicator />

      {/* Barra Superior de Controles: Modo de Exibição, Temas de Leitura e Instalação */}
      <div className={`mb-4 flex flex-wrap items-center justify-center gap-2 backdrop-blur-md border rounded-full px-4 py-1.5 shadow-xs text-xs font-sans transition-colors ${themePageStyles.topBar}`}>
        {/* Seletor de Tema Visual (Claro / Escuro / Amarelado sem Luz Azul) */}
        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 p-1 rounded-full">
          <button
            onClick={() => onToggleTheme('light')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              themeMode === 'light'
                ? 'bg-white text-black shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
            title="Modo Claro clássico"
          >
            <Sun className="w-3 h-3 text-amber-500" />
            <span className="hidden sm:inline">Claro</span>
          </button>

          <button
            onClick={() => onToggleTheme('dark')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              themeMode === 'dark'
                ? 'bg-slate-900 text-amber-300 shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
            title="Modo Escuro / Noturno para menor brilho"
          >
            <Moon className="w-3 h-3 text-slate-300" />
            <span className="hidden sm:inline">Escuro</span>
          </button>

          <button
            onClick={() => onToggleTheme('amber')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              themeMode === 'amber'
                ? 'bg-[#E4C99E] text-[#43230A] shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
            title="Modo Amarelado sem luz azul para leitura descansada"
          >
            <Flame className="w-3 h-3 text-[#A45A2A]" />
            <span className="hidden sm:inline">Sem Luz Azul</span>
          </button>
        </div>

        <div className="w-px h-4 bg-black/10 dark:bg-white/20 mx-0.5" />

        {/* Alternância Moldura Mobile vs Tela Expandida */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setDeviceFrameMode(true)}
            className={`px-2.5 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              deviceFrameMode
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
          <button
            onClick={() => setDeviceFrameMode(false)}
            className={`px-2.5 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              !deviceFrameMode
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Expandida</span>
          </button>
        </div>

        <div className="w-px h-4 bg-black/10 dark:bg-white/20 mx-0.5" />

        {/* Botão de Dossiê de Autores */}
        <button
          onClick={onOpenDossiers}
          className="px-2.5 py-1 rounded-full opacity-80 hover:opacity-100 flex items-center gap-1.5 font-bold cursor-pointer transition-colors"
          title="Ver biografia e dossiê dos escritores"
        >
          <FolderArchive className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          <span>Dossiês</span>
        </button>

        {/* Botão de Instalação PWA */}
        <PWAInstallButton />
      </div>

      {/* DISPOSITIVO CONTAINER */}
      <div
        className={`w-full transition-all duration-300 relative ${
          deviceFrameMode
            ? `max-w-[400px] rounded-[50px] border-[8px] overflow-hidden min-h-[820px] pb-24 ${themePageStyles.deviceCard}`
            : `max-w-2xl rounded-3xl border overflow-hidden min-h-[800px] pb-28 px-4 sm:px-8 ${themePageStyles.deviceCardExpanded}`
        }`}
      >
        {/* Barra de Status do iPhone com Dynamic Island */}
        {deviceFrameMode && (
          <div className={`pt-3 px-7 flex items-center justify-between text-xs font-sans font-bold select-none ${themePageStyles.statusText}`}>
            <span>9:41</span>
            {/* Dynamic Island */}
            <div className="w-24 h-6 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px]">5G</span>
              <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>
        )}

        {/* 1. CABEÇALHO DA BIBLIOTECA */}
        <div className="text-center pt-5 pb-3 px-4 relative">
          <span className={`font-sans text-xs sm:text-sm font-semibold tracking-tight block ${themePageStyles.headerSub}`}>
            Minha Coleção
          </span>
          <h1 className={`font-display text-4xl sm:text-5xl font-black tracking-tight uppercase mt-0.5 ${themePageStyles.headerTitle}`}>
            LIVROS
          </h1>

          {/* Atalho de Dossiês no canto */}
          <button
            onClick={onOpenDossiers}
            className={`absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer ${themePageStyles.dossierBtn}`}
            title="Dossiês de Escritores"
          >
            <FolderArchive className="w-4 h-4" />
          </button>
        </div>

        {/* 2. NOVO BANNER ROTATIVO DOS PRINCIPAIS AUTORES (Fotos, Biografia e Citações) */}
        <AuthorSpotlightBanner
          authors={authors}
          themeMode={themeMode}
          onSelectAuthorDossier={() => onOpenDossiers()}
        />

        {/* 3. PRATELEIRAS VERTICAIS COM BOLSO DE ACRÍLICO COLORIDO */}
        <div className="space-y-6 px-3 sm:px-4">
          {/* Prateleira 1: Machado de Assis (Acrílico Âmbar/Laranja) */}
          <AcrylicShelf
            categoryTitle="Machado de Assis"
            books={machadoBooks}
            shelfColor="amber"
            readingProgress={readingProgress}
            favorites={favorites}
            themeMode={themeMode}
            onSelectBookToInspect={onOpenBook}
          />

          {/* Prateleira 2: Naturalismo & Impressionismo (Acrílico Azul Ciano) */}
          <AcrylicShelf
            categoryTitle="Naturalismo & Impressionismo"
            books={naturalismBooks}
            shelfColor="blue"
            readingProgress={readingProgress}
            favorites={favorites}
            themeMode={themeMode}
            onSelectBookToInspect={onOpenBook}
          />

          {/* Prateleira 3: Romantismo & Clássicos (Acrílico Claro Translúcido) */}
          <AcrylicShelf
            categoryTitle="Romantismo & Clássicos"
            books={romanticismBooks}
            shelfColor="frosted"
            readingProgress={readingProgress}
            favorites={favorites}
            themeMode={themeMode}
            onSelectBookToInspect={onOpenBook}
          />
        </div>

        {/* 4. BOTÃO FLUTUANTE INFERIOR: Abertura Editorial da Obra em Leitura */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-30 px-4">
          <button
            onClick={() => onOpenBook(activeReadingBook)}
            className={`pointer-events-auto active:scale-98 transition-all px-7 py-3.5 rounded-full flex items-center gap-2.5 text-xs font-sans font-bold cursor-pointer ${themePageStyles.bottomBtn}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Continuar: {activeReadingBook.title} ({activePercent}%)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
