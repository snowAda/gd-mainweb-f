import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const apiProxy = {
  '/api': {
    target: 'http://localhost:8002',
    changeOrigin: true,
    secure: false
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: apiProxy
  },
  // npm run preview 时同样转发 /api，否则会拿到空响应或非 JSON
  preview: {
    proxy: apiProxy
  }
})
