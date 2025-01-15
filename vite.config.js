import { defineConfig } from 'vite'
import { config } from 'dotenv';
import react from '@vitejs/plugin-react'

config();

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['swiper/react']
  },
  server: {
    proxy: {
      '/Assets': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});

