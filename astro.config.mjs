import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const file = import.meta.glob("./src/content/docs/**/*.md");
const labelArr = new Set();
const sidebar = []
 Object.keys(file).map(i=>{
  const arr = i.split("/");
  labelArr.add(arr.at(-2));
});
labelArr.forEach(i=>{
  sidebar.push({
    label: i,
    autogenerate: { directory: i },
  })
})


// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "个人博客",
      favicon: "/favicon.ico",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      customCss: [
        // 你的自定义 CSS 文件的相对路径
        "./src/styles/custom.css",
      ],
      sidebar,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
