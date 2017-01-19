((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.newCompany', {
            url: '/newCompany',
            template: '<newCompany></newCompany>'
        })
    }])
})(angular.module('app.newCompany', ['ui.router']));
