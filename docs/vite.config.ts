import { defineConfig } from "vite";
import jsx from "@vitejs/plugin-vue-jsx";
import css from "../config/unocss";

export default defineConfig({
  plugins: [jsx(), css()],
  server: {
    port: 5000,
  },
});
