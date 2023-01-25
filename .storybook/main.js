const svgLoader = require("vite-svg-loader");

// Fix build for Node version with OpenSSL 3
const crypto = require('crypto');
const origCreateHash = crypto.createHash;
let wasHashPatchWarningShown = false;
crypto.createHash = (alg, opts) => {
  try {
    return origCreateHash(alg, opts);
  } catch (e) {
    if (alg !== 'md4') throw e;
    if (!wasHashPatchWarningShown) {
      console.warn('Warning: patching md4 hash to md5.');
      wasHashPatchWarningShown = true;
    }
    return origCreateHash('md5', opts);
  }
};

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ],
  features: {
    postcss: false
  },
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite"
  },
  async viteFinal(config) {
    config.base = process.env.BASE_PATH || config.base;

    // customize the Vite config here
    config.plugins.push(svgLoader({
      svgo: false
    }));
    // return the customized config
    return config;
  }
};
