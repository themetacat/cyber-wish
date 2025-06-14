import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mud } from "vite-plugin-mud";

export default defineConfig({
  plugins: [react(), mud({ worldsFile: "../contracts/worlds.json" })],
  build: {
    target: "es2022",
    minify: true,
    sourcemap: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.metacat.world',
        changeOrigin: true,
      },
      '/apiLocal': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
});
