import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import css from "./config/unocss";
import dts from "vite-plugin-dts";

const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    assetFileNames: `assets/[name].css`,
    globals: {
      vue: "Vue",
    },
  },
};

export default defineConfig({
  plugins: [vue(), jsx(), css(), dts()],
  build: {
    rollupOptions,
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: "./src/entry.ts",
      name: "ViteUI",
      fileName: "vite-ui",
      formats: ["es", "umd", "iife"],
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
});
