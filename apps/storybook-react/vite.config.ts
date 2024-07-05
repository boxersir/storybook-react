/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-07-03 18:37:12
 * @LastEditors: caixin
 * @LastEditTime: 2024-07-03 19:09:53
 * @Description: file content
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
        environment: 'jsdom', //happy-dom
        includeSource: ['src/*.{js,ts,tsx}']
    }
})
