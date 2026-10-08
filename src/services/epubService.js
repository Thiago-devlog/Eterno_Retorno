import ePub from 'epubjs';

/**
 * Temas tipográficos editoriais do Eterno Retorno para injeção no iframe do EPUB
 */
export const READER_THEMES = {
  parchment: {
    body: {
      'background-color': '#FDFBF7 !important',
      'color': '#0F172A !important',
      'font-family': '"Merriweather", Georgia, serif !important',
      'line-height': '1.85 !important',
      'padding': '0 2rem !important',
      'letter-spacing': '0.01em !important'
    },
    'p, div, span': {
      'font-family': '"Merriweather", Georgia, serif !important',
      'color': '#0F172A !important',
      'line-height': '1.85 !important'
    },
    'h1, h2, h3, h4, h5': {
      'font-family': '"Playfair Display", Georgia, serif !important',
      'color': '#0F172A !important',
      'font-weight': '600 !important'
    },
    a: {
      'color': '#C28251 !important',
      'text-decoration': 'none !important'
    }
  },
  night: {
    body: {
      'background-color': '#16181D !important',
      'color': '#E2DFD8 !important',
      'font-family': '"Merriweather", Georgia, serif !important',
      'line-height': '1.85 !important',
      'padding': '0 2rem !important'
    },
    'p, div, span': {
      'font-family': '"Merriweather", Georgia, serif !important',
      'color': '#E2DFD8 !important',
      'line-height': '1.85 !important'
    },
    'h1, h2, h3, h4, h5': {
      'font-family': '"Playfair Display", Georgia, serif !important',
      'color': '#F5F2EB !important'
    },
    a: {
      'color': '#DFBD69 !important'
    }
  },
  clear: {
    body: {
      'background-color': '#FFFFFF !important',
      'color': '#1E293B !important',
      'font-family': '"Merriweather", Georgia, serif !important',
      'line-height': '1.85 !important',
      'padding': '0 2rem !important'
    },
    'p, div, span': {
      'font-family': '"Merriweather", Georgia, serif !important',
      'color': '#1E293B !important',
      'line-height': '1.85 !important'
    },
    'h1, h2, h3, h4, h5': {
      'font-family': '"Playfair Display", Georgia, serif !important',
      'color': '#0F172A !important'
    },
    a: {
      'color': '#9A5B32 !important'
    }
  }
};

/**
 * Inicializa a instância do livro e o rendimento (rendition) no container
 */
export function createEpubRendition(bookUrl, containerElement, options = {}) {
  const book = ePub(bookUrl);

  const rendition = book.renderTo(containerElement, {
    width: '100%',
    height: '100%',
    flow: 'paginated',
    spread: 'none',
    allowScriptedContent: false,
    ...options
  });

  // Registra temas editoriais
  Object.entries(READER_THEMES).forEach(([themeKey, rules]) => {
    rendition.themes.register(themeKey, rules);
  });

  return { book, rendition };
}
