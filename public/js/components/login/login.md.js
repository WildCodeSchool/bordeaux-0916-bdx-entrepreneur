((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('login', {
            url: '/login',
            template: '<login></login>'
        })
    }])
})(angular.module('app.login', ['ui.router']));
