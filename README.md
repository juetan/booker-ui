<br/>

<p align="center">
  <img src="https://user-images.githubusercontent.com/36595085/188433793-d42eaaca-2fef-4c80-bfce-36b5ecf58e90.png" alt="Slidev" height="200" width="200"/>
</p>

<p align="center">
基于 Vite 的组件库开发实践，包含项目启动，组件文档，代码规范，单元测试和自动部署等内容。
</p>

<p align="center">
  <img src="https://img.shields.io/npm/l/booker-ui" />
  <img src="https://img.shields.io/bundlephobia/min/booker-ui" />
  <img src="https://img.shields.io/github/workflow/status/juetan/vite-ui-practice/CI?label=test" />
  <img src="https://img.shields.io/github/workflow/status/juetan/vite-ui-practice/Publish%20Booker-UI%20To%20Npm" />
  <img src="https://img.shields.io/npm/v/booker-ui" />
</p>

## 技术栈
- ⚡ 基于Vite+Vue3，快速开发和构建强壮的应用
- 🎨 使用原子化CSS构建方案
- ✨ 使用Vitest作为测试框架，保障功能稳定性  
- 🔖 使用Typescript，提供静态类型检查和类型提示
- 💎 使用Github Action持续集成，自动部署和发布
- 🎲 使用Husky和Eslint检查代码规范，保障良好的代码样式

## 快速开始
1. 安装依赖
```
pnpm install booker-ui -D
```
2. 引入依赖
```ts
import BookerUI from 'booker-ui';
import 'booker-ui/dist/assets/entry.css'

createApp(App).use(BookerUI).mount('#app');
```
3. 在组件中使用
```vue
<template>
  <div>
    <JSXButton color="red">测试按钮</JSXButton>
  </div>
</template>
```

## 参考链接
- [基于 Vite 的组件库工程化实战 - 掘金小册](https://juejin.cn/book/7117582869358182403)
- [Vite官网](https://vitejs.dev/)
- [Vitepress官网](https://vitepress.vuejs.org)
- [Vue官网](https://vuejs.org/)
