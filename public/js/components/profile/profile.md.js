((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.profile', {
            url: '/profile',
            template: '<profile></profile>'
        })
    }])
})(angular.module('app.profile', ['ui.router']));
