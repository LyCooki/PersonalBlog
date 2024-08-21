---
title: Vite打包遇到的问题
description: A guide in my new Starlight docs site.
---

## 1. 使用 vite 打包过后，在使用 electron 打包的时候，出现了以下错误：

![electron打包加载资源问题](@/assets/img/VITE/vite-1.png)

### 解决方案

需要在 script 标签前后添加判断

```js
//  在脚本导入之前插入此行
<script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

//  导入要用到的js脚本
<script src="scripts/jquery.min.js"></script>
<script src="scripts/vendor.js"></script>

//  在脚本导入之后插入此行
<script>if (window.module) module = window.module;</script>
```

## 2. vite 配合 ts 使用一定要装的插件

- vite-plugin-checker：检查代码规范

<!-- vite-plgin-checker插件的用法 -->

```bash
npm i -D vite-plugin-checker
```

```js
// vite.config.js
import checker from "vite-plugin-checker";
export default defineConfig({
  plugins: [
    checker({
      typescript: true, // enable type-checking with TypeScript
      eslint: {
        enabled: true, // enable linting with ESLint
        severity: "error", // set the linting severity level
        rules: {
          // custom rules
        },
      },
    }),
  ],
});
```

- 正常 vite 打包的时候会编译 ts 文件，但不会检查代码类型。
- 如果需要打包的时候发现类型错误阻止打包需要在 package.json 中添加以下配置：

```json
// package.json
"scripts": {
    "build": "tsc --noEmit && vite build"
}
```

> 默认工程内部如果有 ts 文件，需要创建 tsconfig.json 文件，并可以配置一些对应的检查手段和规则。

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node", // 指定模块解析策略，设置为 node 则可以识别 node_modules 目录 如果在 import {} from "lodash" 会报错是因为没有相对路径和绝对路径，增加该配置项则表明引入模块按照node环境解析。
    "skipLibCheck": true // 是否跳过检查node_modules目录的检查
    "module": "esNext", // 指定模块的生成方式，设置为 esnext 可以更好的兼容浏览器,默认es 3
    "lib":["es2017","DOM"], // 指定编译的库文件，默认只包含 es2015 和 dom 两个库文件，可以根据需要增加或减少。
  }
}
```

> 三斜线指令是 TypeScript 中的一种特殊注释语法，用于提供编译器指令。它们的语法是三个斜线后跟一个 XML 标签，通常用于引用外部声明文件（.d.ts 文件）。

```ts
// vite-env.d.ts

/// <reference path="path/to/file.d.ts" />
//这个指令告诉编译器引用指定的声明文件，以便在编译时包含这些类型信息。
/// <reference types="vite/client" />
//这个指令告诉编译器引用一个类型库，例如Node.js的类型定义。这在使用不同的环境（如Node.js或浏览器）时非常有用。
```

## js 写循环的时候一些小的优化

> 防抖，节流不要使用自己写的函数，使用 lodash 库的函数

```js
//比如foreach循环，原生的foreach循环会导致频繁的DOM操作，影响性能，可以使用lodash的forEach函数
_.forEach(arr, function (item) {
  console.log(item);
});
```

> 循环，不要使用数组.length，应该在 for 循环定义变量 i 的时候增加一个 len 值来记录数组的长度，这样可以避免每次循环的时候都要找父亲要一下数组的长度，提高性能。

```js
// 原生的for循环
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// 使用变量len记录数组的长度
for (var i = 0，len = arr.length;; i < len; i++) {
  console.log(arr[i]);
}
```

> 数组的遍历，不要使用 forEach，map，filter 等方法，这些方法都会创建新的数组，会导致性能问题。

```js
// 原生的forEach方法
arr.forEach(function (item) {
  console.log(item);
});

// 使用for循环遍历
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

> 数组的遍历，不要使用 for in 循环，因为 for in 循环会遍历对象原型链上的属性，会导致性能问题。

```js
// 原生的for in循环
for (var key in obj) {
  console.log(key);
}

// 使用Object.keys方法遍历
var keys = Object.keys(obj);
for (var i = 0; i < keys.length; i++) {
  var key = keys[i];
  console.log(key);
}
```

## 3. 关于 vite 打包的一些指令解读

```js
//vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // 打包输出路径 默认 dist
    outDir: "dist",
    // build 后是否压缩代码 默认 false
    minify: false,
  // 'terser'（默认值）:
  // 使用 Terser 来压缩 JavaScript 代码。Terser 是一个高度优化的 JavaScript 压缩工具，能够显著减小文件大小，同时尽可能保持代码的运行效率。
  // 'esbuild':
  // 使用 Vite 自带的 esbuild 来压缩代码。Esbuild 是一个极其快速的 JavaScript 和 TypeScript 构建工具，相对于 Terser 来说，压缩速度更快，但压缩效果可能稍微逊色。
  // false:
  // 关闭代码压缩。选择此选项可以跳过压缩步骤，生成未经压缩的代码，这在某些调试场景或开发环境中可能会有帮助。
  }
```

## 分包策略

- 按需加载：按需加载是一种常见的分包策略，即在运行时动态加载某个模块。Vite 官方推荐的分包策略是按需加载，通过动态导入的方式来实现。
- 预加载：预加载是一种更加激进的分包策略，即在运行时预先加载所有模块。这种策略可以有效减少网络请求的数量，提升页面的加载速度。
- 代码拆分：代码拆分是一种更加复杂的分包策略，即将代码按照业务模块拆分成多个文件。这种策略可以有效减少浏览器的内存占用，提升页面的运行效率。

```js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 将第三方库打包到 vendor 代码块中
            return "vendor";
          }
        },
      },
    },
  },
});
```
