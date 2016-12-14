((app) => {

    app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',

        function($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.hashPrefix('!');
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                    template: '<home></home>',
                    url: '/login'
                })
                .state('member', {
                    template: `<navbar></navbar>
                    <members-search> </members-search>
                    <ui-view></ui-view>
                    <footer></footer>`,
                    url: '',
                    abstract: true
                })
                .state('member.list', {
                    template: '<members-list></members-list>',
                    url: '/'
                })
                .state('member.item', {
                    template: '<member-item></member-item>',
                    url: '/member/:id'
                });
        }
    ]);

})(require('angular').module('app.config', []))
