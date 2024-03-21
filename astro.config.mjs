import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

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
      sidebar: [
        {
          label: "TS",
          autogenerate: { directory: "TS" },
        },
        {
          label: "Vue",
          autogenerate: { directory: "Vue" },
        },
      ],
    }),
  ],
});
