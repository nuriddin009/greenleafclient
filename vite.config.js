import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     'react-quill': 'react-quill/dist/react-quill.esm.js',
  //   },
  // },
  define: {
    global: 'window'
  }
})
