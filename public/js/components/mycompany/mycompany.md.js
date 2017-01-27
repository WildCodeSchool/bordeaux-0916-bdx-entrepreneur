((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.mycompany', {
            url: '/mes-societes',
            template: '<mycompany></mycompany>'
        })
    }])
})(angular.module('app.mycompany', ['ui.router']));
