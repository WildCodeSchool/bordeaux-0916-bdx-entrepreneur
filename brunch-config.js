'use strict'
exports.config = {
    paths: {
        watched: ['public'],
        public: 'public'
    },
    files: {
        javascripts: {
            joinTo: {
                'js/vendor.min.js': /^node_modules/,
                'js/app.min.js': /^public\/js/
            },
            order: {
                before: [
                    'node_modules/angular/*.js',
                    'public/js/app.js',
                    'public/js/**/*.md.js',
                    'public/js/components/**/*.js'
                ]
            }
        },
        stylesheets: {
            joinTo: {
                'css/app.min.css': /^public\/scss/
            }
        }
    },
    npm: {
        enabled: true,
        compilers: ['angular', 'angular-ui-router', 'angular-aria', 'angular-animate', 'angular-messages', 'angular-material', 'angular-cookies', 'file-saver', 'materialize-css', 'jquery']
    },
    conventions: {
        assets: /static[\\/]/,
        ignored: ['public/js/**/*.min.*', 'public/css/**/*.min.*']
    },
    modules: {
        wrapper: false,
        definition: 'commonjs'
    },
    plugins: {
        babel: {
            ignore: [
                /^(node_modules)/
            ]
        },
        copycat: {
            js:     ['node_modules/materialize-css/dist/js/materialize.min.js',
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/angular-materialize/src/angular-materialize.min.js'],
            css:    ['node_modules/angular-material/angular-material.min.css',
                    'node_modules/materialize-css/dist/css/materialize.min.css'],
            fonts:  ['node_modules/materialize-css/dist/fonts/'],
            verbose: true,
            onlyChanged: true
        }
    },
    overrides: {
        production: {
            sourceMaps: false,
            plugins: {
                autoReload: {
                    enabled: false
                }
            }
        }
    }, server: {
        path: 'app.js',
        port: 8000,
        run: true
    }
};
