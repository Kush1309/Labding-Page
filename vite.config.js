import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: ['es2020', 'safari14']
  },
  server: {
    port: 3000,
    open: true
  }
})
