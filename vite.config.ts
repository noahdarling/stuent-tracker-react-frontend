import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@config': '/src/config',
      '@components': '/src/components',
      '@containers': '/src/container',
      '@interfaces': '/src/interfaces',
      '@redux': '/src/redux',
      '@utils': '/src/utils',
      '@api': '/src/api',
    },
  },
});
