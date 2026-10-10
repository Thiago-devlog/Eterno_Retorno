import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          epubjs: ['epubjs'],
          vendor: ['react', 'react-dom', 'framer-motion', 'lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
