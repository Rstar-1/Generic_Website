import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1000,
  },
  ssr: {
    resolve: {
      conditions: ['import', 'default'],
      externalConditions: ['import', 'default'],
    },
  },
})
