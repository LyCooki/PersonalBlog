---
title: Node基础
description: Node基础知识
---


## 关于module.exports和exports的区别

在Node中，我们经常会看到这样的代码：

```javascript
//test.js
module.exports = {
  a: "aaa",
}
exports.a = "bbb";

//test2.js
var a = require('./test.js');
console.log(a);
//会发现打印的结果以module.exports为准，即{a: "aaa"}即使同时存在module.exports和exports，也只会导出module.exports。
```


## ES6 module和CommonJS模块的区别：

> 三大差异
  - CommonJs输出的是值的拷贝，ES6 module输出的是值的引用。
  - CommonJs模块是运行时加载，ES6 module是编译时输出接口。
  - CommonJs模块的require()是同步加载代码,ES6 module的import是异步加载代码，有一个独立的模块依赖的解析阶段。

> 第二个差异是因为CommonJs加载的是一个对象，即module.exports属性，该对象只有在脚本运行完才会生成。而ES6模块不是对象，它的对外接口是一种静态定义，在代码静态解析阶段就会生成。