## 介绍

基于 Vite 的组件库开发实践，包含项目启动，组件文档，代码规范，单元测试和自动部署等内容。

## 实践过程

### 组件环境

1. 新建文件夹

```s
mkdir vite-ui && cd vite-ui
```

2. 初始化项目

```s
pnpm init -y(optional)
```

3. 安装 Vite

```s
pnpm i vite@latest -D
```

4. 新建`/index.html`文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <div id="app">Hello world</div>
  </body>
</html>
```

5. 启动 Vite，访问`localhost:5173`测试是否访问正常

```s
npx vite
```

6. 新建`/src/index.ts`文件

```ts
const content: string = "Hello world from index.ts";
console.log(content);
```

7. 修改`/index.html`文件，访问浏览器控制台测试是否输出日志

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <div id="app">Hello world</div>
    <script src="./src/index.ts" type="module"></script>
  </body>
</html>
```

8. 修改`/package.json`文件，添加启动脚本(后续可以通过`pnpm dev`使用)

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

### 组件开发

1. 安装 Vue，添加对 Vue 的支持

```s
pnpm i vue -D
```

2. 新建`/src/button/index.ts`，编写一个使用`render`的组件

```ts
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "VButton",
  render() {
    return h("button", null, "My Button");
  },
});
```

3. 修改`/src/index.ts`文件，创建 Vue 应用并引入组件，重启访问

```ts
import { createApp } from "vue";
import VButton from "./button/index";

createApp(VButton).mount("#app");
```

4. 安装`@vitejs/plugin-vue`，添加对`.vue`文件的支持

```
pnpm i @vitejs/plugin-vue -D
```

5. 新建`/vite.config.ts`文件，将其添加到 Vite 插件中

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

6. 新建`/src/SFCButton/index.vue`文件

```vue
<template>
  <button>SFC Button</button>
</template>
<script lang="ts">
export default {
  name: "SFCButton",
};
</script>
```

7. 修改`/src/index.ts`文件，引入创建的 SFC 组件

```ts
import { createApp } from "vue";
import SFCButton from "./SFCButton/index.vue";

createApp(SFCButton).mount("#app");
```

8. 此时有报错，新建`/src/shims-vue.d.ts`为`.vue`文件添加类型声明，重启访问

```ts
declare module ".vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<null, null, any>;
  export default component;
}
```

9. 安装`@vitejs/plugin-vue-jsx`，添加`.[t|j]sx`文件的支持

```s
pnpm i @vitejs/plugin-vue-jsx -D
```

10. 修改`/vite.config.ts`，将其添加到 Vite 插件中

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), jsx()],
});
```

11. 新建`/src/JSXButton/index.tsx`文件

```ts
import { defineComponent } from "vue";

export default defineComponent({
  name: "JSXButton",
  render() {
    return <button>JSX Button</button>;
  },
});
```

12. 此时有报错，新建`/tsconfig.ts`文件为`.tsx`文件提供类型声明

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist/types",
    "jsx": "preserve",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  },
  "include": ["./**/*.*", "./src/shims-vue.d.ts"],
  "exclude": ["node_modules"]
}
```

13. 修改`/src/index.ts`文件，引入 JSX 组件，重启访问

```ts
import { createApp } from "vue";
import JSXButton from "./JSXButton/index";

createApp(JSXButton).mount("#app");
```

### 组件打包

1. 新建`/src/entry.ts`文件

```ts
import Button from "./button/index";
import SFCButton from "./SFCButton/index.vue";
import JSXButton from "./JSXButton/index";
import { App } from "vue";

export { Button, SFCButton, JSXButton };

export default {
  install(app: App) {
    app.component(Button.name, Button);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
  },
};
```

2. 修改`/vite.config.ts`文件，添加打包配置

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

export default defineConfig({
  plugins: [vue(), jsx()],
  build: {
    rollupOptions,
    minify: false,
    lib: {
      entry: "./src/entry.ts",
      name: "ViteUI",
      fileName: "vite-ui",
      formats: ["es", "umd", "iife"],
    },
  },
});
```

3. 修改`/package.json`文件，添加打包脚本

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

4. 执行打包命令，会生成`/dist`文件夹

```s
pnpm build
```

5. 创建`/demo/esm/index.html`文件，重启访问`http://localhost:5173/demo/esm/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite UI Demo</title>
  </head>
  <body>
    <h1>Full Import</h1>
    <div id="app"></div>
    <script type="module">
      import { createApp } from "vue/dist/vue.esm-bundler.js";
      import ViteUI from "../../dist/vite-ui.mjs";

      const rootComponent = {
        template: `<VButton /> <SFCButton /> <JSXButton />`,
      };
      createApp(rootComponent).use(ViteUI).mount("#app");
    </script>
  </body>
