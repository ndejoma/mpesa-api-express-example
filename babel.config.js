/** @format */

module.exports = function (api) {

    //cache the config file in development 
    api.cache.using(() => process.env.NODE_ENV === 'development');

    /**
     *  
     * In this case the babel-plugin-transform-remove-console only runs in production
     * The console statements are not needed in production your should add other logging
     * options like pino
     *
     *
    **/ 
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
