((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.newCompany', {
            url: '/newCompany',
            template: '<new-company></new-company>'
        })
    }])
  })(angular.module('app.newCompany',['ui.router']));
