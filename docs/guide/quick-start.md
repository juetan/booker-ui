---
title: 快速开始
---
## 快速上手
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