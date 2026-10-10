# Redesign do Eterno Retorno — Biblioteca Clássica & Sistema de Pastas de Autores

Reimaginação completa da interface e experiência do **Eterno Retorno**, unindo a elegância editorial do acervo histórico da tela inicial à mecânica tátil de um **fichário físico de arquivo literário** (pastas com abas escalonadas por autor, inspiradas na referência visual enviada), complementada por uma estante visual de obras canônicas e um leitor imersivo de texto integral.

---

## Decisões Críticas & Alinhamento com o Usuário

> [!IMPORTANT]
> **Conceito Central Confirmado**:
> 1. **Fichário Tátil de Pastas de Autores (Arquivo Físico)**: Inspirado na referência com abas escalonadas (*tabbed folders drawer*). Cada pasta representa um autor do Século XIX (Machado de Assis, José de Alencar, Lima Barreto, Aluísio Azevedo, Raul Pompéia). Ao selecionar uma pasta, ela se projeta para frente em animação suave, revelando a ficha biobibliográfica do autor e todas as suas obras canônicas catalogadas.
> 2. **Identidade Visual Híbrida (Papel Editorial + Arquivo Clássico)**: Preservação da atmosfera nobre da tela inicial original (`#F7F4EE` e tons sépia de linho/papel envelhecido, serifas nobres `Playfair Display` / `Lora`, detalhes em preto carvão e acentos bronze/terracota), combinada com o minimalismo clean de capas e estante (referências *mymind* e estante realista).
> 3. **Leitor Imersivo Integrado**: Além de explorar pastas e catálogo, o usuário pode clicar em qualquer obra para abrir o leitor tipográfico completo (com modos Sépia/Papel, Claro e Escuro, ajuste de tamanho de fonte, marcadores e persistência de progresso em tempo real).

---

## 1. Visão Geral & Conceito do Produto

* **O que faz**: O aplicativo transforma a exploração e leitura de clássicos da literatura brasileira em uma experiência tátil de arquivo histórico. O usuário navega por gavetas e pastas com abas salientes organizadas por autor, puxa dossiês temáticos, visualiza capas originais fac-símiles em prateleiras e estantes limpas, e lê as obras completas com acompanhamento de progresso.
* **Público-alvo**: Leitores, estudantes, pesquisadores e apreciadores da literatura do Século XIX e do cânone machadiano que valorizam tipografia editorial, design de arquivo clássico e leitura sem distrações.
* **Proposta de Valor**: Eliminar a frieza de bibliotecas digitais genéricas trazendo a nostalgia, textura e clareza física de um arquivo catalográfico real do século XIX em formato web moderno.

---

## 2. Experiência do Usuário & Design Visual

### Fluxos Principais do Usuário
1. **Visão Geral & Continuar Lendo (Hero & Nook)**:
   * Barra superior refinada com marca institucional `ETERNO RETORNO`, menu de navegação e atalho de acervo.
   * Banner sutil "Continuar Lendo" destacando a última obra em progresso (ex: *Quincas Borba*, 97%) com botão de retomada imediata.
2. **O Fichário de Autores (Sistema de Pastas com Abas Escalonadas)**:
   * Gaveta de arquivo interativa com pastas em camadas tridimensionais suaves e abas etiquetadas (*Machado de Assis*, *José de Alencar*, *Lima Barreto*, *Aluísio Azevedo*, *Raul Pompéia*).
   * Hover e seleção com feedback tátil: ao clicar, a pasta sobe com efeito de relevo (*motion* suave) e abre o **Dossiê do Autor**.
   * O dossiê aberto exibe o retrato histórico gravado, cronologia/estilo (Realismo, Romantismo, Naturalismo) e a grade de livros daquele autor.
3. **Catálogo & Estante Canônica (Modos de Visualização)**:
   * Alternador fluido entre **Fichário de Pastas**, **Grade de Capas Fac-símile** (estilo *mymind*) e **Estante com Prateleiras de Madeira** (estilo *Aesthetic Bookshelf*).
   * Filtros rápidos por movimento literário (Realismo, Naturalismo, Trilogia Machadiana).
4. **Leitor Imersivo de Texto Integral (Reading Canvas)**:
   * Abertura em tela dedicada de leitura: barra minimalista com título da obra, progresso percentual, índice de capítulos e botão de retorno.
   * Controles de leitura: Fonte Serifada / Sans / Mono, tamanho do texto ($14\text{px}$ a $22\text{px}$), espaçamento entre linhas e modos de fundo (**Papiro Sépia**, **Papel Antigo**, **Carvão Noturno**).
   * Salvamento automático do progresso de leitura no `localStorage`.

