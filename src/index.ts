import { createApp } from "vue/dist/vue.esm-browser";
import ViteUI from "./entry";

createApp({
  template: `
    <div style="display: flex; gap: 16px;">
      <JSXButton color="blue">主要按钮</JSXButton>
      <JSXButton color="green">绿色按钮</JSXButton>
      <JSXButton color="gray">灰色按钮</JSXButton>
      <JSXButton color="yellow">黄色按钮</JSXButton>
      <JSXButton color="red">红色按钮</JSXButton>
    </div>
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
