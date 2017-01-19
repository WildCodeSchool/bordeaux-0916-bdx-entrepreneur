((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.footer', {
            url: '',
            template: '<footer></footer>'
        })
    }])
})(angular.module('app.footer', []));
