import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./apps/src', import.meta.url)),
    },
  },
  server: {
    allowedHosts: [
      '.pinggy-free.link', 
      '.a.pinggy.io'
    ],
  }
})