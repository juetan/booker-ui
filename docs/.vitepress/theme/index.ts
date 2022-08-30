import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import ViteUI from "../../../src/entry";
import "vitepress-theme-demoblock/theme/styles/index.css";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";

const themeConfig: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ViteUI);
    app.component('Demo', Demo);
    app.component('DemoBlock', DemoBlock);
  },
};

export default themeConfig;
