  ((app) => {
      'use strict'
      app.config(['$stateProvider', ($stateProvider) => {
          $stateProvider.state('app.adherents', {
              url: '/adherents',
              template: '<adherents></adherents>'
          })
      }])
  })(angular.module('app.adherents', ['ui.router']));
