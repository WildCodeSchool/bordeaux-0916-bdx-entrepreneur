((app) => {

    app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',

        function($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.hashPrefix('!');
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('admin', {
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
                    <ui-view></ui-view>
                    <footer></footer>`,
                    url: '',
                    abstract: true
                })
                .state('company.list', {

                    template: '<companies-search sector="$ctrl.sector" name="$ctrl.name"></companies-search><companies-list sector="$ctrl.sector" name="$ctrl.name"></companies-list>',
                    url: '/:name'
                })
                .state('company.item', {
                    template: '<company-item></company-item>',
                    url: '/company/:id'
                });
  }]);
})(require('angular').module('app.config'))
