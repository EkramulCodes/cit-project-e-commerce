import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    // Allows hosting on both GitHub Pages (subpath) and Vercel (root)
    base: './',
    
    plugins: [react(), tailwindcss()],
    
    resolve: {
      alias: {
        // Keeps your project consistency with the root directory alias
        '@': path.resolve(__dirname, '.'),
      },
    },
    
    esbuild: {
      sourcemap: 'inline'
    },
    
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 1600
    },
    
    server: {
      // Maintains previous feature of disabling HMR via environment variables
      hmr: process.env.DISABLE_HMR !== 'true',
      
      proxy: {
        // For local development access to DummyJSON as seen in image_955a36.jpg
        '/api': {
          target: 'https://dummyjson.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
  };
});

