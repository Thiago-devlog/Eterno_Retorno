# ROADMAP — Eterno Retorno

> **Plano Mestre de Desenvolvimento da Aplicação**  
> Documento orientador de arquitetura, fases de entrega e regras de execução técnica.

---

## 🗺️ Visão Geral do Roadmap

```
[Visão Geral no ARCHITECTURE.md] ──> O agente lê o contexto global
                                              │
┌─────────────────────────────────────────────┴─────────────────────────────────────────────┐
│ 1. Fase 1: Interface, Arquivo & Leitor EPUB            [ STATUS: CONCLUÍDO ]               │
│ 2. Fase 2: Autenticação & Progresso no Firestore      [ STATUS: IMPLEMENTADO ]            │
│ 3. Fase 3: Destaques, Anotações & Marcações de Texto  [ STATUS: PLANEJADO ]               │
│ 4. Fase 4: PWA, Modo Offline & Polimento Visual       [ STATUS: PLANEJADO ]               │
└───────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📌 Detalhamento das Fases

### Fase 1: Interface, Arquivo & Leitor EPUB (`STATUS: CONCLUÍDO`)
- [x] Stack React 19 + Vite 6 + Tailwind CSS 4 (`@tailwindcss/vite`) e Motion 12.
- [x] Tokens editoriais em `src/index.css` via `@theme` (papel, carvão, bronze e famílias tipográficas).
- [x] Fichário escalonado para cinco autores, com dossiês e modo acordeão em telas pequenas.
- [x] Catálogo indica claramente quais obras têm EPUB integral disponível; somente essas abrem no leitor.
- [x] Componente do Leitor interativo (`EpubReader.jsx`) com Epub.js:
  - Paginação fluida e atalhos de teclado (← / → / Esc).
  - Gaveta de Sumário (TOC) com transição Framer Motion.
  - Toolbar com controle de tamanho de fonte de 14 a 24 px, alternância tipográfica e temas papel, claro e carvão noturno.
  - Progresso em tempo real na barra superior e preferências do leitor em `localStorage`.
  - Transição suave entre Biblioteca e Leitor via `AnimatePresence`.

---

### Fase 2: Autenticação & Progresso no Firestore (`STATUS: IMPLEMENTADO`)
> **Objetivo:** Garantir a continuidade da leitura em qualquer dispositivo de maneira transparente, silenciosa e resiliente.

#### 1. Autenticação de Leitor Silenciosa
- [x] Implementação em `src/services/authService.js`:
  - `initSilentAuth()`: Login anônimo automático (`signInAnonymously`) no carregamento do app.
  - Reutilização automática da sessão existente no navegador sem regenerar UID.
  - Sem formulários, sem modais de bloqueio, sem atrito para o leitor.
  - Hook reativo `src/hooks/useAuth.js` fornecendo `{ user, uid, authReady }`.

#### 2. Persistência e Sincronização de Progresso de Leitura
- [x] Serviço em `src/services/readingService.js`:
  - Coleção Firestore: `progresso_leitura`.
  - ID do documento composto: `{userId}_{bookId}` para leituras pontuais imediatas.
  - Campos salvos: `userId`, `bookId`, `cfi`, `percentage`, `updatedAt`, `startedAt`.
  - Função `saveReadingProgress(userId, bookId, cfi, percentage)`.
  - Função `getReadingProgress(userId, bookId)` para carregar última posição.
  - Função `getLastReadBook(userId, bookIds)` para alimentar a Home.
- [x] Conexão no Leitor (`EpubReader.jsx`):
  - Ao abrir o livro: recupera `savedCfi` e posiciona a leitura diretamente no ponto exato.
  - Ao virar a página (`relocated`): emite evento e executa `persistProgress` com **debounce exato de 1.000ms**.
  - Indicador visual discreto de sincronização na barra de ferramentas (`Salvando...` / `Sincronizado` / `Offline`).
  - Barra de progresso contínua de 2px no rodapé do leitor (track `#E2DCD5`, fill `terracotta`/`ochre-aged`).

#### 3. Destaque "Continuar Lendo" na Biblioteca (`App.jsx`)
- [x] Consulta do último livro lido ao obter o `uid`.
- [x] Card editorial discreto logo abaixo do cabeçalho da Home com miniatura da capa, título, percentual de avanço e botão direto de retorno.
- [x] Transição de entrada e saída via Framer Motion com curva *ease-out-expo*.

#### 4. Resiliência e Modo Offline/Local First (Fallback)
- [x] Fallback automático em `localStorage` para leitura e gravação local instantânea caso as chaves do Firebase não estejam configuradas ou haja instabilidade de rede.

---

### Fase 3: Destaques, Anotações & Marcações de Texto (`STATUS: PLANEJADO`)
- [ ] Captura de seleção de texto no EPUB (`cfiRange` e string destacada).
- [ ] Menu contextual flutuante no leitor: *Grifar (Amarelo Canônico / Terracota)*, *Anotar*, *Copiar Citação com Atribuição*.
- [ ] Persistência de anotações no Firestore (`colecao_anotacoes`: `{userId, bookId, cfiRange, texto, comentario, cor, data}`).
- [ ] Aba "Anotações e Citações" na gaveta lateral do leitor.
- [ ] Painel "Caderno de Notas" na página principal listando reflexões acumuladas do leitor.

---

### Fase 4: PWA, Modo Offline & Polimento Visual (`STATUS: PLANEJADO`)
- [ ] Configuração de Service Worker e manifesto PWA (leitura completa sem internet).
- [ ] Cache local dos arquivos `.epub` via Cache API / IndexedDB.
- [ ] Modo tela cheia sem distrações (*Zen Reading Mode*).
- [ ] Polimento tátil final e microinterações de virada de página física.
- [ ] Auditoria de acessibilidade (Lighthouse 100, contraste editorial WCAG AAA).

---

## 🎯 Diretrizes de execução

1. **Escopo:** Preserve o progresso local e remoto ao evoluir o leitor. Recursos adicionais das fases 3 e 4 continuam fora do escopo até solicitação.
2. **Economia de Tokens:** Siga rigorosamente as convenções do `Graft-main` — edições pontuais, sem reescrita integral de arquivos extensos quando alterações locais forem suficientes.
3. **Padrão Editorial (Anti-Slop):** Mantenha fidelidade irrestrita ao `SKILL.md` e `DESIGN.md`. Sem gradientes saturados, sem bordas pesadas, sem componentes barulhentos.
4. **Validação Contínua:** Todo ciclo de código deve ser concluído com `npm run build` passando com código de saída 0.
