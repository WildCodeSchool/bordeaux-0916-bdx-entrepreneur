((app) => {
      'use strict'
      app.config(['$stateProvider', ($stateProvider) => {
          $stateProvider.state('app.event', {
              url: '/events',
              template: '<events></events>'
          })
      }])

  })(angular.module('app.event',['ui.router']));
