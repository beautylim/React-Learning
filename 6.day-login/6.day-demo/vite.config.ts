import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

import path from 'path'

export default defineConfig({
  plugins: [react(), visualizer({
    open: true, // 打包完成后自动打开浏览器
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 如果需要更多别名：
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  }
})