</html>
```

6. 创建`/demo/esm/button.html`文件，重启访问`http://localhost:5173/demo/esm/button.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite UI Button Demo</title>
  </head>
  <body>
    <h1>Single Import</h1>
    <div id="app"></div>
    <script type="module">
      import { createApp } from "vue/dist/vue.esm-bundler.js";
      import { SFCButton, JSXButton, Button } from "../../dist/vite-ui.mjs";

      createApp({
        template: `<VButton/> <JSXButton/> <SFCButton/>`,
      })
        .component(SFCButton.name, SFCButton)
        .component(JSXButton.name, JSXButton)
        .component(Button.name, Button)
        .mount("#app");
    </script>
  </body>
</html>
```

### 组件样式

1. 安装`unocss`(样式库)和`@iconify-json/ic`(图标库)

```
pnpm i unocss @iconify-json/ic -D
```

2. 修改`/vite.config.ts`文件，添加到 Vite 插件中

```ts
import css from "unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";

export default defineConfig({
  plugins: [
    css({ presets: [presetUno(), presetAttributify(), presetIcons()] }),
  ],
});
```

3. 修改`/src/JSXButton/index.tsx`文件，添加样式类

```tsx
import { defineComponent } from "vue";
import "uno.css";

export default defineComponent({
  name: "JSXButton",
  setup(props, { slots }) {
    return () => (
      <button
        class={`
          py-2
          px-4
          font-semibold
          text-white
          bg-green-500
          hover:bg-green-700
          border-none
          rounded
          font-semibold
          cursor-pointer
        `}
      >
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});
```

4. 修改`/src/index.ts`文件，引入修改后的组件，重启访问

```ts
import { createApp } from "vue/dist/vue.esm-browser";
import ViteUI from "./entry";

createApp({ template: `<JSXButton>普通按钮</JSXButton>` })
  .use(ViteUI)
  .mount("#app");
```

5. 修改`/src/JSXButton/index.tsx`文件，添加组件颜色属性

```tsx
import { defineComponent, PropType } from "vue";
import "uno.css";

export type IColor =
  | "black"
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

export const JSXButtonProps = {
  color: {
    type: String as PropType<IColor>,
    default: "blue",
  },
};

export default defineComponent({
  name: "JSXButton",
  props: JSXButtonProps,
  setup(props, { slots }) {
    return () => (
      <button
        class={`
      py-2
      px-4
      font-semibold
      text-white
      bg-${props.color}-500
      hover:bg-${props.color}-700
      border-none
      rounded
      font-semibold
      cursor-pointer
    `}
      >
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});
```

6. 此时颜色不生效，新建`/config/unocss.ts`文件

```ts
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "unocss/vite";

const colors = [
  "white",
  "black",
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const safelist = [
  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `hover:bg-${v}-700`),
];

export default () => {
  return Unocss({
    safelist,
    presets: [presetUno(), presetAttributify(), presetIcons()],
  });
};
```

7. 修改`/vite.config.ts`文件，更新插件的引入方式，重启访问

```ts
import css from "./config/unocss";

export default defineConfig({
  plugins: [css()],
});
```

8. 修改`/config/unocss.ts`文件，添加安全的图标列表

```ts
const icones = [
  "search",
  "edit",
  "check",
  "message",
  "star-off",
  "delete",
  "add",
  "share",
];

const safelist = [
  // ...
  ...icones.map((v) => `i-ic-baseline-${v}`),
];
```

9. 修改`/src/JSXButton/index.tsx`文件，添加图标属性

```tsx
export type IIcon =
  | "search"
  | "edit"
  | "check"
  | "message"
  | "star-off"
  | "delete"
  | "add"
  | "share";

export const JSXButtonProps = {
  //...
  icon: {
    type: String as PropType<IIcon>,
  },
};

export default defineComponent({
  name: "JSXButton",
  props: JSXButtonProps,
  setup(props, { slots }) {
    return () => (
      <button class={/* .. */}>
        {props.icon && <i class={`i-ic-baseline-${props.icon} p-3`}></i>}
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});
```

10. 编辑`/src/index.ts`文件，导入修改后的组件

```ts
import { createApp } from "vue/dist/vue.esm-browser";
import ViteUI from "./entry";

createApp({
  template: `
    <div style="display: flex; gap: 16px; margin-top: 24px;">
      <JSXButton icon="search" >搜索图标</JSXButton>
      <JSXButton icon="edit" >编辑图标</JSXButton>
      <JSXButton icon="check" >检查图标</JSXButton>
      <JSXButton icon="message" >消息图标</JSXButton>
      <JSXButton icon="delete" >删除图标</JSXButton>
    </div>
  `,
})
  .use(ViteUI)
  .mount("#app");
```

11. 此时打包会出错，修改`/vite.config.ts`文件，单独导出 css

```ts
export default defineConfig({
  build: {
    // ...
    cssCodeSplit: true,
  },
});
```

12. 运行打包命令，`/dist`目录下会生成`assets/entry.xxx.css`

```s
pnpm build
```

13. 修改`/demo/esm/index.html`文件，导入样式和修改组件调用方式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite UI Demo</title>
    <link rel="stylesheet" href="../../dist/assets/entry.c7412cfc.css" />
  </head>
  <body>
    <h1>Full Import</h1>
    <div id="app"></div>
    <script type="module">
      import { createApp } from "vue/dist/vue.esm-bundler.js";
      import ViteUI from "../../dist/vite-ui.mjs";

      const rootComponent = {
        template: `<VButton /> <SFCButton /> <JSXButton type="red" icon="search">测试按钮</JSXButton>`,
      };
      createApp(rootComponent).use(ViteUI).mount("#app");
    </script>
  </body>
</html>
```

### 组件文档

1. 安装`Vitepress`

```
pnpm i vitepress -D
```

2. 新建`/docs/vite.config.ts`文件

```ts
import { defineConfig } from "vite";
import jsx from "@vitejs/plugin-vue-jsx";
import css from "../config/unocss";

export default defineConfig({
  plugins: [jsx(), css()],
  server: {
    port: 5000,
  },
});
```

3. 新建`/docs/index.md`文件

```md
# Vite UI
```

4. 修改`/package.json`文件，添加启动脚本

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```

5. 运行启动命令，访问`localhost:5000`

```s
pnpm docs:dev
```

6. 新建`/docs/.vitepress/config.ts`文件，添加配置，重启访问

```ts
import { defineConfig } from "vitepress";

const config = defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: "组件",
        items: [
          { text: "快速开始", link: "/" },
          {
            text: "通用",
            items: [{ text: "Button 按钮", link: "/components/button/" }],
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
});

export default config;
```

7. 新建`/docs/.vitepress/theme/index.ts`文件，添加组件

```ts
import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import ViteUI from "../../../src/entry";
import 'uno.css'

const themeConfig: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ViteUI);
  },
};

export default themeConfig;
```

8. 修改`/docs/index.md`文件，使用导入的组件，重启访问

```md
# Vite UI

<div style="margin-bottom:20px;">
  <JSXButton color="blue">主要按钮</JSXButton>
  <JSXButton color="green">绿色按钮</JSXButton>
  <JSXButton color="gray">灰色按钮</JSXButton>
  <JSXButton color="yellow">黄色按钮</JSXButton>
  <JSXButton color="red">红色按钮</JSXButton>
</div>
```
9. 安装`vitepress-theme-demoblock`，用于组件示例
```s
pnpm i vitepress-theme-demoblock@1.0.0-alpha.10 -D
```
10. 修改`/docs/.vitepress/config.ts`文件，使用该插件
```ts
import { defineConfig } from "vitepress";
import { demoBlockPlugin } from "vitepress-theme-demoblock";

const config = defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: "组件",
        items: [
          { text: "快速开始", link: "/" },
          {
            text: "通用",
            items: [{ text: "Button 按钮", link: "/components/button/" }],
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
      md.use(demoBlockPlugin);
    },
  },
});

export default config;
```
11. 修改`/docs/.vitepress/theme/index.ts`文件，注册组件
```ts
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
```
12. 修改`/docs/index.md`文件，添加组件示例，重启访问
```md
:::demo 使用`size`、`color`、`pain`、`round`属性来定义 Button 的样式。
#```vue
<template>
 <div style="display: flex; gap: 16px; margin-bottom:20px;">
  <JSXButton color="blue">主要按钮</JSXButton>
  <JSXButton color="green">绿色按钮</JSXButton>
  <JSXButton color="gray">灰色按钮</JSXButton>
  <JSXButton color="yellow">黄色按钮</JSXButton>
  <JSXButton color="red">红色按钮</JSXButton>
 </div>
#```
:::
```

### 组件测试
1. 安装以下3个依赖
```s
pnpm i vitest happy-dom @vue/test-utils -D
```
2. 修改`/vite.config.ts`文件，添加测试配置
```ts
/// <reference types="vitest" />

export default defineConfig({
  // ...
  test: {
    globals: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/.[tj]sx$/]
    }
  }
});
```
3. 新建`/src/JSXButton/__tests__/JSXButton.spec.ts`文件，添加测试用例
```ts
import { describe, expect, test } from "vitest";
import JSXButton from "..";
import { shallowMount } from '@vue/test-utils';

