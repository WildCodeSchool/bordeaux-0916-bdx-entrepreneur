((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.message', {
            url: '/message',
            template: '<message></message>'
        })
    }])

})(angular.module('app.message', []))
