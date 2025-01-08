import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT,
    proxy: {
      '/api': 'http://localhost:8000', // Proxy requests starting with /api to the backend
    },
  },
})