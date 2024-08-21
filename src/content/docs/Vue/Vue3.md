---
title: Vue3深度指南
description: A guide in my new Starlight docs site.
---

## 根组件全局错误捕捉

```javascript
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.config.errorHandler = (err, vm, info) => {
  console.error("全局错误捕捉", err, vm, info);
};

app.mount("#app");
```

## 函数模板的引用

在模板中直接传入 el，el 参数即为该 ref 对象然后赋值给一个数据属性或 ref 变量。

```html
<template>
  <input :ref="(el)=> input = el" />
</template>

<script setup>
  const input = ref(null);
</script>
```

## v-bind 的一些新用法

> 修饰符

- .camel - 将短横线命名的 attribute 转变为驼峰式命名。
- .prop - 强制绑定为 DOM property。3.2+
- .attr - 强制绑定为 DOM attribute。3.2+

```html
<!-- 绑定 attribute -->
<img v-bind:src="imageSrc" />

<!-- 动态 attribute 名 -->
<button v-bind:[key]="value"></button>

<!-- 缩写 -->
<img :src="imageSrc" />

<!-- 缩写形式的动态 attribute 名 (3.4+)，扩展为 :src="src" -->
<img :src />

<!-- 动态 attribute 名的缩写 -->
<button :[key]="value"></button>

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName" />

<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 绑定对象形式的 attribute -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- prop 绑定。“prop” 必须在子组件中已声明。 -->
<MyComponent :prop="someThing" />

<!-- 传递子父组件共有的 prop -->
<MyComponent v-bind="$props" />

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```
