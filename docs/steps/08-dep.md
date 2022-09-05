---
title: 部署
---
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