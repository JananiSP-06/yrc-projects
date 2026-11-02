import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// During development the React app runs on :5173 and forwards /api calls to Spring Boot on :8080.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.js',
    globals: true,
  },
})
