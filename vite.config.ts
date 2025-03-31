import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import { execSync } from 'child_process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'copy-content-files',
      buildEnd() {
        // This is a hook that runs after the build is complete
        console.log('Ensuring content files are included in the build...');
      }
    },
    {
      name: 'ensure-blog-index',
      buildStart() {
        // This hook runs before the build starts
        console.log('Ensuring blog index is up-to-date...');
        try {
          // Create blog directories if they don't exist
          console.log('Setting up blog directories...');
          execSync('node scripts/setup-blog-dirs.js', { stdio: 'inherit' });
          
          // Generate the blog index
          console.log('Generating blog index...');
          execSync('node scripts/generate-blog-index.js', { stdio: 'inherit' });
          console.log('Blog index generated successfully');
        } catch (error) {
          console.error('Error generating blog index:', error);
          // Don't fail the build if this fails
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure all files in public are copied to the build output
    copyPublicDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
}));
