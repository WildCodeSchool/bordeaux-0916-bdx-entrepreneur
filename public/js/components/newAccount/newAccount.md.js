((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.newAccount', {
            url: '/new_account',
            template: '<newAccount></newAccount>'
        })
    }])
})(angular.module('app.newAccount', ['ui.router']));