describe('Button', () => {
  test('mount @vue/test-utils', () => {
    const wrapper = shallowMount(JSXButton, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.text()).toBe('Button')
  })
})
```
4. 修改`package.json`文件，添加测试脚本
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```
5. 运行测试命令，查看测试结果
```s
pnpm test
```

### 代码规范
1. 安装以下依赖，我也不太清楚干啥用的(虽然有别的方法，暂时先这样)
```s
pnpm i eslint -D
# ESLint 专门解析 TypeScript 的解析器
pnpm i @typescript-eslint/parser -D
# 内置各种解析 TypeScript rules 插件
pnpm i @typescript-eslint/eslint-plugin -D

pnpm i eslint-formatter-pretty -D
pnpm i eslint-plugin-json -D
pnpm i eslint-plugin-prettier -D
pnpm i eslint-plugin-vue -D
pnpm i @vue/eslint-config-prettier -D
pnpm i babel-eslint -D
pnpm i prettier -D
```
2. 新建`/.eslintrc.cjs`文件，添加配置
```js
module.exports =   {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  globals: {
    ga: true,
    chrome: true,
    __DEV__: true
  },
  // 解析 .vue 文件
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:json/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser' // 解析 .ts 文件
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error'
  }
}
```
3. 新建`/.eslintignore`文件，添加忽略文件
```s
*.sh
node_modules
lib
coverage
*.md
*.scss
*.woff
*.ttf
src/index.ts
dist
```
4. 修改`/package.json`文件，添加检查和格式化脚本
```json
{
  "scripts": {
    "lint": "eslint --fix --ext .ts,.vue src",
    "format": "prettier --write \"src/**/*.ts\" \"src/**/*.vue\"",
  },
}
```
5. 运行检查命令，查看检查结果
```
pnpm lint
```
6. 安装`husky`，用于定义`Git Hooks`
```s
pnpm i husky -D
```
7. 通过以下命令，添加脚本到`/package.json`文件中
```s
npm set-script prepare "husky install"
```
8. 添加Git声明周期钩子
```s
mkdir .husky && npx husky add .husky/pre-commit "pnpm run lint"
```
9. 测试是否有效
```s
git commit -m "feat: commint for lint test"
```
10. 执行命令，添加测试钩子
```s
npx husky add .husky/pre-push "pnpm test:run"
```
11. 修改`/package.json`文件
```json
{
  "scripts": {
    "test:run": "vitest run",
  }
}
```
12. 安装以下依赖，用于检测提交信息
```s
# 安装commitlint
pnpm i -d @commitlint/config-conventional@"17.0.2" @commitlint/cli@"17.0.2"

# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```
13. 执行命令，添加测试钩子
```s
npx husky add .husky/commit-msg "npx --no -- commitlint --edit \"$1\""
```

### 部署
1. 修改`/package.json`，指定导出目录和内容
```json
{
  "main": "./dist/vite-ui.umd.js",
  "module": "./dist/vite-ui.mjs",
  "files": ["dist"],
}
```
2. 登录npm
```s
npm login
```
3. 发布代码
```s
npm publish
```
4. 访问代码
```s
https://www.npmjs.com/package/booker-ui
```


## 参考链接

- [基于 Vite 的组件库工程化实战 - 掘金小册](https://juejin.cn/book/7117582869358182403)
- [Vite官网](https://vitejs.dev/)
- [Vitepress官网](https://vitepress.vuejs.org)
- [Vue官网](https://vuejs.org/)
