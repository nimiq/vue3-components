# Nimiq vue3-components

This component library provides components written for the [Vue 3 frontend framework](https://vuejs.org/) for use in Nimiq
Ecosystem apps. Have a look at the [demo page](https://nimiq.github.io/vue3-components/) for an overview of included
components.

It is fully tree-shakeable, so we recommend using bundlers that support tree-shaking, such as [webpack 4+](https://webpack.js.org/) or [rollup](https://rollupjs.org/guide/en/) as well as [Vite](https://vitejs.dev/), which was the one used to build this component library.

⚠️ This library is a full Vue 3 component library, so it is not compatible with Vue 2. If you need to use it with Vue 2, please use the [vue-components](https://github.com/nimiq/vue-components) library instead.

⚠️ This library only expose an ES module, so it is not compatible with CommonJS bundlers such as Webpack 3 or older.

## Installation

```bash
yarn add github:nimiq/vue3-components#build/full
```

This will install the complete tree-shakeable component collection. (es module)

## Updating

```bash
# yarn 1.x and 2.x
yarn upgrade @nimiq/vue3-components
```

```bash
# yarn 3.x
yarn up @nimiq/vue3-components@github:nimiq/vue3-components#build/full
```

## Usage

Import the components you want to use in your Vue component and define them as child `components`, for example:

```ts
import { LoadingSpinner } from '@nimiq/vue-components';

defineComponent({
    components: { LoadingSpinner },
    template: `
        <div>
            Loading stuff...
            <LoadingSpinner />
        </div>
    `,
})
```

## Development and testing

To install dependencies run:
```bash
yarn
```

To run the demo page locally with hot-reloading on changes to the code base:
```bash
yarn storybook
```

To check for linting errors:
```bash
yarn lint
```

To build the component library:
```bash
yarn build
```

To deploy the storybook to github pages:
```bash
yarn deploy-storybook
```

To deploy the component library build to the `build/full` branch:
```bash
yarn deploy
```

## Internationalization

WIP
