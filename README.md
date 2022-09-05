## 介绍
基于 Vite 的组件库开发实践，包含项目启动，组件文档，代码规范，单元测试和自动部署等内容。

## 技术栈
- Vite
- Typescript
- Vue

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
