import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { LayuiVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path";

const excludeComponents = ['LightIcon','DarkIcon']

export default defineConfig({
  // Gitee Pages 部署时需要设置为仓库名，如 '/office-space/'
  // 本地开发时设置为 '/'
  base: process.env.NODE_ENV === 'production' ? '/office-space/' : '/',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      }
    ]
  },
  plugins: [
    AutoImport({
      resolvers: [
        LayuiVueResolver(),
      ],
    }),
    Components({
      resolvers: [
        LayuiVueResolver({
          resolveIcons: true,
          exclude: excludeComponents
        }),
      ],
    }),
    vue(),
  ],
});