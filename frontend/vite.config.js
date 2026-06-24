import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/bfhl": {
        target: process.env.VITE_API_URL || "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
