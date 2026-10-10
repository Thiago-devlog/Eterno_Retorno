import React from 'react';
import { BookItem } from '../../data/booksData';
import {
  X,
  BookOpen,
  CheckCircle2,
  Heart,
  Star,
  Clock,
  BookMarked,
  Layers,
  Sparkles,
} from 'lucide-react';

interface BookEditorialModalProps {
  book: BookItem | null;
  isOpen: boolean;
  progressPercent: number;
  isFavorite: boolean;
  onClose: () => void;
  onStartReading: (book: BookItem) => void;
  onToggleMarkAsRead: (bookId: string) => void;
  onToggleFavorite: (bookId: string) => void;
}

export const BookEditorialModal: React.FC<BookEditorialModalProps> = ({
  book,
  isOpen,
  progressPercent,
  isFavorite,
  onClose,
  onStartReading,
  onToggleMarkAsRead,
  onToggleFavorite,
}) => {
  if (!isOpen || !book) return null;

  // Cálculo aproximado de tempo de leitura (200 palavras por minuto)
  const totalWords = book.chapters.reduce(
    (acc, chap) => acc + chap.content.join(' ').split(' ').length,
    0
  );
  const readingTimeMin = Math.max(15, Math.round(totalWords / 150));
  const readingTimeFormatted =
    readingTimeMin > 60
      ? `${Math.floor(readingTimeMin / 60)}h ${readingTimeMin % 60}min`
      : `${readingTimeMin} min`;

  const isCompleted = progressPercent >= 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-left max-h-[92vh] overflow-y-auto">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cabeçalho da Obra: Capa 3D + Dados Principais */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          {/* Capa com Sombra de Lombada */}
          <div
            className="book-spine-shadow w-28 h-40 sm:w-32 sm:h-46 rounded-lg p-3 flex flex-col justify-between shrink-0 border text-center shadow-lg"
            style={{
              backgroundColor: book.coverBg,
              borderColor: book.coverBorder,
              color: book.coverAccent,
            }}
          >
            <span className="text-[9px] font-mono font-bold tracking-wider opacity-85">
              {book.year}
            </span>
            <h4 className="font-display text-[10px] sm:text-[11px] font-black uppercase leading-tight my-auto">
              {book.title}
            </h4>
            <span className="text-[8px] uppercase tracking-tighter opacity-80 font-sans">
              {book.editionLabel}
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                {book.category}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                {book.year} ({book.century === 'XIX' ? 'Séc. XIX' : 'Séc. XX'})
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-black text-black leading-tight">
              {book.title}
            </h2>

            <p className="font-sans text-sm font-semibold text-slate-600">
              {book.author}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{book.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-sans font-normal ml-1">
                  ({book.reviewsCount} avaliações)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Citação / Tagline da Obra */}
        <div className="bg-slate-50 border-l-3 border-amber-600 p-3.5 rounded-r-xl mb-6">
          <p className="font-cormorant italic text-sm sm:text-base text-slate-800">
            {book.tagline}
          </p>
        </div>

        {/* Sinopse e Contexto Histórico */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-400">
            Sinopse &amp; Contexto Histórico
          </h3>
          <p className="font-reading text-xs sm:text-sm text-slate-700 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Ficha Técnica */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 text-center">
          <div>
            <span className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">
              Capítulos
            </span>
            <span className="font-sans font-bold text-sm text-slate-900">
              {book.chapters.length} estruturados
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">
              Tempo Estimado
            </span>
            <span className="font-sans font-bold text-sm text-slate-900 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {readingTimeFormatted}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">
              Progresso
            </span>
            <span className="font-sans font-bold text-sm text-amber-700">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Barra de Progresso se houver */}
        {progressPercent > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs font-sans text-slate-500 mb-1.5 font-medium">
              <span>Andamento de Leitura</span>
              <span className="font-mono font-bold text-slate-900">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Botões de Ação Principais */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* 1. Iniciar ou Continuar Leitura */}
          <button
            onClick={() => onStartReading(book)}
            className="w-full sm:flex-1 py-3 px-5 rounded-full bg-black hover:bg-slate-900 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>
              {progressPercent > 0
                ? `Continuar de onde parou (${progressPercent}%)`
                : 'Iniciar Leitura Completa'}
            </span>
          </button>

          {/* 2. Marcar como Lido */}
          <button
            onClick={() => onToggleMarkAsRead(book.id)}
            className={`w-full sm:w-auto py-3 px-4 rounded-full border text-xs font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              isCompleted
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Marcar ou desmarcar como concluído"
          >
            <CheckCircle2
              className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}
            />
            <span className="whitespace-nowrap">
              {isCompleted ? 'Lido' : 'Marcar como Lido'}
            </span>
          </button>

          {/* 3. Favoritar Obra */}
          <button
            onClick={() => onToggleFavorite(book.id)}
            className={`w-full sm:w-auto py-3 px-4 rounded-full border text-xs font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              isFavorite
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Favoritar obra"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
            />
            <span className="whitespace-nowrap">
              {isFavorite ? 'Favorito' : 'Favoritar'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
