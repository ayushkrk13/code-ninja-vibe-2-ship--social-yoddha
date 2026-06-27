import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/code-ninja-vibe-2-ship--social-yoddha/',
  plugins: [react(), tailwindcss()],
})
