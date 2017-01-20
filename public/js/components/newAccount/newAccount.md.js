((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.newAccount', {
            url: '/new_account',
            template: '<new-account></new-account>'
        })
    }])
})(angular.module('app.newAccount', ['ui.router']));
