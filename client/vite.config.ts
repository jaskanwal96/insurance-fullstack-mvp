import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Maps @ to the src folder
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/auth/login': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/customer': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/getPolicies': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/policyDetails': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
