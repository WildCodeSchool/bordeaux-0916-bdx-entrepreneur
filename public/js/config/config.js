((app) => {

    app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',

        function($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.hashPrefix('!');
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                    template: '<home></home>',
                    url: '/login'
                })
                .state('admin', {
                    template: `<navbar></navbar>
                    <ui-view></ui-view>
                    <footer></footer>`,
                    url: '/admin',
                    abstract: true
                })
                .state('admin.new' , {
                  template: '<admin-add-item></admin-add-item>',
                  url: '/company/_new'
                })
                .state('company', {
                    template: `<navbar></navbar>
                    <companies-search> </companies-search>
                    <ui-view></ui-view>
                    <footer></footer>`,
                    url: '',
                    abstract: true
                })
                .state('company.list', {
                    template: '<companies-list></companies-list>',
                    url: '/:name'
                })
                .state('company.item', {
                    template: '<company-item></company-item>',
                    url: '/company/:id'
                })
        }
    ]);

})(require('angular').module('app.config', []))
