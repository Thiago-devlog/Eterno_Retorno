import React, { useState } from 'react';
import Header from './components/UI/Header.jsx';
import BookGrid from './components/Library/BookGrid.jsx';
import ReaderModal from './components/Reader/ReaderModal.jsx';
import { CANONICAL_BOOKS } from './data/books.js';
import { motion } from 'framer-motion';
import { Feather, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="min-h-screen bg-parchment text-slate-ink flex flex-col font-sans selection:bg-terracotta/20">
      {/* Cabeçalho Fixo Minimalista */}
      <Header />

      {/* Hero Editorial Canônico */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-16">
        
        <section className="mb-12 py-10 px-6 sm:px-10 rounded-editorial bg-parchment-50 border border-parchment-border/80 shadow-card-soft">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Texto de Apresentação Editorial */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-parchment-vellum text-terracotta border border-terracotta/20 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
                <span>Arquivo Vivo do Realismo Brasileiro</span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-ink tracking-tight leading-tight">
                O Eterno Retorno aos clássicos de nossa literatura.
              </h1>
              
              <p className="font-reader text-slate-ink-soft text-base sm:text-lg leading-relaxed max-w-2xl">
                Uma experiência de leitura contemplativa em tipografia de alta fidelidade editorial. Resgatando o legado definitivo de Machado de Assis diretamente das primeiras edições históricas.
              </p>

              <div className="pt-2 flex items-center gap-6 text-xs text-slate-ink-muted">
                <span className="flex items-center gap-1.5 font-medium">
                  <Feather className="w-3.5 h-3.5 text-terracotta" />
                  Textos Integrais de Domínio Público
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-terracotta" />
                  Leitor EPUB Reativo &amp; Anotações
                </span>
              </div>
            </div>

            {/* Retrato Histórico Tátil de Machado de Assis */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="relative group p-2 bg-white rounded-editorial border border-parchment-border shadow-card-soft">
                <img 
                  src="/Machado_de_Assis_aos_57_anos.jpg" 
                  alt="Machado de Assis aos 57 anos" 
                  className="w-48 sm:w-56 h-auto rounded-[2px] object-cover filter grayscale contrast-105 group-hover:filter-none transition-all duration-500"
                />
                <div className="mt-2 text-center">
                  <p className="font-display text-xs font-semibold text-slate-ink">
                    Machado de Assis
                  </p>
                  <p className="text-[10px] font-sans text-slate-ink-muted">
                    1839 — 1908
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Grade de Obras do Acervo */}
        <BookGrid 
          books={CANONICAL_BOOKS} 
          onSelectBook={(book) => setSelectedBook(book)} 
        />

      </main>

      {/* Rodapé Minimalista de Acervo */}
      <footer className="border-t border-parchment-border/70 py-8 bg-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-ink-muted">
          <p>© {new Date().getFullYear()} Eterno Retorno. Biblioteca Digital Livre &amp; Preservação Literária.</p>
          <p className="font-display italic text-slate-ink-soft">
            "Ao vencedor, as batatas!"
          </p>
        </div>
      </footer>

      {/* Modal / Viewport do Leitor de EPUB */}
      {selectedBook && (
        <ReaderModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}
    </div>
  );
}

