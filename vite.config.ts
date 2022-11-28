import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import crypto from 'crypto';
import renameNodeModules from "rollup-plugin-rename-node-modules";

// Fix build for Node version with OpenSSL 3
const origCreateHash = crypto.createHash;
crypto.createHash = (alg: string, opts: crypto.HashOptions | undefined) => {
    return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader({ svgo: false }),
        renameNodeModules('modules'),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            // name: 'NimiqVue3Components',
            formats: ['es'],
        },
        sourcemap: true,
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                inlineDynamicImports: false,
                // Generate one file per component,
                // but since it create a node_module folder that get removed during the packaging then it doesn't work
                // TODO: find a way to include the node_modules folder into the package (package.json:files get ignored)
                preserveModules: true,
                preserveModulesRoot: '.',

                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})
