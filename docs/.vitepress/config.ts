import { defineConfig } from "vitepress";
import demoBlock from "vitepress-theme-demoblock";

const config = defineConfig({
  title: "BookerUI组件文档",
  lang: "zh-cn",
  themeConfig: {
    logo: "/booker.png",
    socialLinks: [{ icon: "github", link: "https://github.com/juetan" }],
    nav: [
      { text: "首页", link: "/" },
      { text: "快速开始", link: "/quick-start" },
      { text: "Github", link: "https://github.com/juetan/booker-ui" },
    ],
    sidebar: [
      {
        text: "组件",
        items: [
          { text: "⚡ 快速开始", link: "/quick-start" },
          {
            text: "📦 通用组件",
            items: [{ text: "Button 按钮", link: "/components/" }],
          },
          {
            text: "📃 实践过程",
            items: [
              { text: "01 组件环境", link: "/steps/01-env" },
              { text: "02 组件开发", link: "/steps/02-dev" },
              { text: "03 组件构建", link: "/steps/03-pkg" },
              { text: "04 组件样式", link: "/steps/04-css" },
              { text: "05 组件文档", link: "/steps/05-doc" },
              { text: "06 组件测试", link: "/steps/06-tst" },
              { text: "07 组件规范", link: "/steps/07-spe" },
              { text: "08 组件发布", link: "/steps/08-dep" },
            ],
          },
          { text: "🎲 导航", link: "/nav" },
          { text: "📋 反馈", link: "/feedback" },
          { text: "💎 关于", link: "/about" },
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
