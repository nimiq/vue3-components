export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    sort: 'requiredFirst',
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
