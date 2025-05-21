import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
        '/api': { // Allows CORS during development
            target: 'http://localhost:5000',
            changeOrigin: true,
        },
    },
  },
})
