import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'node:url';
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    vue(),
    svgLoader(),
    vuetify({
      styles: { configFile: 'src/styles/settings.scss' },
    })
    // VueI18nPlugin({
    //   include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
    //   fullInstall: false,
    //   compositionOnly: true,
    // }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
      scss: {
        additionalData: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
        `,
      },
    }
  },
  server: {
    port: 9999,
    host: true,
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'en/app/js/[name].js',
        entryFileNames: 'en/app/js/[name].js',
        assetFileNames: 'en/app/[ext]/[name].[ext]',
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : undefined,
    sourcemap: process.env.NODE_ENV === 'development',
    keepNames: true,
  },
})
