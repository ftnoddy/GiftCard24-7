import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

server: {
  host: true
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
