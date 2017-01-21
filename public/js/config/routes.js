((app) => {
    'use strict'
    app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/')
        $stateProvider.state('app', {
            url: '',
            abstract: true,
            template: '<navbar></navbar><ui-view></ui-view><footer></footer>'
        })
    }])

  })(require('angular').module('app.config'))
