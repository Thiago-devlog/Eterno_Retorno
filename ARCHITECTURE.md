# Arquitetura — Eterno Retorno

> **Biblioteca Clássica & Arquivo Literário**
> Experiência editorial construída com React 19, Vite, Tailwind CSS 4, Motion 12, Epub.js e Firebase (Auth & Firestore).

---

## 1. Visão Geral e Princípios de Engenharia

O **Eterno Retorno** é uma aplicação web imersiva dedicada ao resgate e fruição da literatura brasileira canônica (com foco inicial na Trilogia Realista de Machado de Assis e contemporâneos do século XIX).

### Princípios Inegociáveis (Anti-Slop & Editorial Craft)
1. **Atmosfera de Papel Físico:** Tipografia hierárquica severa (*Playfair Display*, *Merriweather*, *Plus Jakarta Sans*), paleta pergaminho (`#FBF9F5` / `#FAF8F5`) e tinta carvão (`#1B1C1A`).
2. **Zero Poluição Visual:** Sem gradientes roxos genéricos, sem badges redundantes, sem decorações vazias. Apenas contenção e intenção.
3. **Fluidez Cinética:** Transições com curva *ease-out-expo* (`cubic-bezier(0.16, 1, 0.3, 1)`).
4. **Resiliência e Continuidade Silenciosa:** O leitor nunca deve ser interrompido por formulários de login ou falhas de rede. A persistência é silenciosa e transparente.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Propósito |
|---|---|---|
| **Build & Tooling** | Vite 6 + PostCSS | Bundling ultrarrápido com divisão de chunks manuais (`epubjs` isolado) |
| **Framework UI** | React 19 (SPA) | Componentização modular e reatividade |
| **Animações** | Motion 12 (`framer-motion`) | Transições de tela, pastas e gaveta de sumário |
| **Estilização** | Tailwind CSS 4 + `@tailwindcss/vite` | Tokens editoriais em `src/index.css` (`@theme`) |
| **Motor de Leitura** | Epub.js (0.3.93) | Rendição paginada, navegação por CFI, sumário (TOC) e captura de seleções |
| **Autenticação** | Firebase Auth (Anônimo) | Identidade única persistida (`uid`) sem telas de cadastro |
| **Banco de Dados** | Cloud Firestore | Coleção `progresso_leitura` com chave composta `{uid}_{bookId}` |
| **Resiliência Local** | Web Storage (`localStorage`) | Cache instantâneo para operação offline e fallback de rede |

---

## 3. Topologia e Estrutura de Pastas

```
Eterno_Retorno/
├── public/
│   └── assets/
│       ├── authors/              # Retratos e imagens de autores
│       ├── books/epub/           # Arquivos EPUB do catálogo
│       └── covers/               # Capas e fac-símiles das obras
├── src/
│   ├── pages/
│   │   └── LibraryPage.jsx       # Composição e estado local da tela da biblioteca
│   ├── components/
│   │   ├── Library/              # Acervo, cards canônicos e filtros
│   │   │   ├── AuthorFolderDrawer.jsx # Fichário responsivo e dossiês
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookGrid.jsx      # Grade alternativa/legada
│   │   │   ├── CanonicalCatalog.jsx
│   │   │   ├── ContinueReadingCard.jsx
│   │   │   ├── FeaturedAuthor.jsx
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── LibraryHeader.jsx
│   │   │   ├── QuickAccessCatalog.jsx
│   │   │   ├── ReadingLog.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── Reader/               # Motor de leitura e toolbar
│   │   │   ├── EpubReader.jsx    # Leitor principal interativo
│   │   │   └── ReaderModal.jsx   # (Legado/alternativo)
│   │   └── UI/                   # Componentes de interface compartilhados
│   │       └── Header.jsx        # (Legado/alternativo)
│   ├── data/
│   │   ├── authors.js            # Metadados dos cinco autores do fichário
│   │   └── books.js              # Metadados e catálogo das obras canônicas
│   ├── hooks/
│   │   ├── useAuth.js            # Hook de identidade silenciosa do leitor
│   │   └── useReader.js          # (Legado/alternativo) Hook de estado do leitor
│   ├── services/
│   │   ├── firebase.js           # Inicialização do Firebase SDK
│   │   ├── authService.js        # Gestão de login anônimo
│   │   ├── readingService.js     # Sincronização de progresso e CFI no Firestore
│   │   └── epubService.js        # Temas, fontes e rendition do Epub.js
│   ├── App.jsx                   # Shell: autenticação, progresso e troca biblioteca/leitor
│   ├── index.css                 # Diretivas do Tailwind e classes de textura
│   └── main.jsx                  # Ponto de entrada React
├── ARCHITECTURE.md               # Este documento de visão geral
├── ROADMAP.md                    # Plano mestre de desenvolvimento em 4 fases
├── SKILL.md                      # Regras inegociáveis de design editorial
├── tailwind.config.js            # Compatibilidade para utilitários legados
└── vite.config.js                # Chunks otimizados para produção
```

