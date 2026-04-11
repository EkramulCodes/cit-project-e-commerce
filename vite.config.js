import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
<<<<<<< HEAD
    // Add the base path for GitHub Pages deployment
    base: '/cit-project-e-commerce/',
=======
>>>>>>> 62835f1 (Rearrange folder structure)
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
<<<<<<< HEAD
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
=======
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
>>>>>>> 62835f1 (Rearrange folder structure)
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
