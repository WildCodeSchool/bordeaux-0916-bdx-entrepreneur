((app)=>{

  'use strict'
      app.config(['$stateProvider', ($stateProvider) => {
          $stateProvider
              .state('login', {
                  url: '/login',
                  abstract: true,
                  templateUrl: 'js/components/login/login.html'
              })
              .state('login.connect', {
                  url: '',
                  template: '<connect></connect>'
              })
              .state('login.create', {
                  url: '/new/account',
                  template: '<account></account>'
              });
      }]);
})(require('angular').module('app.login', []));
