import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base relativa para que el sitio funcione en Netlify y en subcarpetas.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
