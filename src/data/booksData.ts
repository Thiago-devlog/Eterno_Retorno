export interface ChapterData {
  id: string;
  number: string;
  title: string;
  content: string[];
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  authorId: string;
  year: number;
  century: string;
  category: string;
  rating: number;
  reviewsCount: string;
  tagline: string;
  coverUrl?: string;
  epubUrl?: string;
  bgStyle: string;
  coverBg: string;
  coverBorder: string;
  coverAccent: string;
  editionLabel: string;
  description: string;
  pagesCount: number;
  chapters: ChapterData[];
}

export interface AuthorProfile {
  id: string;
  name: string;
  shortName: string;
  lifespan: string;
  role: string;
  city: string;
  movement: string;
  tagline: string;
  avatarUrl: string;
  portraitUrl: string;
  bio: string;
  quote: string;
  archiveCode: string;
  folderColor: string;
  tabLabel: string;
}

export const AUTHORS_DATABASE: AuthorProfile[] = [
  {
    id: 'machado-de-assis',
    name: 'Machado de Assis',
    shortName: 'Machado',
    lifespan: '1839 – 1908',
    role: 'Fundador da Academia Brasileira de Letras',
    city: 'Rio de Janeiro',
    movement: 'Realismo Psicológico',
    tagline: 'O Bruxo do Cosme Velho & o gênio da ironia cética',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Machado_de_Assis_real.jpg/240px-Machado_de_Assis_real.jpg',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Machado_de_Assis_real.jpg/480px-Machado_de_Assis_real.jpg',
    bio: 'Mestre soberano da literatura brasileira. Rompeu com os sentimentalismos românticos ao publicar Memórias Póstumas de Brás Cubas em 1881, instaurando o Realismo com narradores desconfiáveis, ironia cáustica e o desnudamento da hipocrisia social.',
    quote: 'Não tive filhos, não transmiti a nenhuma criatura o legado da nossa miséria.',
    archiveCode: 'DOSSIÊ CANÔNICO N° 1881-MMA',
    folderColor: '#8C2D19',
    tabLabel: 'Machado',
  },
  {
    id: 'jose-de-alencar',
    name: 'José de Alencar',
    shortName: 'Alencar',
    lifespan: '1829 – 1877',
    role: 'Patrono da Língua Nacional',
    city: 'Niterói',
    movement: 'Romantismo Indianista & Urbano',
    tagline: 'O arquiteto da mitologia literária e da natureza brasileira',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Jos%C3%A9_de_Alencar_01.jpg/240px-Jos%C3%A9_de_Alencar_01.jpg',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Jos%C3%A9_de_Alencar_01.jpg/480px-Jos%C3%A9_de_Alencar_01.jpg',
    bio: 'Fundador do sentimento de brasilidade nas letras. Em Iracema e O Guarani, entrelaçou os ritmos das línguas indígenas ao português erudito, concebendo mitos heroicos fundacionais.',
    quote: 'Além, muito além daquela serra, que ainda azula no horizonte, nasceu Iracema.',
    archiveCode: 'DOSSIÊ CANÔNICO N° 1865-JAL',
    folderColor: '#905F2D',
    tabLabel: 'Alencar',
  },
  {
    id: 'castro-alves',
    name: 'Castro Alves',
    shortName: 'Castro Alves',
    lifespan: '1847 – 1871',
    role: 'O Poeta dos Escravos',
    city: 'Salvador',
    movement: 'Condoreirismo / Romantismo Cívico',
    tagline: 'A voz inflamada da abolição e da liberdade humana',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Castro_Alves_01.jpg/240px-Castro_Alves_01.jpg',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Castro_Alves_01.jpg/480px-Castro_Alves_01.jpg',
    bio: 'Poeta de oratória arrebatadora cuja poesia se ergueu contra as atrocidades do tráfico transatlântico e da escravidão. Sua lírica combinou paixão amorosa incandescente com conclamações épicas à justiça social.',
    quote: 'Senhor Deus dos desgraçados! Dizei-me vós, Senhor Deus! Se é loucura... se é verdade tanto horror perante os céus?!',
    archiveCode: 'DOSSIÊ CANÔNICO N° 1870-CAL',
    folderColor: '#8B6A3D',
    tabLabel: 'Castro',
  },
  {
    id: 'aluisio-azevedo',
    name: 'Aluísio Azevedo',
    shortName: 'Aluísio',
    lifespan: '1857 – 1913',
    role: 'Pioneiro do Naturalismo Brasileiro',
    city: 'Rio de Janeiro',
    movement: 'Naturalismo Social & Científico',
    tagline: 'O dissecador implacável das habitações coletivas e dos instintos',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Alu%C3%ADsio_Azevedo.jpg/240px-Alu%C3%ADsio_Azevedo.jpg',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Alu%C3%ADsio_Azevedo.jpg/480px-Alu%C3%ADsio_Azevedo.jpg',
    bio: 'Introduziu as teses zolianas e deterministas no Brasil. Em O Cortiço e O Mulato, transformou espaços urbanos em organismos vivos onde a biologia e a avareza regem o destino dos homens.',
    quote: 'Eram cinco horas da manhã e o cortiço acordava, abrindo a sua infinidade de portas e janelas alinhadas.',
    archiveCode: 'DOSSIÊ CANÔNICO N° 1890-AAZ',
    folderColor: '#7A4B34',
    tabLabel: 'Aluísio',
  },
  {
    id: 'raul-pompeia',
    name: 'Raul Pompéia',
    shortName: 'Pompéia',
    lifespan: '1863 – 1895',
    role: 'Mestre do Impressionismo Psicológico',
    city: 'Rio de Janeiro',
    movement: 'Realismo Impressionista',
    tagline: 'A angústia moral e o rigor do colégio interno',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Raul_Pomp%C3%A9ia_01.jpg/240px-Raul_Pomp%C3%A9ia_01.jpg',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Raul_Pomp%C3%A9ia_01.jpg/480px-Raul_Pomp%C3%A9ia_01.jpg',
    bio: 'Dono de uma prosa lírica densa, febril e plástica. Seu romance O Ateneu constitui um monumento literário sobre a perda da inocência e as crueldades institucionais.',
    quote: 'Vais encontrar o mundo, disse-me meu pai, à porta do Ateneu: coragem para a luta.',
    archiveCode: 'DOSSIÊ CANÔNICO N° 1888-RPO',
    folderColor: '#5F2B1E',
    tabLabel: 'Pompéia',
  },
  {
    id: 'lima-barreto',
    name: 'Lima Barreto',
    shortName: 'Lima Barreto',
    lifespan: '1881 – 1922',
    role: 'A Voz do Subúrbio e da Resistência',
    city: 'Rio de Janeiro',
    movement: 'Pré-Modernismo Social',
    tagline: 'A crônica afiada contra o ufanismo vazio e a opressão',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Lima_Barreto_em_foto_de_1920.jpg/240px-Lima_Barreto_em_foto_de_1920.jpg',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Lima_Barreto_em_foto_de_1920.jpg/480px-Lima_Barreto_em_foto_de_1920.jpg',
    bio: 'Cronista das dores do subúrbio e crítico impiedoso da burocracia militarista da República Velha. Escreveu com clareza límpida e ternura pelos marginalizados.',
    quote: 'O Brasil não tem povo, tem apenas público.',
    archiveCode: 'DOSSIÊ CANÔNICO N° 1911-LBA',
    folderColor: '#766244',
    tabLabel: 'Lima',
  },
];

