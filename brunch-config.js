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
                'css/vendor.min.css': [],
                'css/app.min.css': /^public\/scss/
            }
        }
    },
    npm: {
        enabled: true,
        compilers: ['angular', 'angular-ui-router']
    },
    conventions: {
        assets: /static[\\/]/,
        ignored: ['public/js/**/*.min.*', 'public/css/**/*.min.*' ]
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
    }
}
