((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.home', {
            url: '/home',
            template: '<companies></companies>'
        })
    }])
})(angular.module('app.home', ['ui.router']));
