import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "./public",
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: "build",
  },
});
