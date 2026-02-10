import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig(({ mode }) => {
  // Load env vars from .env files AND Docker/CI environment
  const env = loadEnv(mode, process.cwd(), '')

  // Read allowed hosts from env (comma-separated)
  const allowedHosts = env.VITE_ALLOWED_HOSTS
    ? env.VITE_ALLOWED_HOSTS
        .split(',')
        .map(h => h.trim())
        .filter(Boolean)
    : []

  return {
    plugins: [svelte()],
    server: {
      allowedHosts,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true
        },
        '/setup': {
          target: 'http://localhost:3001',
          changeOrigin: true
        }
      }
    }
  }
})