((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.user', {
            url: '/user/:id',
            template: '<user></user>'
        })
    }])
})(angular.module('app.user', []))
