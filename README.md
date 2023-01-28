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

## Merging changes from Vue 2 based vue-components

Suggested workflow for merging changes from Vue 2 based vue-components into vue3-components:

1. Add vue-components as remote:
```bash
git remote add vue2-components git@github.com:nimiq/vue-components.git
```

2. Fetch the newest changes from vue2-components:
```bash
git fetch vue2-components
```

3. Merge into vue3-components:
```bash
git merge --no-commit <vue2-components-revision-to-be-merged>
```
This will more than likely result in merge conflicts. If `vue2-components/master` contains multiple logically independent commits for different components or features, it is suggested to only merge one component or feature at a time to keep the merge conflicts more manageable. In that case, instead of merging `vue2-components/master`, specific revisions can be merged subsequently, e.g. `vue2-components/master~5` and then `vue2-components/master~2` and then `vue2-components/master`.

4. Manually apply patches if git failed to associate moved files
 
vue3-components changed the project's file structure. This can result in git not being able to associate the file in `vue2-components` with its counterpart in `vue3-components` if they deviated too much. In this case, there will be a merge conflict with the file from `vue2-components` appearing deleted in `vue3-components` and therefore the changes from `vue2-components` failing to apply automatically. To manually apply these changes, you can create a patch file to apply:
```bash
git diff HEAD...<vue2-components-revision-to-be-merged> -- <path-to-vue2-compontent-to-diff> > vue2-component.patch
# which is equivalent to: git diff $(git merge-base HEAD <vue2-components-revision-to-be-merged>) <vue2-components-revision-to-be-merged> -- <path-to-vue2-compontent-to-diff> > vue2-component.patch
```
In this patch file then replace all file paths to the component in vue2-components to the correct path in vue3-components. The patch can then be applied via
```bash
git apply -3 vue2-component.patch
```

5. Conclude the merge when all conflicts are resolved
```bash
git merge --continue
```
