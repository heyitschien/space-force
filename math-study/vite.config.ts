import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Run `npx vercel dev` (default :3000) alongside Vite; set VITE_TEST_HISTORY_API_URL=http://localhost:5173/api
      '/api': { target: 'http://127.0.0.1:3000', changeOrigin: true },
    },
  },
})
