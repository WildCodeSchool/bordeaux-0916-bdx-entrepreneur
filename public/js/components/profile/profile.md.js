((app) => {
    'use strict'
    app.config(['$stateProvider', '$mdThemingProvider', ($stateProvider, $mdThemingProvider) => {
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('blue')
            .dark();
        $stateProvider.state('app.profile', {
            url: '/profile',
            template: '<profile></profile>'
        })
    }])
})(angular.module('app.profile', ['ui.router']));
