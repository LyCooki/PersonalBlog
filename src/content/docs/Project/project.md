---
title: 项目遇到的问题
description: A guide in my new Starlight docs site.
---

## 动环项目遇到的问题

### 1.ELEMENT-PLUS 的主题样式覆盖问题

> **ELEMENT-PLUS 源码图** ![ELEMENT-PLUS源码图](@/assets/img/Project/element-plus-source.png)

> 解决方案：

    我们需要手动配置需要覆盖样式的变量，并在 项目的入口文件引入我们自定义的变量文件。

```ts
// main.ts
// import "element-plus/dist/index.css";
import "@/style/element/variarbles.scss";
// 导入公共样式
import "@/style/index.scss";
```

```scss
// variable.scss

该文件必须创建在项目的src/style/element文件夹下，并引入到 main.ts 文件中。
@forward "element-plus/theme-chalk/src/common/var.scss" with (
  //下面是自定义配置颜色列表
  $colors: (
    "primary": (
      "base": #2e5cf6,
    ),
    "success": (
      "base": #3ccb7f,
    ),
    "info": (
      "base": #a3a3a3,
    ),
    "warning": (
      "base": #ff692e,
    ),
    "danger": (
      "base": #e62e05,
    ),
  ),
  // $fill-color: (
  //   "": #f0f2f5,
  //   "light": #f5f7fa,
  //   "lighter": #fafafa,
  //   "extra-light": #fafcff,
  //   "dark": #ebedf0,
  //   "darker": #e6e8eb,
  //   "blank": #0e1030,
  // )
);

@use "element-plus/theme-chalk/src/index.scss" as *;
```


### Element-Plus 表格控制样式修改方式
![根据返回的数据来判断表格的样式](image.png)
![代码对应的页面效果](image-1.png)

```js
//这里index和row即为插槽循环的索引和数据
  const handleEdit = (index, row) => {
    //数据没有isEditing手动往row对象里添加。
  row.isEditing = true
  console.log(index, row);
}
```