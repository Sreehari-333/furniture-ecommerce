import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',  // ✅ Must be set like this for relative paths
  plugins: [react()],
})
