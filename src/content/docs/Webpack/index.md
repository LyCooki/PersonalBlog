---
title: Webpack
description: Webpack is a module bundler. It takes modules with dependencies and generates static assets.
---

## webPack runtime 优化

    默认runtime会在每个js文件中打包一份所以我们需要把webpackruntime分离出来，这样可以减少文件体积，提高加载速度。
    优化方法：
    ```js
    // webpack.config.js
    module.exports = {
      optimization: {
        //两种方式都可以
        runtimeChunk: "runtime"
        runtimeChunk: {
          name: 'runtime'
        }
      }
    }
    ```

## webPack vendor 分离

    我们可以把第三方库单独打包成一个文件，这样可以减少页面加载时间。
    优化方法：
    ```js
    // webpack.config.js
    module.exports = {
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              chunks: "all"
            }
          }
        }
      }
    }
    ```
    如果需要把pageA用的第三方库单独打包成一个文件，pageB用的第三方库单独打包成一个文件，则webpack无需任何配置，webpack会自动根据代码的依赖关系进行分割。

## webPack 热更新和HMR的区别?

    1.hmr是一种不需要更新页面，就可以更新视图的技术，核心原理 module.hot重新执行render(好处：状态保留，刷新页面无感知)
    2.热更新。文件改了，webpack自动帮助刷新页面。