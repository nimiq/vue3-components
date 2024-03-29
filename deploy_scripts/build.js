import ghPages from 'gh-pages';

(async () => {
    // Clean the gh-pages .cache folder
    ghPages.clean();

    // Deploy the vue3-components library build into the build/full branch
    await ghPages.publish('.', {
        branch: 'build/full',
        message: process.argv[2] || 'Rebuild',
        src: [
            'dist/**',
            'package.json',
        ],
    })
    .then(() => console.log('Published!'))
    .catch((err) => console.error(err));
})();