### Identidade Visual & Paleta de Cores
* **Cores de Fundo**: Archival Warm Paper (`#F7F4EE` para canvas principal, `#EFE9DF` para superfícies secundárias, `#2A2724` para modo noturno).
* **Tipografia**:
  * *Títulos e Destaques*: `Playfair Display` e `Cinzel` (elegância clássica e peso histórico).
  * *Texto de Leitura e Dossiês*: `Lora` ou `Source Serif 4` (legibilidade superior e cadência editorial).
  * *Metadados e Abas de Pastas*: `DM Sans` / `Plus Jakarta Sans` com tracking refinado para rotulagem de arquivo.
* **Texturas e Acabamentos**:
  * Abas de pastas em papel cartão rígido com texturas suaves, dobras e sutis sombras de elevação escalonadas.
  * Capas de livros com relevo de lombada e sombreado de projeção realista.

---

## 3. Decisões de Produto & Arquitetura

* **Decisão 1: Representação das Pastas com Abas**:
  * *Abordagem*: Componente interativo em CSS/Framer Motion simulando as abas escalonadas da referência fotográfica, permitindo tanto clique direto nas abas salientes quanto navegação por teclado e busca rápida.
  * *Por que*: Entrega exatamente o elemento visual de destaque solicitado pelo usuário sem comprometer a usabilidade em dispositivos móveis.
* **Decisão 2: Persistência de Leitura e Preferências**:
  * *Abordagem*: `localStorage` nativo e tipado para posições de leitura, porcentagens concluídas, tema escolhido e histórico recente.
  * *Por que*: Instantâneo, confiável, não requer login obrigatório inicial e mantém o estado entre recarregamentos.
* **Decisão 3: Conteúdo Canônico Completo**:
  * *Abordagem*: Obras emblemáticas completas com capítulos estruturados para navegação real (*Memórias Póstumas de Brás Cubas*, *Dom Casmurro*, *Quincas Borba*, *O Cortiço*, *Iracema*, *O Ateneu*).

---

## 4. Arquitetura Técnica & Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ETERNO RETORNO - TOPBAR & HERO                        │
│  [ Marca ] ── [ Fichário | Estante | Todas as Obras ] ── [ Continuar Lendo ]│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌──────────────────────────────────────┐       ┌──────────────────────────────┐
│     GAVETA DE PASTAS DE AUTORES      │       │     CATÁLOGO / ESTANTE       │
│  ┌────────────────────────────────┐  │       │  [ Capas Fac-símiles 3D ]    │
│  │ Aba 1: Machado de Assis        │  │       │  [ Prateleiras de Madeira ]  │
│  │ Aba 2: Aluísio Azevedo         │  │       │  [ Filtros por Movimento ]   │
│  │ Aba 3: José de Alencar         │  │       └──────────────┬───────────────┘
│  │ Aba 4: Raul Pompéia            │  │                      │
│  │ Aba 5: Lima Barreto            │  │                      │
│  └────────────────┬───────────────┘  │                      │
└───────────────────┼──────────────────┘                      │
                    │ (Seleciona pasta)                       │
                    ▼                                         │
┌──────────────────────────────────────┐                      │
│       DOSSIÊ DO AUTOR EXPANDIDO      │                      │
│  • Retrato & Perfil Biográfico       │                      │
│  • Obras do Autor (Fichas & Capas)   │                      │
└───────────────────┬──────────────────┘                      │
                    │                                         │
                    └───────────────────┬─────────────────────┘
                                        │ (Clique em uma Obra)
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        LEITOR EDITORIAL IMERSIVO                            │
│  • Controles de Tipografia (Tamanho, Linhas, Fonte Serif/Sans)              │
│  • Modos de Cor (Sépia Quente, Papel Claro, Carvão Noturno)                 │
│  • Navegador de Capítulos & Barra de Progresso em Tempo Real                │
│  • Texto Integral Formatado com Capitulares Clássicas                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Estrutura de Estado e Dados
* `authors`: Lista de autores clássicos com biografia, período, imagem histórica e array de obras.
* `books`: Coleção de livros com metadados (ano, movimento, sinopse, capa estilizada/fac-símile, capítulos com texto integral).
* `readingProgress`: Dicionário com `{ bookId: { chapterIndex, scrollPercentage, lastReadAt } }`.
* `readerSettings`: `{ fontSize, fontFamily, theme, lineSpacing }`.
* `activeFolderId`: ID do autor atualmente em destaque no fichário.

---

## Próximos Passos Imediatos após Aprovação
1. Atualizar metadados (`index.html`, `metadata.json`) e importar as tipografias editoriais (`Playfair Display`, `Cinzel`, `Lora`).
2. Implementar a base de dados canônica com os autores e obras completas do Século XIX.
3. Desenvolver o componente do **Fichário de Pastas Físicas** com animações de profundidade e abas escalonadas.
4. Desenvolver as visões de **Dossiê do Autor** e **Estante / Grade de Capas**.
5. Desenvolver o **Leitor Editorial Imersivo** com ajustes personalizados e persistência.
6. Testar e compilar a aplicação com `compile_applet`.
