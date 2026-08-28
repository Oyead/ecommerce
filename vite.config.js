import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      // Forward our persistent NeonDB backend endpoints to the local API server.
      // External product/category/brand calls use absolute URLs and bypass this.
      '/api': {
        target: process.env.VITE_API_PROXY || 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
