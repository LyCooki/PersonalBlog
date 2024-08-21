---
title: webGl
description: A guide in my new Starlight docs site.
---

## webGl 概念

> WebGL（Web Graphics Library）是一个 JavaScript API，它允许网页开发人员在浏览器中创建和渲染 3D 和 2D 图形，特别适用于创建复杂的交互式 3D 和 2D 游戏。WebGL 使用 OpenGL ES 2.0 或 3.0 图形渲染引擎，它是 OpenGL ES 标准的一种实现。

WebGL 的主要特性包括：

- 3D 图形渲染
- 2D 图形渲染

![WebGL 解析图](@/assets/img/webGl/webGl.png)

### 线性变换

> 平移，旋转，缩放，这些都是线性变化，也就是说，它们都可以用矩阵乘法来表示。本质就是 **矩阵 \* 向量** 的运算。

### 仿射变换

> 仿射变换是指物体的形状发生变化，但不仅仅是位置发生变化。仿射变换可以用 **平移矩阵 _ 旋转矩阵 _ 缩放矩阵 \* 向量** 的运算来表示。即其本质就是一个矩阵表示了平移、旋转、缩放。
