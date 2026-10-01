import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      '/api': {
        target:"https://homelyhub-property-booking-platform.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})