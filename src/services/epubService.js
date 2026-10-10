import ePub from 'epubjs';

/**
 * Regras tipográficas injetadas diretamente no iframe do EPUB
 */
export const getReaderThemeStyles = (fontFamily = 'Merriweather') => {
  const fontRule = fontFamily === 'Plus Jakarta Sans'
    ? '"Plus Jakarta Sans", system-ui, sans-serif !important'
    : fontFamily === 'Lora'
      ? '"Lora", Georgia, serif !important'
      : '"Merriweather", Georgia, serif !important';

  return {
    parchment: {
      body: {
        'background-color': '#F7F4EE !important',
        'color': '#1B1C1A !important',
        'font-family': fontRule,
        'line-height': '1.85 !important',
        'padding': '0 2rem !important',
        'letter-spacing': '0.01em !important',
        'text-align': 'justify !important'
      },
      'p, div, span, blockquote': {
        'font-family': fontRule,
        'color': '#1B1C1A !important',
        'line-height': '1.85 !important'
      },
      'h1, h2, h3, h4, h5': {
        'font-family': '"Playfair Display", Georgia, serif !important',
        'color': '#1B1C1A !important',
        'font-weight': '600 !important',
        'text-align': 'center !important',
        'margin-top': '2rem !important',
        'margin-bottom': '1.5rem !important'
      },
      a: {
        'color': '#8C6D46 !important',
        'text-decoration': 'none !important'
      },
      '::selection': {
        'background': 'rgba(140, 109, 70, 0.28) !important'
      }
    },
    night: {
      body: {
        'background-color': '#2A2724 !important',
        'color': '#E8E0D2 !important',
        'font-family': fontRule,
        'line-height': '1.85 !important',
        'padding': '0 2rem !important',
        'text-align': 'justify !important'
      },
      'p, div, span, blockquote': {
        'font-family': fontRule,
        'color': '#E8E0D2 !important',
        'line-height': '1.85 !important'
      },
      'h1, h2, h3, h4, h5': {
        'font-family': '"Playfair Display", Georgia, serif !important',
        'color': '#F7F4EE !important',
        'text-align': 'center !important',
        'margin-top': '2rem !important',
        'margin-bottom': '1.5rem !important'
      },
      a: {
        'color': '#DFBD69 !important'
      },
      '::selection': {
        'background': 'rgba(223, 189, 105, 0.35) !important'
      }
    },
    clear: {
      body: {
        'background-color': '#FFFFFF !important',
        'color': '#1E293B !important',
        'font-family': fontRule,
        'line-height': '1.85 !important',
        'padding': '0 2rem !important',
        'text-align': 'justify !important'
      },
      'p, div, span, blockquote': {
        'font-family': fontRule,
        'color': '#1E293B !important',
        'line-height': '1.85 !important'
      },
      'h1, h2, h3, h4, h5': {
        'font-family': '"Playfair Display", Georgia, serif !important',
        'color': '#0F172A !important',
        'text-align': 'center !important',
        'margin-top': '2rem !important',
        'margin-bottom': '1.5rem !important'
      },
      a: {
        'color': '#9A5B32 !important'
      },
      '::selection': {
        'background': 'rgba(154, 91, 50, 0.22) !important'
      }
    }
  };
};

/**
 * Inicializa a instância do livro e o rendimento (rendition) no container
 */
export function createEpubRendition(bookUrl, containerElement, options = {}, fontPreference = 'Merriweather') {
  const book = ePub(bookUrl);

  const rendition = book.renderTo(containerElement, {
    width: '100%',
    height: '100%',
    flow: 'paginated',
    spread: 'none',
    allowScriptedContent: false,
    ...options
  });

  // Registra temas editoriais dinâmicos
  applyReaderThemes(rendition, fontPreference);

  return { book, rendition };
}

export function applyReaderThemes(rendition, fontPreference = 'Merriweather') {
  if (!rendition) return;
  const styles = getReaderThemeStyles(fontPreference);
  Object.entries(styles).forEach(([themeKey, rules]) => {
    rendition.themes.register(themeKey, rules);
  });
}
