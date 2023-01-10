import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import antdLayout from 'vite-plugin-antd-layout';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) =>
  defineConfig({
    define: {
      'process.env': loadEnv(mode, process.cwd()),
    },
    base: process.env.VITE_PUBLIC_PATH,
    mode,
    resolve: {
      //别名
      alias: {
        '@': resolve(__dirname, './src'),
        '@/components': resolve(__dirname, './src/components'),
        '@/store': resolve(__dirname, './src/store'),
        '@/views': resolve(__dirname, './src/views'),
        '@/assets': resolve(__dirname, './src/assets'),
        '@/hooks': resolve(__dirname, './src/hooks'),
        '@/utils': resolve(__dirname, './src/utils'),
        '@/layout': resolve(__dirname, './src/layout'),
      },
    },
    //服务
    server: {
      //自定义代理---解决跨域
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://xxxxxx.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      open: true,
      port: 3000,
    },
    plugins: [
      react(),
      antdLayout(),
      vitePluginImp({
        optimize: true,
        libList: [
          {
            libName: 'antd',
            style: (name: any) => `antd/es/${name}/style`,
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // 如需定制 antd 主题，请取消以下内容注释 https://ant.design/docs/react/customize-theme
          // modifyVars: {
          //   hack: `true; @import "./src/theme.less";`,
          // },
        },
      },
    },
  });