export const BOOKS_DATABASE: BookItem[] = [
  {
    id: 'memorias-postumas',
    title: 'Memórias Póstumas de Brás Cubas',
    author: 'Machado de Assis',
    authorId: 'machado-de-assis',
    year: 1881,
    century: 'XIX',
    category: 'Romance Psicológico',
    rating: 4.9,
    reviewsCount: '48k',
    tagline: '“O delírio & o emplasto”',
    bgStyle: 'bg-[#FAF6ED]',
    coverBg: '#FAF6ED',
    coverBorder: '#D8CEB7',
    coverAccent: '#8C2D19',
    editionLabel: 'Typographia Nacional 1881',
    description: 'As memórias de um defunto autor que narra sua vida com ironia e pessimismo de além-túmulo, inaugurando o Realismo brasileiro.',
    pagesCount: 224,
    chapters: [
      {
        id: 'mp-dedicatoria',
        number: 'Dedicatória',
        title: 'À posteridade dos vermes',
        content: [
          'Ao verme que primeiro roeu as frias carnes do meu cadáver dedico como saudosa lembrança estas memórias póstumas.',
        ],
      },
      {
        id: 'mp-cap1',
        number: 'Capítulo I',
        title: 'Do Óbito',
        content: [
          'Algum tempo hesitei se devia abrir estas memórias pelo princípio ou pelo fim, isto é, se poria em primeiro lugar o meu nascimento ou a minha morte. Suposto o uso vulgar seja começar pelo nascimento, duas considerações me levaram a adotar diferente método: a primeira é que eu não sou propriamente um autor defunto, mas um defunto autor, para quem a campa foi outro berço; a segunda é que o escrito ficaria assim mais galante e mais novo.',
          'Moisés, que também contou a sua morte, não a pôs no introito, mas no cabo: diferença radical entre este livro e o Pentateuco.',
          'Dito isto, expirei às duas horas da tarde de uma sexta-feira do mês de agosto de 1869, na minha bela chácara de Catumbi. Tinha uns sessenta e quatro anos, rijos e prósperos, era solteiro, possuía cerca de trezentos contos e fui acompanhado ao cemitério por onze amigos.',
          'Onze amigos! Verdade é que não houve cartas nem anúncios. Acresce que chovia — peneirava uma chuvinha miúda, triste e constante, tão constante e tão triste, que levou um daqueles fiéis da última hora a intercalar esta engenhosa ideia no discurso que proferiu à beira da minha cova: "Vós, que o conhecestes, meus senhores, vós podeis dizer comigo que a natureza parece estar chorando a perda de um dos seus mais belos ornamentos..."',
        ],
      },
      {
        id: 'mp-cap2',
        number: 'Capítulo II',
        title: 'O Emplasto',
        content: [
          'Com efeito, a ideia de inventar um medicamento sublime, um emplasto anti-hipocondríaco, destinado a aliviar a nossa melancólica humanidade, essa ideia foi a que me acompanhou até os últimos dias da vida.',
          'Não era o lucro pecuniário que me seduzia; era a glória. Ver o meu nome estampado nas folhas públicas, nos prospectos, nas farmácias do orbe: "Emplasto Brás Cubas!". Essa modesta ambição deu-me a febre que me conduziu à sepultura.',
        ],
      },
      {
        id: 'mp-cap3',
        number: 'Capítulo III',
        title: 'A Flor da Moita',
        content: [
          'Marcela amou-me durante quinze meses e onze contos de réis; nada menos. Meu pai, logo que descobriu o rombo, ralhou seriamente, e eu, envergonhado e contrito, prometi endireitar os passos, mas o coração tinha razões que a bolsa ignorava...',
        ],
      },
    ],
  },
  {
    id: 'quincas-borba',
    title: 'Quincas Borba',
    author: 'Machado de Assis',
    authorId: 'machado-de-assis',
    year: 1891,
    century: 'XIX',
    category: 'Romance Psicológico',
    rating: 4.8,
    reviewsCount: '39k',
    tagline: '“Ao vencedor, as batatas!”',
    bgStyle: 'bg-[#5A2E22]',
    coverBg: '#5A2E22',
    coverBorder: '#844230',
    coverAccent: '#F3D27E',
    editionLabel: 'Livraria Garnier 1891',
    description: 'A derrocada de Rubião, que herda a fortuna e o cão do filósofo Quincas Borba, caindo nas ciladas da corte imperial até a loucura.',
    pagesCount: 288,
    chapters: [
      {
        id: 'qb-cap1',
        number: 'Capítulo I',
        title: 'Rubião e a Enseada',
        content: [
          'Rubião fitava a enseada, — eram oito horas da manhã. Quem o visse, com os polegares metidos no cordão do chambre, à janela de uma grande casa de Botafogo, cuidaria que ele admirava aquele pedaço de água quieta; mas, em verdade, vos digo que pensava em outra coisa.',
          'Cotejava o passado com o presente. Que era, há um ano? Professor. Que é agora? Capitalista. Olha para si, para as chinelas de damasco com debruns de ouro, para o espelho veneziano que lhe reflete a barba bem cuidada.',
          'De quando em quando, murmura entre dentes a sentença que Quincas Borba lhe legara antes de morrer: "Ao vencedor, as batatas!"',
        ],
      },
      {
        id: 'qb-cap2',
        number: 'Capítulo II',
        title: 'O Legado e o Cão',
        content: [
          'O cão Quincas Borba gania aos pés do novo amo. Herdara com ele a obrigação sagrada de alimentá-lo e tratá-lo como gente. Mas o Rio de Janeiro brilhava nas manhãs de sol, e os olhos de Sofia já prometiam o paraíso.',
        ],
      },
    ],
  },
  {
    id: 'dom-casmurro',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    authorId: 'machado-de-assis',
    year: 1899,
    century: 'XIX',
    category: 'Romance Psicológico',
    rating: 4.9,
    reviewsCount: '54k',
    tagline: '“Capitu & Olhos de Ressaca”',
    bgStyle: 'bg-[#18363F]',
    coverBg: '#18363F',
    coverBorder: '#294B56',
    coverAccent: '#D4AF37',
    editionLabel: 'Edição Garnier 1899',
    description: 'Bento Santiago relembra sua juventude e a dúvida cruel sobre a fidelidade de Capitu com seus olhos oblíquos e dissimulados.',
    pagesCount: 256,
    chapters: [
      {
        id: 'dc-cap1',
        number: 'Capítulo I',
        title: 'Do Título',
        content: [
          'Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu. Cumprimentou-me, sentou-se ao pé de mim, falou da lua e dos ministros, e acabou recitando-me versos. A viagem era curta, e os versos pode ser que não fossem inteiramente maus, porém o homem recitou-os com tanto fervor que eu cerrei os olhos e cochilei.',
          'Quando acordei, o rapaz tinha descido na estação anterior e apelidou-me de "Dom Casmurro". O título pegou.',
          'Não consultes dicionários. Casmurro não está aqui no sentido que eles lhe dão, mas no que lhe pôs o povo de homem calado e metido consigo. Dom veio por ironia, para atribuir-me fumos de fidalgo.',
        ],
      },
      {
        id: 'dc-cap2',
        number: 'Capítulo II',
        title: 'Olhos de Ressaca',
        content: [
          'Capitu era Capitu, isto é, uma criatura mui particular, mais mulher do que eu era homem. Trazia os olhos de ressaca, oblíquos e dissimulados, como uma onda que avança mansa na praia e arrasta para dentro do abismo quem nela se fia.',
        ],
      },
    ],
  },
  {
    id: 'o-cortico',
    title: 'O Cortiço',
    author: 'Aluísio Azevedo',
    authorId: 'aluisio-azevedo',
    year: 1890,
    century: 'XIX',
    category: 'Romance Naturalista',
    rating: 4.8,
    reviewsCount: '36k',
    tagline: '“A colmeia viva de São Diogo”',
    bgStyle: 'bg-[#443628]',
    coverBg: '#443628',
    coverBorder: '#6B543D',
    coverAccent: '#E0A96D',
    editionLabel: 'B. L. Garnier 1890',
    description: 'O grande painel coletivo do Naturalismo onde a estalagem de João Romão se ergue como um organismo pulsante e degradante.',
    pagesCount: 312,
    chapters: [
      {
        id: 'oc-cap1',
        number: 'Capítulo I',
        title: 'A Avareza de João Romão',
        content: [
          'João Romão foi, dos treze aos vinte e cinco anos, empregado de um taverneiro português da Praia de Botafogo. Não gastava um tostão: comia do que sobrava, dormia no chão da venda e juntava cada vintém com a cupidez de quem respira moedas.',
          'A vizinha Bertoleza, crioula forra mas sem carta provada, veio a ser o seu braço direito e a sua mula de carga. Trabalhavam de sol a sol, amontoando pedras e tábuas para o grande plano.',
        ],
      },
      {
        id: 'oc-cap2',
        number: 'Capítulo II',
        title: 'O Despertar da Colmeia',
        content: [
          'Eram cinco horas da manhã e o cortiço acordava, abrindo, não os olhos, mas a sua infinidade de portas e janelas alinhadas. Um cheiro quente de café misturava-se ao vapor acre da água de sabão das lavadeiras batendo roupa na pedra.',
        ],
      },
    ],
  },
  {
    id: 'iracema',
    title: 'Iracema',
    author: 'José de Alencar',
    authorId: 'jose-de-alencar',
    year: 1865,
    century: 'XIX',
    category: 'Romance Indianista',
    rating: 4.7,
    reviewsCount: '31k',
    tagline: '“A virgem dos lábios de mel”',
    bgStyle: 'bg-[#2D3F33]',
    coverBg: '#2D3F33',
    coverBorder: '#455E4E',
    coverAccent: '#D2B48C',
    editionLabel: 'Typographia Universal 1865',
    description: 'A lenda poética do amor trágico entre a sacerdotisa tabajara Iracema e o guerreiro Martim, metáfora lírica da formação do Ceará.',
    pagesCount: 160,
    chapters: [
      {
        id: 'ir-cap1',
        number: 'Capítulo I',
        title: 'Verdes Mares Bravios',
        content: [
          'Verdes mares bravios de minha terra natal, onde canta a jandaia nas frondes da carnaúba; verdes mares, que brilhais como líquida esmeralda aos raios do sol nascente, perlongando as alvas praias ensombradas de coqueiros.',
          'Além, muito além daquela serra, que ainda azula no horizonte, nasceu Iracema.',
          'Iracema, a virgem dos lábios de mel, que tinha os cabelos mais negros que a asa da graúna, e mais longos que seu talhe de palmeira. O favo da jati não era doce como seu sorriso; nem a baunilha recendia no bosque como seu hálito perfumado.',
        ],
      },
    ],
  },
  {
    id: 'o-ateneu',
    title: 'O Ateneu',
    author: 'Raul Pompéia',
    authorId: 'raul-pompeia',
    year: 1888,
    century: 'XIX',
    category: 'Romance de Formação',
    rating: 4.8,
    reviewsCount: '27k',
    tagline: '“Vais encontrar o mundo: coragem para a luta”',
    bgStyle: 'bg-[#282C34]',
    coverBg: '#282C34',
    coverBorder: '#434A56',
    coverAccent: '#C9A86A',
    editionLabel: 'Typographia Gazeta de Notícias 1888',
    description: 'A crônica de formação do jovem Sérgio sob o domínio severo do diretor Aristarco, retratando a perda das ilusões e a crueldade institucional.',
    pagesCount: 220,
    chapters: [
      {
        id: 'at-cap1',
        number: 'Capítulo I',
        title: 'As Portas do Mundo',
        content: [
          '"Vais encontrar o mundo, disse-me meu pai, à porta do Ateneu: coragem para a luta."',
          'Bastante experimentei depois a verdade deste aviso, que me despia, num gesto, das ilusões infantis. O Ateneu era o grande colégio da época, com a sua reputação de aristocrático rigor administrado pelo pomposo diretor Aristarco Argolo de Ramos.',
        ],
      },
    ],
  },
  {
    id: 'navio-negreiro',
    title: 'O Navio Negreiro & Espumas Flutuantes',
    author: 'Castro Alves',
    authorId: 'castro-alves',
    year: 1870,
    century: 'XIX',
    category: 'Poesia Condoreira',
    rating: 4.9,
    reviewsCount: '35k',
    tagline: '“A conclamação lírica contra as correntes”',
    bgStyle: 'bg-[#1C2331]',
    coverBg: '#1C2331',
    coverBorder: '#36435C',
    coverAccent: '#E0B253',
    editionLabel: 'Livraria Garnier 1870',
    description: 'A obra máxima da poesia abolicionista latino-americana, denunciando com força titânica a tragédia da travessia escravagista.',
    pagesCount: 180,
    chapters: [
      {
        id: 'nn-canto1',
        number: 'Canto IV',
        title: 'A Dança Sobre o Abismo',
        content: [
          'Era um sonho dantesco... o tombadilho que das luzernas avermelha o brilho, em sangue a se banhar.',
          'Tinir de ferros... estalar de açoite... Legiões de homens negros como a noite, horrendos a dançar...',
          'Negras mulheres, suspendendo às tetas magras crianças, cujas bocas pretas rega o sangue das mães: outras, moças, mas nuas e espantadas, no turbilhão de espectros arrastadas, em ânsia e mágoa vãs!',
        ],
      },
    ],
  },
  {
    id: 'policarpo-quaresma',
    title: 'Triste Fim de Policarpo Quaresma',
    author: 'Lima Barreto',
    authorId: 'lima-barreto',
    year: 1911,
    century: 'XX',
    category: 'Sátira Política / Pré-Modernismo',
    rating: 4.8,
    reviewsCount: '42k',
    tagline: '“O idealismo cívico e a desilusão republicana”',
    bgStyle: 'bg-[#ECE3D0]',
    coverBg: '#ECE3D0',
    coverBorder: '#BEB195',
    coverAccent: '#1F4E38',
    editionLabel: 'Edição Jornal do Commercio 1911',
    description: 'A comovente trajetória do Major Quaresma, patriota incorruptível que propõe o tupi como língua oficial e enfrenta o autoritarismo militar.',
    pagesCount: 270,
    chapters: [
      {
        id: 'pq-cap1',
        number: 'Capítulo I',
        title: 'A Lição de Violão',
        content: [
          'Como de hábito, Policarpo Quaresma, mais conhecido por Major Quaresma, bateu em retirada às quatro e meia da tarde da repartição do Ministério da Guerra, onde servia como subsecretário.',
          'Era homem de estatura regular, magro, de cavanhaque e óculos de tartaruga. Lia tudo o que versasse sobre o Brasil: mineralogia, botânica, história, folclore. Amava a pátria até à loucura e decidira agora aprender violão com o mestre Ricardo Coração dos Outros para resgatar a modinha genuína do povo.',
        ],
      },
    ],
  },
];

export const DEFAULT_USER_LOG = {
  activeMarathon: {
    title: 'Trilogia Realista de Machado de Assis',
    progress: 78,
    totalBooks: 3,
    completedBooks: 2,
    currentBook: 'Quincas Borba',
  },
  stats: {
    consecutiveDays: 14,
    deepHours: 42,
    pagesRead: 1280,
    chaptersCompleted: 38,
  },
  activeReadings: [
    {
      bookId: 'quincas-borba',
      title: 'Quincas Borba',
      author: 'Machado de Assis',
      year: 1891,
      lastLocation: 'Cap. LXIV - pág. 142',
      progressPercent: 97,
      annotationsCount: 18,
      lastReadDate: 'Hoje, 14:15',
    },
    {
      bookId: 'memorias-postumas',
      title: 'Memórias Póstumas de Brás Cubas',
      author: 'Machado de Assis',
      year: 1881,
      lastLocation: 'Cap. II: O Emplasto - pág. 44',
      progressPercent: 38,
      annotationsCount: 12,
      lastReadDate: 'Ontem',
    },
  ],
};