### Convenções de organização
- `pages/` compõe telas e concentra estado específico da página.
- `components/Library/` contém blocos da biblioteca, cada um com uma
  responsabilidade visual ou de interação.
- `components/Reader/` contém a interface de leitura EPUB.
- `components/Library/AuthorFolderDrawer.jsx` apresenta os cinco dossiês; em telas estreitas, as pastas viram um acordeão.
- `data/authors.js` guarda metadados editoriais concisos. A leitura direta só é habilitada quando existe uma edição EPUB correspondente em `data/books.js`.
- `public/assets/` guarda os arquivos estáticos servidos pela aplicação,
  separados entre retratos, capas e livros digitais.
- `services/`, `hooks/` e `data/` isolam acesso externo, estado compartilhado e
  conteúdo estático, respectivamente.
- Os arquivos marcados como legados permanecem no repositório, mas não fazem
  parte do fluxo ativo iniciado por `App.jsx`.

---

## 4. Modelo de Dados — Cloud Firestore

### Coleção: `progresso_leitura`
- **ID do Documento:** `{userId}_{bookId}` (ex: `anon_84f9a2_memorias-posthumas`)
  - Chave composta evita índices compostos caros e permite leituras pontuais `O(1)`.

```typescript
interface ReadingProgressDocument {
  userId: string;          // UID anônimo do Firebase Auth
  bookId: string;          // Identificador da obra (ex: 'memorias-posthumas')
  cfi: string;             // Posição canônica precisa no EPUB (ex: 'epubcfi(/6/14[cap1]!/4/2/1:0)')
  percentage: number;      // Progresso percentual arredondado (0 a 100)
  updatedAt: Timestamp;    // Data e hora da última virada de página
  startedAt?: Timestamp;   // Data e hora em que a obra foi iniciada pela primeira vez
}
```

---

## 5. Ciclo de Vida do Leitor e Sincronização

```
[Início do App]
       │
       ▼
useAuth() ──> initSilentAuth() ──> Firebase UID anônimo obtido (ou restaurado)
       │
       ▼
getLastReadBook(uid) ──> Se houver progresso > 0 ──> Exibe Card "Continuar Lendo"
       │
       ▼ [Usuário clica em uma obra]
Abre <EpubReader book={selectedBook} uid={uid} />
       │
       ├── 1. getReadingProgress(uid, book.id) consulta último CFI
       ├── 2. Rendition do Epub.js abre diretamente no CFI salvo
       ├── 3. Evento 'relocated' dispara a cada página
       │         └── Debounce de 1.000ms ──> saveReadingProgress(uid, book.id, cfi, pct)
       │         └── Atualiza barra de progresso editorial (2px terracotta)
       │         └── Indicador discreto na toolbar: 'Salvando...' ──> 'Sincronizado'
       ▼
[Fechamento do Leitor]
Volta para a Biblioteca com estado reativo atualizado instantaneamente.
```

---

As preferências tipográficas (14–24 px, família e tema) ficam em `localStorage`
sob a chave `er_reader_preferences`. A última posição EPUB continua sendo salva
no cache local pelo serviço de leitura e sincronizada com o Firestore quando
este está configurado.

## 6. Tokens e identidade editorial

`src/index.css` declara em `@theme` as cores `paper-canvas`, `paper-surface`,
`paper-dark`, `sepia-accent` e `charcoal`, além das famílias serifadas de título
e leitura e da fonte sans-serif de metadados. O `@config` mantém utilitários
existentes durante a migração do Tailwind CSS 3 para a versão 4.

## 7. Regras de Segurança do Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /progresso_leitura/{docId} {
      function isOwnDocument() {
        return request.auth != null
          && docId.matches('^' + request.auth.uid + '_.*$');
      }

      allow read, delete: if isOwnDocument();
      allow create, update: if isOwnDocument()
        && request.resource.data.userId == request.auth.uid
        && request.resource.data.bookId is string
        && docId == request.auth.uid + '_' + request.resource.data.bookId
        && request.resource.data.cfi is string
        && request.resource.data.percentage is number
        && request.resource.data.percentage >= 0
        && request.resource.data.percentage <= 100;
    }
  }
}
```

O progresso usa sempre percentuais de `0` a `100`. Quando o Firebase não está
configurado ou a nuvem está indisponível, a interface informa que a posição foi
salva somente neste dispositivo; ela não apresenta esse estado como sincronizado.
