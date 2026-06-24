import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://geel.itheima.net/v1_0/channels', // 你的后端地址
        changeOrigin: true,
      },
    },
  },
})
