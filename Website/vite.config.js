import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/files': {
        target: 'https://databucket.loca.lt',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/files/, ''),
      },
    },
  },
  plugins: [react()],
})
