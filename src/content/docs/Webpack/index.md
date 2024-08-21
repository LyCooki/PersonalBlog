---
title: Webpack
description: Webpack is a module bundler. It takes modules with dependencies and generates static assets.
---

## Wpack runtime优化

    默认runtime会在每个js文件中打包一份所以我们需要把webpackruntime分离出来，这样可以减少文件体积，提高加载速度。
    优化方法：
    ```js
    // webpack.config.js
    module.exports = {
      optimization: {
        runtimeChunk: {
          name: 'runtime'
        }
      }
    }
    ```