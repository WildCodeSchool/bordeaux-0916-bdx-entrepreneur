((app) => {

    app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',

        function($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.hashPrefix('!');
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('blog', {
                    template: '<home></home>',
                    url: '',
                    abstract: true
                })
                .state('blog.list', {
                    template: '<blog-list></blog-list>',
                    url: '/'
                })
                .state('blog.item', {
                    template: '<blog-item></blog-item>',
                    url: '/blog/:id'
                });
        }
    ]);

})(angular.module('app.config', []))
