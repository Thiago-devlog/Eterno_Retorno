import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ARCHIVE_AUTHORS } from '../../data/authors.js';

const normalize = (value) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');

const findAvailableEdition = (work, books) =>
  books.find((book) => normalize(book.title) === normalize(work.title));

function AuthorPortrait({ author }) {
  const portrait =
    author.id === 'machado-de-assis'
      ? '/assets/authors/machado-de-assis.jpg'
      : author.portraitUrl;

  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-[#B9AA8D] bg-[#E6DDCC] p-2">
      <div className="absolute inset-2 flex flex-col items-center justify-center border border-[#B9AA8D] text-center text-[#66563F]">
        <span className="font-serif-title text-5xl opacity-50">
          {author.shortName
            .split(' ')
            .filter((part) => !['de', 'da', 'do'].includes(normalize(part)))
            .map((part) => part[0])
            .join('')
            .slice(0, 2)}
        </span>
        <span className="mt-3 font-sans-label text-[9px] uppercase tracking-[0.18em]">
          Retrato de arquivo
        </span>
      </div>
      <img
        src={portrait}
        alt={`Retrato histórico de ${author.shortName}`}
        loading="lazy"
        className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-cover grayscale sepia-[0.55] contrast-90"
        onError={(event) => {
          event.currentTarget.hidden = true;
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 bg-[#725B38]/10 mix-blend-multiply"
      />
    </div>
  );
}

function WorkCard({ work, author, books, onOpenBook }) {
  const edition = findAvailableEdition(work, books);

  return (
    <article className="flex min-w-0 flex-col border border-[#D8CEBC] bg-[#F7F4EE] p-3">
      <div className="relative mx-auto flex aspect-[3/4] w-full max-w-[170px] flex-col items-center justify-between overflow-hidden border border-[#BFB39D] bg-[#EAE2D3] p-3 text-center text-[#514737] shadow-[3px_3px_0_#D7CCB9]">
        {edition ? (
          <img
            src={edition.cover}
            alt={`Capa de ${edition.title}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale-[0.12] sepia-[0.18]"
          />
        ) : (
          <>
            <span className="font-sans-label text-[8px] uppercase tracking-[0.2em]">
              Edição de {work.originalYear}
            </span>
            <span className="font-serif-title text-sm leading-snug">{work.title}</span>
            <span className="w-full border-t border-[#A99A7E] pt-2 font-sans-label text-[8px] uppercase tracking-widest">
              {author.shortName}
            </span>
          </>
        )}
        {!edition && (
          <span className="absolute bottom-1 right-1 bg-[#F7F4EE]/90 px-1.5 py-1 font-sans-label text-[8px] uppercase tracking-wider">
            Fac-símile não digitalizado
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="font-sans-label text-[9px] uppercase tracking-[0.16em] text-[#76684F]">
          {work.originalYear} · {work.movement}
        </p>
        <h4 className="mt-1 font-serif-title text-base leading-snug text-[#29251F]">{work.title}</h4>
        <div className="mt-auto pt-3">
          {edition ? (
            <button
              type="button"
              onClick={() => onOpenBook(edition.id)}
              className="w-full border border-[#4C4438] bg-[#2A2724] px-3 py-2 font-sans-label text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F7F4EE] transition-colors hover:bg-[#494136] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6D46]"
            >
              Abrir no leitor
            </button>
          ) : (
            <p className="border-t border-[#D8CEBC] pt-2 font-sans-label text-[9px] uppercase leading-relaxed tracking-wider text-[#76684F]">
              Texto integral ainda não disponível neste acervo
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function AuthorFolderDrawer({ books, onOpenBook }) {
  const [selectedAuthorId, setSelectedAuthorId] = useState(ARCHIVE_AUTHORS[0].id);
  const [mobileExpandedId, setMobileExpandedId] = useState(ARCHIVE_AUTHORS[0].id);
  const [query, setQuery] = useState('');

  const filteredAuthors = useMemo(() => {
    const term = normalize(query.trim());
    if (!term) return ARCHIVE_AUTHORS;

    return ARCHIVE_AUTHORS.filter(
      (author) =>
        normalize(`${author.name} ${author.movement} ${author.city}`).includes(term) ||
        author.books.some((work) => normalize(work.title).includes(term))
    );
  }, [query]);

  useEffect(() => {
    if (!filteredAuthors.some((author) => author.id === selectedAuthorId)) {
      setSelectedAuthorId(filteredAuthors[0]?.id ?? '');
    }
    if (!filteredAuthors.some((author) => author.id === mobileExpandedId)) {
      setMobileExpandedId('');
    }
  }, [filteredAuthors, mobileExpandedId, selectedAuthorId]);

  const selectedAuthor =
    filteredAuthors.find((author) => author.id === selectedAuthorId) ?? filteredAuthors[0];

  const renderDossier = (author) => (
    <motion.article
      key={author.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="border border-[#D1C5AF] bg-[#F7F4EE] p-4 shadow-[0_12px_32px_-24px_rgba(42,39,36,0.7)] sm:p-7 lg:p-9"
    >
      <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[210px_minmax(0,1fr)]">
        <div className="mx-auto w-full max-w-[180px] md:mx-0 lg:max-w-[210px]">
          <AuthorPortrait author={author} />
          <p className="mt-2 text-center font-sans-label text-[9px] uppercase tracking-[0.16em] text-[#76684F]">
            {author.lifespan}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[#D8CEBC] pb-3">
            <span className="font-sans-label text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C6D46]">
              {author.archiveCode}
            </span>
            <span className="text-[#A99A7E]" aria-hidden="true">·</span>
            <span className="font-sans-label text-[10px] uppercase tracking-[0.12em] text-[#76684F]">
              {author.city}
            </span>
          </div>
          <h3 className="mt-4 font-serif-title text-3xl leading-tight text-[#29251F] sm:text-4xl">
            {author.shortName}
          </h3>
          <p className="mt-1 font-sans-label text-[11px] uppercase tracking-[0.17em] text-[#76684F]">
            {author.movement}
          </p>
          <p className="mt-4 max-w-3xl font-serif-body text-base leading-7 text-[#454037]">
            {author.bio}
          </p>
          <div className="mt-6 flex items-baseline justify-between gap-3 border-t border-[#D8CEBC] pt-4">
            <h4 className="font-serif-title text-xl text-[#29251F]">Obras catalogadas</h4>
            <span className="font-sans-label text-[10px] uppercase tracking-wider text-[#76684F]">
              {author.books.length} {author.books.length === 1 ? 'registro' : 'registros'}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {author.books.map((work) => (
              <WorkCard
                key={work.id}
                author={author}
                work={work}
                books={books}
                onOpenBook={onOpenBook}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );

  return (
    <section id="autores" className="scroll-mt-8">
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[#D8CEBC] pb-5 md:flex-row md:items-end">
        <div>
          <p className="font-sans-label text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8C6D46]">
            Arquivo literário brasileiro · Século XIX
          </p>
          <h2 className="mt-2 font-serif-title text-3xl text-[#29251F] sm:text-4xl">
            Fichário de autores
          </h2>
          <p className="mt-2 max-w-2xl font-serif-body text-sm leading-6 text-[#625A4E]">
            Abra uma pasta para consultar o dossiê biográfico e as obras registradas no acervo.
          </p>
        </div>
        <label className="block w-full md:max-w-xs">
          <span className="sr-only">Buscar autor, obra ou movimento literário</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar autor, obra ou movimento"
            className="w-full border border-[#CFC3AD] bg-[#EFE9DF] px-3 py-2.5 font-sans-label text-xs text-[#29251F] placeholder:text-[#827764] focus:border-[#8C6D46] focus:outline-none focus:ring-1 focus:ring-[#8C6D46]"
          />
        </label>
      </div>

      <div className="border border-[#51483B] bg-[#2A2724] p-3 shadow-[0_16px_38px_-28px_rgba(42,39,36,0.8)] sm:p-5">
        <div className="mb-4 flex items-center justify-between border-b border-[#51483B] pb-3">
          <span className="font-sans-label text-[9px] uppercase tracking-[0.2em] text-[#D9CCB5] sm:text-[10px]">
            Gaveta I · Literatura brasileira
          </span>
          <span className="font-sans-label text-[9px] uppercase tracking-wider text-[#B8A98E]">
            {filteredAuthors.length} pastas
          </span>
        </div>

        {filteredAuthors.length === 0 ? (
          <p className="py-8 text-center font-serif-body text-sm text-[#E6DDCC]">
            Nenhuma pasta corresponde à busca.
          </p>
        ) : (
          <>
            <div className="hidden items-end gap-1.5 md:flex">
              {filteredAuthors.map((author, index) => {
                const isSelected = author.id === selectedAuthor?.id;
                return (
                  <motion.button
                    key={author.id}
                    layout
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedAuthorId(author.id)}
                    initial={false}
                    animate={{ y: isSelected ? -5 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ zIndex: isSelected ? 2 : 1 }}
                    className={`relative -mb-px min-w-0 flex-1 border border-b-0 px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A878] ${
                      isSelected
                        ? 'border-[#CFC3AD] bg-[#F7F4EE] text-[#29251F]'
                        : 'border-[#88795F] bg-[#DED4C1] text-[#4D4437] hover:bg-[#E9E1D2]'
                    }`}
                  >
                    <span className="block truncate font-sans-label text-[8px] uppercase tracking-[0.13em] text-[#76684F]">
                      {String(index + 1).padStart(2, '0')} · {author.lifespan}
                    </span>
                    <span className="mt-1 block truncate font-serif-title text-sm font-semibold">
                      {author.shortName}
                    </span>
                    <span className="mt-0.5 block truncate font-sans-label text-[9px] text-[#76684F]">
                      {author.movement}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="space-y-2 md:hidden">
              {filteredAuthors.map((author, index) => {
                const isExpanded = mobileExpandedId === author.id;
                return (
                  <div key={author.id} className="border border-[#88795F] bg-[#DED4C1]">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => {
                        setSelectedAuthorId(author.id);
                        setMobileExpandedId(isExpanded ? '' : author.id);
                      }}
                      className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-[#29251F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#8C6D46]"
                    >
                      <span className="min-w-0">
                        <span className="block font-sans-label text-[9px] uppercase tracking-[0.14em] text-[#76684F]">
                          {String(index + 1).padStart(2, '0')} · {author.lifespan}
                        </span>
                        <span className="mt-1 block font-serif-title text-base font-semibold">
                          {author.shortName}
                        </span>
                      </span>
                      <span aria-hidden="true" className="font-serif-title text-xl">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-2">{renderDossier(author)}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {selectedAuthor && (
                <div key={selectedAuthor.id} className="mt-0 hidden border border-[#CFC3AD] bg-[#F7F4EE] p-1 md:block">
                  {renderDossier(selectedAuthor)}
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      <p className="mt-3 font-sans-label text-[9px] uppercase tracking-wider text-[#76684F]">
        A leitura direta está disponível para as edições digitais integrais já incorporadas ao acervo.
      </p>
    </section>
  );
}
