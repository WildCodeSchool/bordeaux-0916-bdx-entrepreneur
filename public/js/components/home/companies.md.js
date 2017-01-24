((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.home', {
            url: '/',
            template: '<companies></companies>'
        })
    }])
})(angular.module('app.home', ['ui.router']));
