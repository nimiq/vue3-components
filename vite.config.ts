import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { useDynamicPublicPath } from 'vite-plugin-dynamic-publicpath'

const crypto = require('crypto');

// Fix build for Node version with OpenSSL 3
const origCreateHash = crypto.createHash;
crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ svgo: false }),
    useDynamicPublicPath(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'NimiqVue3Components',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        inlineDynamicImports: true,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
