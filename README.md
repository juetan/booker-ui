## 介绍

基于 Vite 的组件库开发实践，包含项目启动，组件文档，代码规范，单元测试和自动部署等内容。

## 实践过程

### 新建项目

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
const content: string = 'Hello world from index.ts';
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

### 新建组件

1. 安装 Vue，添加对 Vue 的支持

```s
pnpm i vue -D
```

2. 新建`/src/button/index.ts`，编写一个使用`render`的组件

```ts
import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'VButton',
  render() {
    return h('button', null, 'My Button');
  },
});
```

3. 修改`/src/index.ts`文件，创建 Vue 应用并引入组件，重启访问

```ts
import {createApp} from 'vue';
import VButton from './button/index';

createApp(VButton).mount('#app');
```

4. 安装`@vitejs/plugin-vue`，添加对`.vue`文件的支持

```
pnpm i @vitejs/plugin-vue -D
```

5. 新建`/vite.config.ts`文件，将其添加到 Vite 插件中

```ts
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

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
  name: 'SFCButton',
};
</script>
```

7. 修改`/src/index.ts`文件，引入创建的 SFC 组件

```ts
import {createApp} from 'vue';
import SFCButton from './SFCButton/index.vue';

createApp(SFCButton).mount('#app');
```

8. 此时有报错，新建`/src/shims-vue.d.ts`为`.vue`文件添加类型声明，重启访问

```ts
declare module '.vue' {
  import {DefineComponent} from 'vue';
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
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), jsx()],
});
```

11. 新建`/src/JSXButton/index.tsx`文件

```ts
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'JSXButton',
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
import {createApp} from 'vue';
import JSXButton from './JSXButton/index';

createApp(JSXButton).mount('#app');
```

#### 打包封装

1. 新建`/src/entry.ts`文件

```ts
import Button from './button/index';
import SFCButton from './SFCButton/index.vue';
import JSXButton from './JSXButton/index';
import {App} from 'vue';

export {Button, SFCButton, JSXButton};

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
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue',
    },
  },
};

export default defineConfig({
  plugins: [vue(), jsx()],
  build: {
    rollupOptions,
    minify: false,
    lib: {
      entry: './src/entry.ts',
      name: 'ViteUI',
      fileName: 'vite-ui',
      formats: ['es', 'umd', 'iife'],
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
      import {createApp} from 'vue/dist/vue.esm-bundler.js';
      import ViteUI from '../../dist/vite-ui.mjs';

      const rootComponent = {
        template: `<VButton /> <SFCButton /> <JSXButton />`,
      };
      createApp(rootComponent).use(ViteUI).mount('#app');
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
      import {createApp} from 'vue/dist/vue.esm-bundler.js';
      import {SFCButton, JSXButton, Button} from '../../dist/vite-ui.mjs';

      createApp({
        template: `<VButton/> <JSXButton/> <SFCButton/>`,
      })
        .component(SFCButton.name, SFCButton)
        .component(JSXButton.name, JSXButton)
        .component(Button.name, Button)
        .mount('#app');
    </script>
  </body>
</html>

```
## 参考链接

- [基于 Vite 的组件库工程化实战 - 掘金小册](https://juejin.cn/book/7117582869358182403)
