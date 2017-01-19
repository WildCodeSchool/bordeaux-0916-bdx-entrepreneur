((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            template: '<dashboard/></dashboard>'
        })
    }])

})(angular.module('app.dashboard',['ui.router']));
