import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/military-pay-comparison-calculator/',
  plugins: [react(), tailwindcss()],
})
