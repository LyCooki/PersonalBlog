---
title: Node基础
description: Node基础知识
---

## 关于 module.exports 和 exports 的区别

在 Node 中，我们经常会看到这样的代码：

```javascript
//test.js
module.exports = {
  a: "aaa",
};
exports.a = "bbb";

//test2.js
var a = require("./test.js");
console.log(a);
//会发现打印的结果以module.exports为准，即{a: "aaa"}即使同时存在module.exports和exports，也只会导出module.exports。
```

## ES6 module 和 CommonJS 模块的区别：

> 三大差异

- CommonJs 输出的是值的拷贝，ES6 module 输出的是值的引用。
- CommonJs 模块是运行时加载，ES6 module 是编译时输出接口。
- CommonJs 模块的 require()是同步加载代码,ES6 module 的 import 是异步加载代码，有一个独立的模块依赖的解析阶段。

> 第二个差异是因为 CommonJs 加载的是一个对象，即 module.exports 属性，该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口是一种静态定义，在代码静态解析阶段就会生成。

## Node 依赖存在的问题

> 下面执行的代码可以调用上面的方法,而上面 js 的代码没有办法执行下面 js 文件中的方法.

```html
<body>
  <script src="./index.js"></script>
  <script src="./home.js"></script>
  <script src="./list.js"></script>
</body>
```

![Node依赖存在的问题](@/assets/img/Node/nodeDependency.png)

## Node require 避免循环引用

```js
//a.js
const getMes = require('./b.js');
console.log('我是 a 文件');
exports.say = function(){
  const message = getMes();
  console.log(message);
}
//b.js
const say = require('./a.js');
const obj = {
  name : "b文件"
  author:"b作者"
}
console.log('我是 b 文件');
function fun_b(){
  return obj
}
//main.js
const a = require('./a.js');
const b = require('./b.js');
console.log('node 入口文件');
```

- 1. 首先执行 node main.js，那么开始执行第一行 require(a.js)
- 2. 那么首先判断 a.js 有没有缓存，因为没有缓存，先加入缓存，然后执行文件 a.js;(需要注意 是先加入缓存，后执行模块内容);
- 3. `a.js`中执行第一行，引用`b.js`。
- 4. 那么判断`b.js`有没有缓存，因为没有缓存，所以加入缓存，然后执行`b.js`文件
- 5. `b.js`执行第一行，再一次循环引用`require(a.js)`此时的`a.js`已经加入缓存，直接读取值。接下来打印 `console.log('我是 b文件')`，导出方法。
- 6. `b.js`执行完毕，回到`a.js`文件，打印`console.log('我是 a 文件')`，导出方法。
- 7. 最后回到`main.js`，打印`console.1og('node 入口文件')`完成这个流程。
     > 不过这里我们要注意问题:
- 如上第 5.的时候,当执行`b.js`模块的时候,因为 a.js 还没有导出`say`方法,所以 b.js 同步

## CommonJs 和 module 的总结

> **CommonJs 总结**

Commonjs 的特性如下:
- CommonJs 模块由 JS 运行时实现。
- CommonJs 是单个值导出，本质上导出的就是 exports 属性。
- CommonJs 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
- CommonJs 模块同步加载并执行模块文件。

> **module 总结**

 Es module 的特性如下:
- ES6 Module 静态的，不能放在块级作用域内，代码发生在编译时，
- ES6 Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
- ES6 模块提前加载并执行模块文件
- ES6 Module 导入模块在严格模式下。
- ES6 Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting