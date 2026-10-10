import React from 'react';
import { AuthorProfile, BookItem } from '../../data/booksData';
import { X, Quote, BookOpen } from 'lucide-react';

interface AuthorDossierModalProps {
  authors: AuthorProfile[];
  books: BookItem[];
  isOpen: boolean;
  onClose: () => void;
  onOpenBook: (book: BookItem) => void;
}

export const AuthorDossierModal: React.FC<AuthorDossierModalProps> = ({
  authors,
  books,
  isOpen,
  onClose,
  onOpenBook,
}) => {
  const [selectedAuthorId, setSelectedAuthorId] = React.useState<string>(authors[0].id);

  if (!isOpen) return null;

  const currentAuthor = authors.find((a) => a.id === selectedAuthorId) || authors[0];
  const authorBooks = books.filter((b) => b.authorId === currentAuthor.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-left max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Arquivo Literário
        </span>
        <h2 className="font-display text-2xl font-bold text-black mb-4">
          Dossiês dos Escritores
        </h2>

        {/* Abas horizontais de autores */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5">
          {authors.map((author) => (
            <button
              key={author.id}
              onClick={() => setSelectedAuthorId(author.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold whitespace-nowrap cursor-pointer transition-all ${
                author.id === currentAuthor.id
                  ? 'bg-black text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {author.shortName}
            </button>
          ))}
        </div>

        {/* Ficha do Autor */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-sm">
              <img
                src={currentAuthor.avatarUrl}
                alt={currentAuthor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-black">
                {currentAuthor.name}
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                {currentAuthor.movement} · {currentAuthor.lifespan}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            {currentAuthor.bio}
          </p>

          <div className="bg-slate-50 border-l-2 border-black p-3 rounded-r-lg">
            <Quote className="w-3.5 h-3.5 text-slate-400 mb-1" />
            <p className="font-cormorant italic text-sm text-slate-800">
              “{currentAuthor.quote}”
            </p>
          </div>

          {/* Livros deste autor */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Obras no Acervo ({authorBooks.length})
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {authorBooks.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    onClose();
                    onOpenBook(b);
                  }}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-black text-left cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="block font-display text-xs font-bold text-black line-clamp-1">
                      {b.title}
                    </span>
                    <span className="block font-mono text-[9px] text-slate-400">
                      {b.year}
                    </span>
                  </div>
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
