import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // URL ของ backend server
        changeOrigin: true,
        secure: false, // หากใช้ HTTPS และเป็น localhost
      },
    },
  },
});
