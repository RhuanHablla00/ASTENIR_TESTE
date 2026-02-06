import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
    outDir: 'C:/Users/rhuan/Documents/Projetos/astenir-panel-build',
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  plugins: [
    react(),
    process.env.ANALYZE === 'analyze' &&
    visualizer({
      filename: 'dist/bundle-report.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      '@/': path.resolve(__dirname, './src/'),
      "tailwind-config": fileURLToPath(
        new URL("./tailwind.config.js", import.meta.url)
      ),
    },
  },

});
