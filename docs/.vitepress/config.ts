import { defineConfig } from "vitepress";
import demoBlock from 'vitepress-theme-demoblock'

const config = defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: "组件",
        items: [
          { text: "快速开始", link: "/" },
          {
            text: "通用",
            items: [{ text: "Button 按钮", link: "/components/" }],
          },
          { text: "导航", link: "/nav" },
          { text: "反馈", link: "/feedback" },
          { text: "数据录入", link: "/input" },
          { text: "数据展示", link: "/output" },
          { text: "布局", link: "/layout" },
        ],
      },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(demoBlock.demoBlockPlugin);
    },
  },
});

export default config;
