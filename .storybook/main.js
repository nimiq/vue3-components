const svgLoader = require("vite-svg-loader");

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
