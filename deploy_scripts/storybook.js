import ghPages from 'gh-pages';

(async () => {
    // Clean the gh-pages .cache folder
    ghPages.clean();

    // Deploy storybook into the gh-pages branch
    await ghPages.publish('storybook-static', {
        branch: 'gh-pages',
        message: process.argv[2] || 'Update storybook build',
    })
    .then(() => console.log('Published!'))
    .catch((err) => console.error(err));
})();
