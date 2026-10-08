import { useState } from 'react';

export function useReader() {
  const [currentCfi, setCurrentCfi] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fontSize, setFontSize] = useState(100); // 100%
  const [readerTheme, setReaderTheme] = useState('parchment'); // 'parchment' | 'light' | 'dark'

  return {
    currentCfi,
    setCurrentCfi,
    progress,
    setProgress,
    fontSize,
    setFontSize,
    readerTheme,
    setReaderTheme,
  };
}

