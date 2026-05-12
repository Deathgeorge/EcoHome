import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // allowedHosts: ['a073-181-55-23-82.ngrok-free.app'],
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/v1/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('❌ Error del proxy:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log(`➡️ Enviando petición: ${req.method} ${req.url} -> http://localhost:8080${proxyReq.path}`);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(`✅ Respuesta recibida: ${proxyRes.statusCode} para ${req.url}`);
          });
        },
      }
    }
  }
})
