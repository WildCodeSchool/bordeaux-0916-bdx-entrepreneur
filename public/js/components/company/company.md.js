((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.company', {
            url: '/societe/:id',
            template: '<company></company>'
        })
    }])
})(angular.module('app.company', ['ui.router']));
