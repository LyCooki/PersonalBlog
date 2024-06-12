---
title: JS
description: A guide in my new Starlight docs site.
---

## JavaScript 中的 this 指向

> bind 和 call 是 JavaScript 中用于控制函数调用时 this 指向的两种方法。它们的主要区别在于函数的调用方式和时机。

## bind 方法

> bind 方法会创建一个新的函数（bound function），这个新函数在被调用时，其 this 值会被永久绑定到传给 bind 的第一个参数。bind 不会立即调用函数，它只是返回一个新的函数。

### 语法

```js

function.bind(thisArg[, arg1[, arg2[, ...]]])
thisArg：调用新函数时 this 的值。
arg1, arg2, ...：调用新函数时预设的参数。

const obj = { value: 42 };

function printValue() {
console.log(this.value);
}

const boundPrintValue = printValue.bind(obj);

boundPrintValue(); // 输出: 42
//在这个示例中，printValue 函数被 bind 方法绑定到 obj，并返回一个新的函数 boundPrintValue。
//当 boundPrintValue 被调用时，它的 this 永远指向 obj。
```

## call 方法

> call 方法会立即调用函数，并在调用时将 this 值设置为传递给它的第一个参数。call 还可以接受其他参数，这些参数会传递给被调用的函数。

### 语法

```javascript
function.call(thisArg, arg1, arg2, ...)
thisArg：调用函数时 this 的值。
arg1, arg2, ...：调用函数时传递的参数。

const obj = { value: 42 };

function printValue() {
console.log(this.value);
}

printValue.call(obj); // 输出: 42
//在这个示例中，printValue 函数通过 call 方法被立即调用，并且 this 被设置为 obj。
```

## 区别总结

1. 调用时机：

   > bind：返回一个新的函数，这个新函数在调用时其 this 值被永久绑定到 bind 的第一个参数。
   > call：立即调用函数，并且在调用时将 this 值设置为 call 的第一个参数。
   > 函数返回值：

2. 函数返回值：

   > bind：返回一个新的函数。  
   > call：返回被调用函数的返回值。

3. 参数传递：

   > bind：预设参数可以在创建绑定函数时传入，并且调用绑定函数时可以继续传入其他参数。
   > call：所有参数都在调用函数时传入。

## 使用场景

    bind：适用于创建一个新函数，并且该函数在多次调用时都需要绑定到同一个 this 值。常见于事件处理器中。
    call：适用于需要立即调用函数，并且该函数的 this 值需要在调用时动态指定。

## 示例对比

```javascript
//使用 bind
const obj = { value: 42 };
function printValue(prefix, suffix) {
  console.log(prefix + this.value + suffix);
}
const boundPrintValue = printValue.bind(obj, "Value: ", "!");
boundPrintValue(); // 输出: Value: 42!
//使用 call
const obj = { value: 42 };
function printValue(prefix, suffix) {
  console.log(prefix + this.value + suffix);
}
printValue.call(obj, "Value: ", "!"); // 输出: Value: 42!
```

## 总结

> bind：返回一个新函数，延迟调用，绑定 this。  
> call：立即调用，动态指定 this。
