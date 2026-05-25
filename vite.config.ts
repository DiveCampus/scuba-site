import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    define: {
      'import.meta.env.STRIPE_PUBLISHABLE_KEY': JSON.stringify(
        env.STRIPE_PUBLISHABLE_KEY || env.VITE_STRIPE_PUBLISHABLE_KEY || ''
      ),
    },
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],

    // Strip console.* and debugger in production only (dev keeps them).
    esbuild: isProd ? { drop: ['console', 'debugger'] } : {},

    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;

            if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) return 'router';
            if (id.includes('framer-motion')) return 'framer';
            if (id.includes('@radix-ui')) return 'radix';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'icons';
            if (id.includes('recharts')) return 'recharts';
            if (id.includes('gsap')) return 'gsap';

            return 'vendor';
          },
        },
      },
    },
  };
})
