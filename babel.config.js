/** @format */

module.exports = function (api) {

    api.cache.using(() => process.env.NODE_ENV === 'development');

    if (api.env('production')) {
        return {
            targets: {
                node: '18.0',
            },
            presets: ['@babel/preset-env'],
            plugins: [
                [
                    'module-resolver',
                    {
                        root: ['.'],
                        alias: {
                            '@': './src',
                        },
                    },
                ],
                ['transform-remove-console'],
            ],
        };
    } else {
        return {
            targets: {
                node: '18.0',
            },
            presets: ['@babel/preset-env'],
            plugins: [
                [
                    'module-resolver',
                    {
                        root: ['.'],
                        alias: {
                            '@': './src',
                        },
                    },
                ],
            ],
        };
    }
};
